import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { statusMeta, type PageStatus } from "@/lib/sitemap";

type Crumb = { label: string; to?: string };

type PageSkeletonProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  status?: PageStatus;
  breadcrumbs?: Crumb[];
  /** Section blocks to wireframe — each becomes a labelled placeholder strip. */
  blocks?: { label: string; height?: "sm" | "md" | "lg" | "xl"; note?: string }[];
  children?: ReactNode;
};

const heightMap = {
  sm: "h-24",
  md: "h-40",
  lg: "h-64",
  xl: "h-96",
} as const;

const toneClasses: Record<PageStatus, string> = {
  done: "border-success/40 bg-success/10 text-success",
  skeleton: "border-primary/40 bg-primary/10 text-primary",
  planned: "border-cta/40 bg-cta/10 text-cta",
  cms: "border-border bg-surface-muted text-muted-foreground",
};

export const PageSkeleton = ({
  title,
  eyebrow,
  description,
  status = "skeleton",
  breadcrumbs,
  blocks = [
    { label: "Hero / banner", height: "lg" },
    { label: "Primary content", height: "xl" },
    { label: "Supporting module", height: "md" },
  ],
  children,
}: PageSkeletonProps) => {
  const meta = statusMeta[status];

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            {breadcrumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3.5 w-3.5" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-primary">{c.label}</Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
            {description && <p className="mt-3 text-base text-muted-foreground">{description}</p>}
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneClasses[status]}`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {meta.label}
          </span>
        </header>

        {children ?? (
          <div className="space-y-4">
            {blocks.map((b, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-lg border border-dashed border-border bg-surface ${heightMap[b.height ?? "md"]}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,hsl(var(--border))_47%,hsl(var(--border))_53%,transparent_54%)] bg-[length:14px_14px] opacity-40" />
                <div className="absolute left-4 top-4 rounded bg-card px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  {b.label}
                </div>
                {b.note && (
                  <div className="absolute bottom-4 right-4 max-w-xs rounded bg-card px-2 py-1 text-xs text-muted-foreground shadow-sm">
                    {b.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-lg border border-border bg-surface p-4 text-sm text-muted-foreground">
          This is a developer skeleton. See the full{" "}
          <Link to="/sitemap" className="font-semibold text-primary hover:underline">
            site tree & hand-off doc
          </Link>{" "}
          for status, owners and what needs to be built next.
        </div>
      </div>
    </SiteLayout>
  );
};