import { useState } from "react";
import JSZip from "jszip";
import { Download, Loader2 } from "lucide-react";
import { sitemap, resolveInternalHref, type SitemapNode } from "@/lib/sitemap";

/**
 * Collect every unique, resolvable URL out of the sitemap tree.
 */
const collectUrls = (): string[] => {
  const out = new Set<string>();
  const walk = (nodes: SitemapNode[]) => {
    nodes.forEach((n) => {
      const href = resolveInternalHref(n.path);
      if (href) out.add(href);
      if (n.children) walk(n.children);
    });
  };
  sitemap.forEach((s) => walk(s.nodes));
  // make sure / is always included
  out.add("/");
  return Array.from(out);
};

const urlToFilename = (url: string): string => {
  if (url === "/") return "index.html";
  const clean = url.replace(/^\//, "").replace(/\/$/, "");
  return `${clean}.html`;
};

/**
 * Snapshot CSS from the current document — combines all <style> tags AND
 * fetched <link rel="stylesheet"> contents into one big CSS string.
 */
const snapshotCss = async (): Promise<string> => {
  const parts: string[] = [];
  const styles = Array.from(document.querySelectorAll("style"));
  styles.forEach((s) => parts.push(`/* inline <style> */\n${s.textContent ?? ""}`));
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  );
  for (const link of links) {
    try {
      const res = await fetch(link.href);
      if (res.ok) {
        const text = await res.text();
        parts.push(`/* from ${link.href} */\n${text}`);
      }
    } catch {
      // ignore unreachable stylesheets (cross-origin etc.)
    }
  }
  return parts.join("\n\n");
};

/**
 * Render a route inside a hidden iframe and return the fully-hydrated
 * outerHTML of the document.
 */
const captureRoute = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.left = "-10000px";
    iframe.style.top = "0";
    iframe.style.width = "1280px";
    iframe.style.height = "900px";
    iframe.style.border = "0";
    iframe.src = url;

    const cleanup = () => {
      iframe.remove();
    };
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error(`Timeout loading ${url}`));
    }, 15000);

    iframe.addEventListener("load", () => {
      // Give React + lazy effects a beat to settle.
      window.setTimeout(() => {
        try {
          const doc = iframe.contentDocument;
          if (!doc) throw new Error("No contentDocument");
          const html = `<!doctype html>\n${doc.documentElement.outerHTML}`;
          window.clearTimeout(timeout);
          cleanup();
          resolve(html);
        } catch (err) {
          window.clearTimeout(timeout);
          cleanup();
          reject(err as Error);
        }
      }, 900);
    });

    document.body.appendChild(iframe);
  });

/**
 * Strip Vite/React runtime <script> tags, drop the dev style/link tags,
 * and inject a single <link rel="stylesheet" href="<cssPath>">. Image and
 * asset URLs are rewritten to absolute (origin-prefixed) so the offline
 * HTML still loads media from the live preview.
 */
const rewriteHtml = (html: string, cssRelPath: string, origin: string): string => {
  let out = html;
  // Remove all <script> tags (Vite client, app bundle, etc.).
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  // Remove existing <style> blocks and <link rel="stylesheet"> tags.
  out = out.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  out = out.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "");
  // Prefix root-relative asset URLs (src="/...", href="/...") with origin so
  // images, fonts and icons still resolve when the HTML is opened locally.
  out = out.replace(/(\b(?:src|href))=(["'])\/(?!\/)/g, `$1=$2${origin}/`);
  // Inject our consolidated stylesheet right before </head>.
  out = out.replace(
    /<\/head>/i,
    `<link rel="stylesheet" href="${cssRelPath}">\n</head>`,
  );
  return out;
};

export const SitemapExportButton = () => {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const urls = collectUrls();
      setProgress({ done: 0, total: urls.length });
      const zip = new JSZip();
      const css = await snapshotCss();
      zip.file("styles.css", css);
      const origin = window.location.origin;

      // Index README so devs know what's in the ZIP.
      const readme = [
        "# Abitaz static skeleton export",
        "",
        `Generated: ${new Date().toISOString()}`,
        `Pages: ${urls.length}`,
        "",
        "All HTML files reference ./styles.css (relative). Asset URLs",
        `(images, fonts, icons) point back to ${origin} so you need network`,
        "access for media; markup + CSS work fully offline.",
        "",
        "## Pages",
        ...urls.map((u) => `- ${urlToFilename(u)}  ←  ${u}`),
      ].join("\n");
      zip.file("README.md", readme);

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
          const raw = await captureRoute(url);
          const filename = urlToFilename(url);
          // Compute a relative path back to styles.css based on filename depth.
          const depth = filename.split("/").length - 1;
          const cssRel = `${"../".repeat(depth)}styles.css`;
          const rewritten = rewriteHtml(raw, cssRel, origin);
          zip.file(filename, rewritten);
        } catch (err) {
          console.error("Export failed for", url, err);
          zip.file(
            `_failed/${urlToFilename(url)}`,
            `<!-- failed to capture ${url}: ${(err as Error).message} -->`,
          );
        }
        setProgress({ done: i + 1, total: urls.length });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      const dlUrl = URL.createObjectURL(blob);
      a.href = dlUrl;
      a.download = `abitaz-skeleton-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(dlUrl);
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
      title="Crawl every sitemap route in a hidden iframe and download a ZIP of HTML + the live compiled CSS bundle."
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {busy && progress
        ? `Exporting ${progress.done}/${progress.total}…`
        : "Download HTML + CSS (ZIP)"}
    </button>
  );
};
