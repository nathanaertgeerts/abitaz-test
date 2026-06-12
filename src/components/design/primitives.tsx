import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

/* =========================================================================
   Shared design primitives used across all skeleton-replacement pages.
   Keeps brand tokens consistent (primary blue, cta orange, Manrope display)
   and lets pages stay short & declarative.
   ========================================================================= */

export type Crumb = { label: string; to?: string };

/* ---------- Page shell ---------- */

export const Crumbs = ({ items }: { items: Crumb[] }) => (
  <nav
    aria-label="breadcrumb"
    className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
  >
    <Link to="/" className="hover:text-primary">
      Home
    </Link>
    {items.map((c, i) => (
      <span key={i} className="flex items-center gap-1">
        <ChevronRight className="h-3.5 w-3.5" />
        {c.to ? (
          <Link to={c.to} className="hover:text-primary">
            {c.label}
          </Link>
        ) : (
          <span className="text-foreground">{c.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export const Page = ({
  crumbs,
  children,
}: {
  crumbs?: Crumb[];
  children: ReactNode;
}) => (
  <SiteLayout>
    <div className="container-abitaz py-6 md:py-8">
      {crumbs && crumbs.length > 0 && <div className="mb-4">{Crumbs({ items: crumbs })}</div>}
      {children}
    </div>
  </SiteLayout>
);

/* ---------- Hero ---------- */

export const PageHero = ({
  eyebrow,
  title,
  description,
  actions,
  tone = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: "default" | "muted" | "primary";
}) => {
  const toneCls =
    tone === "primary"
      ? "bg-primary text-primary-foreground"
      : tone === "muted"
        ? "bg-surface"
        : "";
  const eyebrowCls =
    tone === "primary" ? "text-primary-foreground/80" : "text-primary";
  const descCls =
    tone === "primary" ? "text-primary-foreground/85" : "text-muted-foreground";
  return (
    <section
      className={`rounded-2xl border border-border px-6 py-10 md:px-10 md:py-14 ${toneCls}`}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowCls}`}>
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className={`mt-4 text-base md:text-lg ${descCls}`}>{description}</p>
        )}
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
};

/* ---------- Buttons (semantic) ---------- */

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "cta" | "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition disabled:opacity-50";
const btnSizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};
const btnVariants = {
  cta: "bg-cta text-cta-foreground hover:bg-cta-hover",
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline: "border border-input bg-background text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

export const Btn = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "cta",
  size = "md",
  className = "",
}: ButtonProps) => {
  const cls = `${btnBase} ${btnSizes[size]} ${btnVariants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

/* ---------- Section heading ---------- */

export const SectionHeading = ({
  kicker,
  title,
  description,
  action,
}: {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {kicker}
        </p>
      )}
      <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">{title}</h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    {action}
  </div>
);

/* ---------- Feature / benefit grid ---------- */

export const FeatureGrid = ({
  items,
  cols = 3,
}: {
  items: { icon?: LucideIcon; title: string; body: string }[];
  cols?: 2 | 3 | 4;
}) => {
  const colsCls =
    cols === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : cols === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";
  return (
    <div className={`grid gap-4 ${colsCls}`}>
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 transition hover:shadow-md"
          >
            {Icon && (
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <h3 className="mt-3 font-display text-base font-bold">{it.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
          </div>
        );
      })}
    </div>
  );
};

/* ---------- Steps (numbered) ---------- */

export const StepsList = ({
  items,
}: {
  items: { title: string; body: string }[];
}) => (
  <ol className="grid gap-4 md:grid-cols-3">
    {items.map((it, i) => (
      <li
        key={i}
        className="relative rounded-lg border border-border bg-card p-5"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
          {i + 1}
        </span>
        <h3 className="mt-3 font-display text-base font-bold">{it.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{it.body}</p>
      </li>
    ))}
  </ol>
);

/* ---------- FAQ accordion (native details) ---------- */

export const FAQAccordion = ({
  items,
}: {
  items: { q: string; a: string }[];
}) => (
  <div className="divide-y divide-border rounded-lg border border-border bg-card">
    {items.map((it, i) => (
      <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left font-display text-base font-semibold">
          {it.q}
          <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
        </summary>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
      </details>
    ))}
  </div>
);

/* ---------- Empty state ---------- */

export const EmptyState = ({
  icon: Icon,
  title,
  body,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  body?: string;
  cta?: ReactNode;
}) => (
  <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-10 text-center">
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface text-muted-foreground">
      <Icon className="h-6 w-6" />
    </div>
    <h2 className="mt-4 font-display text-2xl font-bold">{title}</h2>
    {body && <p className="mt-2 text-sm text-muted-foreground">{body}</p>}
    {cta && <div className="mt-6 flex justify-center">{cta}</div>}
  </div>
);

/* ---------- Auth card (centered) ---------- */

export const AuthCard = ({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) => (
  <div className="mx-auto max-w-md">
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 font-display text-2xl font-bold md:text-3xl">{title}</h1>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-6 space-y-4">{children}</div>
    </div>
    {footer && (
      <p className="mt-4 text-center text-sm text-muted-foreground">{footer}</p>
    )}
  </div>
);

/* ---------- Form helpers ---------- */

export const Field = ({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-foreground">
      {label}
      {required && <span className="text-destructive">*</span>}
    </span>
    {children}
    {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

export const TextInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
) => <input {...props} className={`input ${props.className ?? ""}`} />;

export const TextArea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => (
  <textarea
    {...props}
    className={`block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${props.className ?? ""}`}
  />
);

/* ---------- Account layout ---------- */

export const accountNav: { to: string; label: string }[] = [
  { to: "/account", label: "Overview" },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/invoices", label: "Invoices" },
  { to: "/account/returns", label: "Returns" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/payment-methods", label: "Payment methods" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/account/preferences", label: "Preferences" },
];

export const AccountLayout = ({
  active,
  title,
  description,
  actions,
  crumbs,
  children,
}: {
  active: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  crumbs?: Crumb[];
  children: ReactNode;
}) => (
  <Page crumbs={crumbs ?? [{ label: "Account", to: "/account" }, { label: title }]}>
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          My account
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions}
    </div>
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-lg border border-border bg-card p-3 lg:sticky lg:top-32">
        <nav className="flex flex-col gap-0.5 text-sm">
          {accountNav.map((t) => {
            const isActive = active === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`rounded px-3 py-2 transition ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
          <div className="my-2 h-px bg-border" />
          <Link
            to="/login"
            className="rounded px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-destructive"
          >
            Sign out
          </Link>
        </nav>
      </aside>
      <div className="min-w-0 space-y-6">{children}</div>
    </div>
  </Page>
);

/* ---------- Card primitives ---------- */

export const Card = ({
  title,
  action,
  children,
  className = "",
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section className={`rounded-lg border border-border bg-card p-5 md:p-6 ${className}`}>
    {(title || action) && (
      <div className="mb-4 flex items-center justify-between gap-3">
        {title && <h3 className="font-display text-base font-bold">{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </section>
);

export const StatusPill = ({
  tone,
  children,
}: {
  tone: "success" | "warn" | "info" | "muted" | "danger";
  children: ReactNode;
}) => {
  const map = {
    success: "bg-success/15 text-success",
    warn: "bg-cta/15 text-cta",
    info: "bg-primary/10 text-primary",
    muted: "bg-muted text-muted-foreground",
    danger: "bg-destructive/15 text-destructive",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[tone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
};

/* ---------- Timeline ---------- */

export const Timeline = ({
  steps,
}: {
  steps: { label: string; meta?: string; state: "done" | "current" | "todo" }[];
}) => (
  <ol className="space-y-4">
    {steps.map((s, i) => (
      <li key={i} className="flex gap-3">
        <div className="flex flex-col items-center">
          <span
            className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
              s.state === "done"
                ? "bg-success text-success-foreground"
                : s.state === "current"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-muted-foreground"
            }`}
          >
            {s.state === "done" ? <Check className="h-4 w-4" /> : i + 1}
          </span>
          {i < steps.length - 1 && (
            <span
              className={`mt-1 w-px flex-1 ${
                s.state === "done" ? "bg-success" : "bg-border"
              }`}
            />
          )}
        </div>
        <div className="pb-3">
          <div
            className={`font-medium ${
              s.state === "todo" ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {s.label}
          </div>
          {s.meta && (
            <div className="text-xs text-muted-foreground">{s.meta}</div>
          )}
        </div>
      </li>
    ))}
  </ol>
);

/* ---------- Legal / long-form doc ---------- */

export const LegalDoc = ({
  title,
  lastUpdated,
  sections,
}: {
  title: string;
  lastUpdated: string;
  sections: { id: string; title: string; body: ReactNode }[];
}) => (
  <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
    <aside className="h-fit lg:sticky lg:top-32">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <nav className="mt-3 flex flex-col gap-1 border-l border-border pl-3 text-sm">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="text-muted-foreground hover:text-primary">
            {s.title}
          </a>
        ))}
      </nav>
    </aside>
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated {lastUpdated}</p>
      <div className="prose-abitaz mt-8 space-y-10">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-32">
            <h2 className="font-display text-xl font-bold">{s.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/85">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </article>
  </div>
);

/* ---------- Sample product grid (designer placeholder) ---------- */

import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

export const SampleProductGrid = ({
  count = 8,
  offset = 0,
}: {
  count?: number;
  offset?: number;
}) => (
  <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.slice(offset, offset + count).map((p) => (
      <ProductCard key={p.slug} product={p} />
    ))}
  </div>
);

/* ---------- Decorative illustration block (when no real image yet) ---------- */

export const ImagePlaceholder = ({
  label,
  aspect = "aspect-[4/3]",
  tone = "muted",
}: {
  label?: string;
  aspect?: string;
  tone?: "muted" | "primary" | "warm";
}) => {
  const toneCls =
    tone === "primary"
      ? "bg-primary/10"
      : tone === "warm"
        ? "bg-secondary/40"
        : "bg-surface";
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${aspect} ${toneCls}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--background))_0,transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,hsl(var(--border))_47%,hsl(var(--border))_53%,transparent_54%)] bg-[length:18px_18px] opacity-25" />
      {label && (
        <span className="absolute bottom-3 left-3 rounded bg-card/90 px-2 py-1 text-[11px] font-medium text-muted-foreground shadow-sm">
          {label}
        </span>
      )}
    </div>
  );
};