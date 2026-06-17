import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Compact, mobile-friendly pagination for the category grid.
 *
 * - Shows first / last + a sliding window of pages around the current one.
 * - Uses real <button>s (not links) since the grid filters live in component
 *   state; for SEO we render a hidden rel="prev/next" via <link> tags in the
 *   parent (see Category.tsx).
 */
export const CategoryPagination = ({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (p: number) => void;
}) => {
  if (pageCount <= 1) return null;

  // Build a compact page list: 1 … (p-1) p (p+1) … last
  const pages: (number | "…")[] = [];
  const push = (v: number | "…") => {
    if (pages[pages.length - 1] !== v) pages.push(v);
  };
  push(1);
  for (let p = page - 1; p <= page + 1; p++) {
    if (p > 1 && p < pageCount) push(p);
  }
  if (pageCount > 1) {
    if ((pages[pages.length - 1] as number) < pageCount - 1) push("…");
    push(pageCount);
  }
  // Insert leading ellipsis if needed
  if (typeof pages[1] === "number" && (pages[1] as number) > 2) {
    pages.splice(1, 0, "…");
  }

  const go = (p: number) => {
    onChange(Math.max(1, Math.min(pageCount, p)));
    // Scroll user back up to the grid so they see the new page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const btn =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={btn}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`e-${i}`}
            aria-hidden
            className="px-1 text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? "inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
                : btn
            }
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === pageCount}
        aria-label="Next page"
        className={btn}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};