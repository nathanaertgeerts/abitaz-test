import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Lamp, type LucideIcon } from "lucide-react";
import { products } from "@/data/products";

type Sub = { slug: string; name: string };

type Props = {
  /** Parent group slug (used for the "All …" pill that links to the group page). */
  groupSlug: string;
  groupName: string;
  subs: Sub[];
  /** Currently active slug — may be the group itself or any sub. */
  activeSlug: string;
  /** Fallback icon if a sub has no product thumbnail. */
  fallbackIcon?: LucideIcon;
};

/** Pick the first product image for a category slug, if available. */
const thumbFor = (slug: string): string | undefined =>
  products.find((p) => p.categorySlug === slug)?.image;

/**
 * Horizontal quick-nav: pill cards with a small product thumbnail + label.
 * - Mobile: native snap scroll, no chrome.
 * - Desktop: fade edges + chevron buttons that programmatically scroll.
 */
export const SubcategoryQuickNav = ({
  groupSlug,
  groupName,
  subs,
  activeSlug,
  fallbackIcon: FallbackIcon = Lamp,
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [subs.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  // "All <group>" + each sub, with thumbnail or fallback icon.
  const items: { slug: string; name: string; href: string; image?: string }[] = [
    {
      slug: groupSlug,
      name: `All ${groupName.toLowerCase()}`,
      href: `/categories/${groupSlug}`,
    },
    ...subs.map((s) => ({
      slug: s.slug,
      name: s.name,
      href: `/categories/${s.slug}`,
      image: thumbFor(s.slug),
    })),
  ];

  return (
    <nav aria-label={`${groupName} quick navigation`} className="relative mb-6">
      {/* Desktop chevron — left */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className={`absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition lg:grid ${
          canPrev ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      {/* Edge fade — left */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 z-[1] h-full w-8 bg-gradient-to-r from-background to-transparent transition-opacity ${
          canPrev ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((it) => {
          const isActive = it.slug === activeSlug;
          return (
            <Link
              key={it.slug}
              to={it.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex shrink-0 snap-start items-center gap-3 rounded-full border bg-card py-1.5 pl-1.5 pr-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-md ${
                isActive
                  ? "border-primary text-primary ring-1 ring-primary/30"
                  : "border-border text-foreground"
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-surface">
                {it.image ? (
                  <img
                    src={it.image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FallbackIcon className="h-5 w-5 text-primary" strokeWidth={1.75} aria-hidden />
                )}
              </span>
              <span className="whitespace-nowrap">{it.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Edge fade — right */}
      <div
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 z-[1] h-full w-8 bg-gradient-to-l from-background to-transparent transition-opacity ${
          canNext ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Desktop chevron — right */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className={`absolute right-0 top-1/2 z-10 hidden h-9 w-9 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-md transition lg:grid ${
          canNext ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </nav>
  );
};