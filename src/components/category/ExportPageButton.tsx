import { useState } from "react";
import JSZip from "jszip";
import { Download, Loader2 } from "lucide-react";

/**
 * Single-page HTML + CSS exporter.
 *
 * Unlike the sitemap-wide exporter (which crawls every route in a hidden
 * iframe), this one snapshots the *currently rendered* page — so whatever
 * the user sees on screen (active filters, current pagination, etc.) is
 * what lands in the ZIP. Output: { index.html, styles.css }.
 *
 * The HTML is post-processed so it works as a standalone file:
 *  - Vite/React runtime <script> tags are stripped (static skeleton only).
 *  - All <style>/<link rel="stylesheet"> are removed and replaced with a
 *    single ./styles.css link.
 *  - Root-relative asset URLs (src="/...", href="/...") are absolutised to
 *    the live origin so images, fonts and icons still resolve.
 *  - A mobile viewport meta tag is injected if missing, so previews in
 *    Claude/Figma/etc. render the responsive layout instead of zoomed-out
 *    desktop.
 *  - The export button itself is removed from the snapshot.
 */
const snapshotCss = async (): Promise<string> => {
  const parts: string[] = [];
  document.querySelectorAll("style").forEach((s) => {
    parts.push(`/* inline <style> */\n${s.textContent ?? ""}`);
  });
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
      // ignore cross-origin / unreachable sheets
    }
  }
  return parts.join("\n\n");
};

const buildHtml = (origin: string): string => {
  // Clone the live document so our edits don't affect the running app.
  const doc = document.documentElement.cloneNode(true) as HTMLElement;

  // Drop the export button itself + any element marked no-export.
  doc
    .querySelectorAll("[data-export-ignore]")
    .forEach((el) => el.remove());

  let html = `<!doctype html>\n${doc.outerHTML}`;

  // Strip scripts, existing styles and stylesheet links.
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi, "");

  // Absolutise root-relative asset URLs back to the live origin.
  html = html.replace(/(\b(?:src|href))=(["'])\/(?!\/)/g, `$1=$2${origin}/`);

  // Ensure a mobile viewport meta tag exists, then inject our stylesheet.
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const headInjection = [
    hasViewport
      ? ""
      : '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<link rel="stylesheet" href="./styles.css">',
    "</head>",
  ]
    .filter(Boolean)
    .join("\n");

  html = html.replace(/<\/head>/i, headInjection);
  return html;
};

const filenameForPath = (): string => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return path ? path.replace(/\//g, "-") : "index";
};

export const ExportPageButton = () => {
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const origin = window.location.origin;
      const css = await snapshotCss();
      const html = buildHtml(origin);

      const zip = new JSZip();
      zip.file("index.html", html);
      zip.file("styles.css", css);
      zip.file(
        "README.md",
        [
          `# Page export — ${window.location.pathname}`,
          "",
          `Generated: ${new Date().toISOString()}`,
          "",
          "Open `index.html` directly in your browser, or drop the whole",
          "folder into a design tool. `styles.css` is the full compiled",
          "Tailwind bundle, so all responsive breakpoints work.",
          "",
          `Images, fonts and icons load from ${origin} — keep network`,
          "access for those.",
        ].join("\n"),
      );

      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      const dlUrl = URL.createObjectURL(blob);
      a.href = dlUrl;
      a.download = `${filenameForPath()}-${new Date()
        .toISOString()
        .slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(dlUrl);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      data-export-ignore
      title="Download this page as a standalone HTML + CSS bundle"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-lg transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {busy ? "Exporting…" : "Export page"}
    </button>
  );
};