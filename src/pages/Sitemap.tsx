import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Copy, ExternalLink, FileCode2, Layers, Library } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { OdooArchitecture } from "@/components/sitemap/OdooArchitecture";
import {
  countByStatus,
  sitemap,
  statusMeta,
  conventions,
  changelog,
  type PageStatus,
  type SitemapNode,
} from "@/lib/sitemap";

const toneClasses: Record<PageStatus, string> = {
  done: "border-success/40 bg-success/10 text-success",
  skeleton: "border-primary/40 bg-primary/10 text-primary",
  planned: "border-cta/40 bg-cta/10 text-cta",
  cms: "border-border bg-surface-muted text-muted-foreground",
};

const StatusPill = ({ status }: { status: PageStatus }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${toneClasses[status]}`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {statusMeta[status].label}
  </span>
);

const NodeRow = ({ node, depth = 0 }: { node: SitemapNode; depth?: number }) => {
  // Open-link only for real, currently-mounted Vite routes (no locale prefix, no dynamic segs).
  const isInternal =
    node.path &&
    !node.path.includes("[") &&
    !node.path.includes(":") &&
    !node.path.includes("*") &&
    !node.path.endsWith(".xml") &&
    !node.path.endsWith(".txt");
  return (
    <li>
      <div
        className="group flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="font-medium text-foreground">{node.label}</span>
        {node.path && (
          <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
            {node.path}
          </code>
        )}
        <StatusPill status={node.status} />
        {isInternal && (
          <Link
            to={node.path!}
            className="inline-flex items-center gap-1 text-xs text-primary opacity-0 transition group-hover:opacity-100 hover:underline"
          >
            open <ExternalLink className="h-3 w-3" />
          </Link>
        )}
        {node.note && (
          <p className="basis-full pl-6 text-xs text-muted-foreground">{node.note}</p>
        )}
      </div>
      {node.children && (
        <ul className="border-l border-dashed border-border ml-3">
          {node.children.map((c, i) => (
            <NodeRow key={i} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sitemap = () => {
  useEffect(() => {
    document.title = "Sitemap & roadmap — Abitaz dev hand-off";
  }, []);

  const counts = useMemo(() => countByStatus(), []);
  const total = counts.done + counts.skeleton + counts.planned + counts.cms;
  const [copied, setCopied] = useState(false);

  const copyAsMarkdown = () => {
    const lines: string[] = ["# Abitaz — sitemap & roadmap", ""];
    sitemap.forEach((section) => {
      lines.push(`## ${section.title}`, "", section.description, "");
      const walk = (nodes: SitemapNode[], depth = 0) => {
        nodes.forEach((n) => {
          const indent = "  ".repeat(depth);
          lines.push(
            `${indent}- **${n.label}** \`${n.path ?? "—"}\` _[${statusMeta[n.status].label}]_${n.note ? ` — ${n.note}` : ""}`,
          );
          if (n.children) walk(n.children, depth + 1);
        });
      };
      walk(section.nodes);
      lines.push("");
    });
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <SiteLayout>
      <div className="container-abitaz py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Internal · dev & designer hand-off
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Sitemap & roadmap
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Every route in the Abitaz storefront, what's built, what's a skeleton, and what's
              still planned. CMS-driven pages (categories, brands, rooms, blog posts) all share a
              single template — designers can mock banners once and they'll fit any new entry.
            </p>
          </div>
          <button
            onClick={copyAsMarkdown}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy as Markdown"}
          </button>
        </div>

        {/* Stats */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Total routes</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{total}</p>
          </div>
          {(Object.keys(counts) as PageStatus[]).map((key) => (
            <div key={key} className={`rounded-lg border p-4 ${toneClasses[key]}`}>
              <p className="text-xs uppercase tracking-wide opacity-80">{statusMeta[key].label}</p>
              <p className="mt-1 text-2xl font-bold">{counts[key]}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm">
          <span className="font-semibold text-foreground">Legend:</span>
          {(Object.keys(statusMeta) as PageStatus[]).map((s) => (
            <span key={s} className="flex items-center gap-2 text-muted-foreground">
              <StatusPill status={s} />
              {s === "done" && "page is built & live"}
              {s === "skeleton" && "placeholder shipped, structure ready"}
              {s === "planned" && "in roadmap, not yet implemented"}
              {s === "cms" && "content from CMS, reuses template"}
            </span>
          ))}
        </div>

        {/* Templates callout */}
        <div className="mb-10 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <Library className="mb-3 h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Category template (PLP)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drives <code>/[locale]/categories/[slug]</code>, <code>/[locale]/rooms/[slug]</code>,{" "}
              <code>/[locale]/new</code>, <code>/[locale]/best-sellers</code>,{" "}
              <code>/[locale]/sale</code>. Hero banner, breadcrumb, facets, SEO copy block. CMS
              picks: hero image, intro, banner CTA.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <Layers className="mb-3 h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Brand template</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drives <code>/[locale]/brands/[slug]</code>. Brand story + logo bar + featured
              collection + full PLP. Designers can ship banner art for any new brand without code.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <FileCode2 className="mb-3 h-5 w-5 text-primary" />
            <h3 className="text-base font-semibold text-foreground">Editorial template</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Drives <code>/[locale]/inspiration/[slug]</code> and{" "}
              <code>/[locale]/blog/[slug]</code>. Rich text + hero + shoppable hotspots + related
              products.
            </p>
          </div>
        </div>

        {/* Conventions */}
        <section className="mb-10 rounded-lg border border-primary/30 bg-primary/5 p-6">
          <h2 className="text-lg font-bold text-foreground">Routing conventions (v2)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These rules apply to every route in the tree below — read them first.
          </p>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <li>
              <strong className="text-foreground">Locale prefix.</strong> Every user-facing route is{" "}
              <code>/[locale]/…</code> where <code>[locale]</code> ∈{" "}
              <code>{conventions.locales.join(" · ")}</code>. Resolved by middleware (cookie →
              Accept-Language → fallback). Omitted only for language-neutral system files.
            </li>
            <li>
              <strong className="text-foreground">Dynamic segments.</strong> Next.js App Router
              bracket syntax — <code>[slug]</code>, <code>[id]</code> — matching the file-system
              routes and the XL HUB deck.
            </li>
            <li>
              <strong className="text-foreground">Plural-nest.</strong> Every collection's detail
              nests under its plural index: <code>/categories/[slug]</code>,{" "}
              <code>/brands/[slug]</code>, <code>/rooms/[slug]</code>,{" "}
              <code>/products/[slug]</code>. Fixes the old singular/plural split and aligns PDP
              with <code>/api/products/[slug]</code>.
            </li>
            <li>
              <strong className="text-foreground">Language-neutral roots.</strong>{" "}
              <code>/sitemap.xml</code> and <code>/robots.txt</code> live at the domain root with
              no locale prefix.
            </li>
          </ul>
          <details className="mt-5 rounded-md border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-foreground">
              Changes from v1
            </summary>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              {changelog.map((c, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: c.replace(/`([^`]+)`/g, "<code>$1</code>") }} />
              ))}
            </ul>
          </details>
        </section>

        {/* Sections */}
        <div className="space-y-10">
          {sitemap.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`}>
              <div className="mb-4 border-b border-border pb-3">
                <h2
                  id={`section-${section.id}`}
                  className="text-xl font-bold tracking-tight text-foreground"
                >
                  {section.title}
                </h2>
                <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{section.description}</p>
              </div>
              <ul className="space-y-0.5">
                {section.nodes.map((n, i) => (
                  <NodeRow key={i} node={n} />
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Hand-off notes */}
        <section className="mt-12 rounded-lg border border-border bg-surface p-6">
          <h2 className="text-lg font-bold text-foreground">Hand-off notes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Single source of truth:</strong> the tree above
              is generated from <code>src/lib/sitemap.ts</code>. Update that file and this page,
              the page status badges, and the future XML sitemap all stay in sync.
            </li>
            <li>
              <strong className="text-foreground">CMS-first:</strong> categories, rooms, brands,
              inspiration stories and blog posts all use shared templates. Adding a new entry =
              a CMS record, no deploy.
            </li>
            <li>
              <strong className="text-foreground">Priority before launch:</strong> auth flow,
              account/orders, delivery + returns + warranty + contact pages, legal pages.
            </li>
            <li>
              <strong className="text-foreground">High-impact next:</strong> Rooms hub (top
              e-commerce best practice for home goods), Inspiration grid (SEO + dwell time),
              Wishlist (sync to account on sign-in).
            </li>
            <li>
              <strong className="text-foreground">B2B track:</strong> the Pro program is a
              separate funnel — different pricing, project workflow, account type. Build after
              the consumer funnel is stable.
            </li>
          </ul>
        </section>

        {/* Backend architecture */}
        <OdooArchitecture />
      </div>
    </SiteLayout>
  );
};

export default Sitemap;