import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, CheckCircle2, ChevronRight, Copy, ExternalLink, FileCode2, Layers, Library, AlertTriangle, Flag, Sparkles, Server } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { OdooArchitecture } from "@/components/sitemap/OdooArchitecture";
import {
  countByStatus,
  sitemap,
  statusMeta,
  conventions,
  changelog,
  decisions,
  priorities,
  crossCutting,
  june12Status,
  resolveInternalHref,
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

const BackendPill = () => (
  <span
    title="Needs backend wiring (Odoo endpoint, edge function, webhook, DB or auth) before the FE page can function."
    className="inline-flex items-center gap-1 rounded-full border border-cta/50 bg-cta/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cta"
  >
    <Server className="h-3 w-3" />
    Backend
  </span>
);

const NodeRow = ({ node, depth = 0 }: { node: SitemapNode; depth?: number }) => {
  // Resolve sitemap path → real Vite URL (strips /[locale], fills [slug]/[id]).
  const href = resolveInternalHref(node.path);
  const Row = (
    <>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span className="font-medium text-foreground">{node.label}</span>
      {node.path && (
        <code className="break-all rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground sm:text-xs">
          {node.path}
        </code>
      )}
      <StatusPill status={node.status} />
      {node.needsBackend && <BackendPill />}
      {href && (
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-primary opacity-70 transition group-hover:opacity-100">
          open <ExternalLink className="h-3 w-3" />
        </span>
      )}
      {node.note && (
        <p className="basis-full pl-6 text-xs text-muted-foreground">{node.note}</p>
      )}
    </>
  );
  return (
    <li>
      {href ? (
        <Link
          to={href}
          className="group flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {Row}
        </Link>
      ) : (
        <div
          className="group flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          {Row}
        </div>
      )}
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
          <h2 className="text-lg font-bold text-foreground">Routing conventions (v3.1)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These rules apply to every route in the tree below — read them first.
          </p>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <li>
              <strong className="text-foreground">Locale prefix.</strong> Every user-facing route is{" "}
              <code>/[locale]/…</code> where <code>[locale]</code> ∈{" "}
              <code>{conventions.locales.join(" · ")}</code>. Resolved by middleware (cookie{" "}
              <code>NEXT_LOCALE</code> → Accept-Language → <code>DEFAULT_LOCALE = {conventions.defaultLocale}</code>).
              Root <code>/</code> → 307 to resolved locale, NOT indexed. <code>x-default</code> →{" "}
              <code>{conventions.xDefault}</code>.
            </li>
            <li>
              <strong className="text-foreground">Dynamic segments.</strong> Next.js App Router
              bracket syntax — <code>[slug]</code>, <code>[id]</code>. Slugs are{" "}
              <strong className="text-foreground">per-locale</strong> (D2), authored in CMS.
              Resolver maps <code>(locale, localizedSlug) → id</code>. Slug change → 301 from
              the old localized slug.
            </li>
            <li>
              <strong className="text-foreground">Plural-nest.</strong> Every collection's detail
              nests under its plural index: <code>/categories/[slug]</code>,{" "}
              <code>/brands/[slug]</code>, <code>/rooms/[slug]</code>,{" "}
              <code>/collections/[slug]</code>, <code>/products/[slug]</code>.
            </li>
            <li>
              <strong className="text-foreground">Faceted PLP (D4).</strong> Clean PLP is canonical
              and indexable. Filtered/sorted variants (<code>?color=&amp;sort=</code>) →{" "}
              <code>&lt;link rel="canonical"&gt;</code> to clean PLP + <code>noindex,follow</code>.
              Pagination <code>?page=N</code> keeps self-canonicals.
            </li>
            <li>
              <strong className="text-foreground">Template governance (D5).</strong> Category =
              catalog taxonomy (PIM). Collection = curated merchandising (Payload selection).
              Room = spatial/use-case intent. One indexable page per search intent — would-be
              duplicates become a filter or collection, never a new page.
            </li>
            <li>
              <strong className="text-foreground">Language-neutral roots.</strong>{" "}
              <code>/sitemap.xml</code> and <code>/robots.txt</code> live at the domain root with
              no locale prefix.
            </li>
          </ul>
          <details className="mt-5 rounded-md border border-border bg-card p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-foreground">
              Changelog (v3.1 ← v2 ← v1)
            </summary>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
              {changelog.map((c, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: c.replace(/`([^`]+)`/g, "<code>$1</code>") }} />
              ))}
            </ul>
          </details>
        </section>

        {/* Decisions log */}
        <section className="mb-10 rounded-lg border border-border bg-card p-6">
          <div className="mb-3 flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Decisions log (v3.1)</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            The five questions that were open in v2. Each one is now closed (or explicitly
            deferred) so implementation is unblocked.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {decisions.map((d) => (
              <div
                key={d.id}
                className={`rounded-md border p-4 ${
                  d.status === "decided"
                    ? "border-success/40 bg-success/5"
                    : "border-cta/40 bg-cta/5"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-mono text-xs font-bold text-muted-foreground">
                    {d.id} · {d.topic}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      d.status === "decided"
                        ? "bg-success/15 text-success"
                        : "bg-cta/15 text-cta"
                    }`}
                  >
                    {d.status === "decided" ? "Decided" : "Open · deferred"}
                  </span>
                </div>
                <p className="text-sm text-foreground">{d.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12 June status + Sprint 0 */}
        <section className="mb-10 rounded-lg border border-cta/40 bg-cta/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <Flag className="h-5 w-5 text-cta" />
            <h2 className="text-lg font-bold text-foreground">
              12 June status &amp; Sprint 0
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            Snapshot agreed on 12 June. The decisions above (D6–D10) drive the
            list below — this is what is already built, what's still on the P0/P1
            to-do list, and the four spikes Sprint 0 has to land before P0 build
            can start.
          </p>
          {june12Status.sprint0CompletedOn && (
            <div className="mb-5 rounded-md border border-success/50 bg-success/10 p-4">
              <div className="mb-1 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <p className="text-sm font-bold text-success">
                  Sprint 0 complete — {june12Status.sprint0CompletedOn} · P0 gate open, awaiting PO sign-off
                </p>
              </div>
              {june12Status.sprint0Summary && (
                <p className="mt-1 text-sm text-foreground">{june12Status.sprint0Summary}</p>
              )}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-success/40 bg-success/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-success">
                Already built
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                {june12Status.built.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md border border-primary/40 bg-primary/5 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                Still to build (per plan)
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                {june12Status.todo.map((t, i) => (
                  <li key={i} className="flex flex-wrap items-center gap-2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: t.text.replace(/`([^`]+)`/g, "<code>$1</code>"),
                      }}
                    />
                    {t.needsBackend && <BackendPill />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-cta">
              Sprint 0 spikes (de-risking — all landed 12 Jun)
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {june12Status.spikes.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-md border p-4 ${
                    s.done
                      ? "border-success/40 bg-success/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="rounded bg-cta px-1.5 py-0.5 font-mono text-[10px] font-bold text-cta-foreground">
                      {s.id}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {s.title}
                    </h3>
                    {s.done && (
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-success/50 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        Done
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.goal}</p>
                  {s.evidence && (
                    <p className="mt-2 rounded border border-success/30 bg-success/5 p-2 text-xs text-foreground">
                      <span className="font-semibold text-success">Proof:</span>{" "}
                      {s.evidence}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Blocks:</span>{" "}
                    {s.blocks}
                  </p>
                  {s.refs && s.refs.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Refs:</span>{" "}
                      {s.refs.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          {june12Status.verification && june12Status.verification.length > 0 && (
            <div className="mt-5 rounded-md border border-border bg-card p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-cta">
                Verify it yourself (hand-on)
              </p>
              <ul className="space-y-3 text-sm text-foreground">
                {june12Status.verification.map((v) => (
                  <li key={v.id} className="border-l-2 border-cta/40 pl-3">
                    <p className="mb-1 flex items-baseline gap-2">
                      <span className="rounded bg-cta px-1.5 py-0.5 font-mono text-[10px] font-bold text-cta-foreground">
                        {v.id}
                      </span>
                      <span className="font-semibold">{v.title}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{v.steps}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">
                Full guide: <code>docs/history/2026-06-12-sprint0-derisking.md</code> · Issues #340–#343 · ADR 0014 / 0015 / ADR 0005-amendement.
              </p>
            </div>
          )}
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

        {/* Cross-cutting */}
        <section className="mt-12 rounded-lg border border-border bg-surface p-6">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Cross-cutting concerns</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Components and flows, not individual pages — but launch-relevant.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {crossCutting.map((c) => (
              <div key={c.id} className="rounded-md border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      c.severity === "launch-blocker"
                        ? "bg-destructive/15 text-destructive"
                        : c.severity === "security"
                          ? "bg-cta/15 text-cta"
                          : "bg-primary/15 text-primary"
                    }`}
                  >
                    {c.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Build priority */}
        <section className="mt-12 rounded-lg border border-primary/30 bg-primary/5 p-6">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Build priority (P0 → P3)</h2>
          </div>
          <p className="mb-5 text-sm text-muted-foreground">
            The order we propose to build in. P0 is the true happy-path MVP and is{" "}
            <strong className="text-foreground">gated on the D1 Stripe-via-Odoo POC</strong>.
          </p>
          <div className="space-y-5">
            {priorities.map((p) => (
              <div key={p.id} className="rounded-md border border-border bg-card p-5">
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <span className="rounded bg-primary px-2 py-0.5 font-mono text-xs font-bold text-primary-foreground">
                    {p.id}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">{p.description}</p>
                {p.prework && p.prework.length > 0 && (
                  <div className="mb-3 rounded-md border border-cta/40 bg-cta/5 p-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cta">
                      Blocking prework
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                      {p.prework.map((pw, i) => (
                        <li key={i}>{pw}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <ul className="grid list-disc gap-1 pl-5 text-sm text-muted-foreground md:grid-cols-2">
                  {p.items.map((it, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: it.replace(/`([^`]+)`/g, "<code>$1</code>"),
                      }}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

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