import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lamp,
  LampCeiling,
  LampDesk,
  LampFloor,
  LampWallUp,
  Lightbulb,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";

/* ---------- Visual mapping (icon + hero image per category) ---------- */
const categoryIcons: Record<string, LucideIcon> = {
  "indoor-lighting": Lamp,
  "pendant-lamps": LampCeiling,
  "ceiling-lamps": LampCeiling,
  "wall-lamps": LampWallUp,
  "floor-lamps": LampFloor,
  "table-lamps": LampDesk,
  "outdoor-lighting": TreePine,
  bulbs: Lightbulb,
};

/* Pick a representative product image for each category (Amazon-style tiles). */
const categoryHeroSlug: Record<string, string> = {
  "indoor-lighting": "louis-poulsen-ph5-mini-orange",
  "pendant-lamps": "tradition-flowerpot-vp2-darkgreen",
  "ceiling-lamps": "vysn-tevo-360-downlight",
  "wall-lamps": "slv-wall-updown-black",
  "floor-lamps": "vysn-velyth-floor",
  "table-lamps": "artemide-nesso",
  "outdoor-lighting": "slv-track-spot-black",
  bulbs: "philips-hue-e27",
};

/* ---------- Higher-level groupings (Amazon "department" feel) ---------- */
type Group = {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
};

const GROUPS: Group[] = [
  {
    id: "indoor",
    title: "Indoor lighting",
    blurb:
      "Pendants, ceiling, wall and table lamps for every room in the house.",
    slugs: [
      "indoor-lighting",
      "pendant-lamps",
      "ceiling-lamps",
      "wall-lamps",
      "floor-lamps",
      "table-lamps",
    ],
  },
  {
    id: "outdoor",
    title: "Outdoor lighting",
    blurb: "Garden, façade and pathway fixtures built for Belgian weather.",
    slugs: ["outdoor-lighting"],
  },
  {
    id: "bulbs",
    title: "Bulbs & accessories",
    blurb: "Replacement bulbs and the small extras that finish the job.",
    slugs: ["bulbs"],
  },
];

/* ---------- Reusable horizontal product rail (mirrors Brands page) ---------- */
const ProductRail = ({
  items,
  ariaLabel,
}: {
  items: typeof products;
  ariaLabel: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        aria-label={ariaLabel}
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <div
            key={p.slug}
            className="w-[180px] flex-none snap-start sm:w-[220px] md:w-[240px]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition hover:bg-muted md:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition hover:bg-muted md:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

const Categories = () => {
  useEffect(() => {
    document.title = "Shop by category — Abitaz";
    const desc =
      "Browse every Abitaz lighting category: indoor and outdoor lamps, pendants, ceiling, wall, floor and table lamps, plus bulbs and accessories.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  /* Look up products per category slug + a hero image fallback. */
  const productsByCategory = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      const arr = map.get(p.categorySlug) ?? [];
      arr.push(p);
      map.set(p.categorySlug, arr);
    }
    return map;
  }, []);

  const heroImageFor = (slug: string): string | undefined => {
    const preferredSlug = categoryHeroSlug[slug];
    const preferred = preferredSlug
      ? products.find((p) => p.slug === preferredSlug)
      : undefined;
    if (preferred) return preferred.image;
    return productsByCategory.get(slug)?.[0]?.image;
  };

  /* Top picks across the whole catalogue: first product per category. */
  const topPicks = useMemo(() => {
    const seen = new Set<string>();
    const picks: typeof products = [];
    for (const p of products) {
      if (!seen.has(p.categorySlug)) {
        seen.add(p.categorySlug);
        picks.push(p);
      }
    }
    return picks;
  }, [productsByCategory]);

  return (
    <SiteLayout>
      {/* ---------- Hero ---------- */}
      <section aria-label="Shop by category" className="container-abitaz mt-6">
        <div className="relative overflow-hidden rounded-lg bg-cta">
          <div className="relative px-6 py-10 md:px-12 md:py-16 lg:py-20">
            <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-cta-foreground md:text-6xl lg:text-7xl">
              Shop by <span className="text-foreground">Category</span>
            </h1>
            <p className="mt-3 max-w-2xl font-display text-xl font-semibold text-cta-foreground/95 md:text-2xl">
              Find the right fixture for every room, mood and project.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-foreground/85 md:text-base">
          From statement pendants to garden floodlights, every category at
          Abitaz is hand-picked for quality, energy efficiency and honest
          prices. Pick a department below to dive in.
        </p>
      </section>

      {/* ---------- Top category picks rail ---------- */}
      <section
        aria-labelledby="top-category-picks"
        className="container-abitaz mt-10"
      >
        <div className="rounded-lg bg-surface p-5 md:p-8">
          <div className="mb-4 flex items-baseline justify-between">
            <h2
              id="top-category-picks"
              className="font-display text-xl font-bold md:text-2xl"
            >
              Top picks across categories
            </h2>
            <Link
              to="/category/pendant-lamps"
              className="text-sm font-medium text-primary hover:underline"
            >
              See all products
            </Link>
          </div>
          <ProductRail items={topPicks} ariaLabel="Top category picks" />
        </div>
      </section>

      {/* ---------- Shop by category — Amazon-style tile grid ---------- */}
      <section
        aria-labelledby="shop-by-category"
        className="container-abitaz mt-12"
      >
        <h2
          id="shop-by-category"
          className="mb-5 font-display text-xl font-bold md:text-2xl"
        >
          All categories
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug] ?? Lamp;
            const img = heroImageFor(c.slug);
            const realCount = productsByCategory.get(c.slug)?.length ?? 0;
            return (
              <li key={c.slug}>
                <Link
                  to={`/category/${c.slug}`}
                  aria-label={`${c.name} — shop all products`}
                  className="group block overflow-hidden rounded-md border border-border bg-card transition hover:shadow-md"
                >
                  <div className="relative grid aspect-[4/3] place-items-center bg-cta/10 transition group-hover:bg-cta/20">
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <Icon
                        className="h-12 w-12 text-foreground/70"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    )}
                    <span className="absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-primary shadow-sm">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                  <div className="border-t border-border bg-background px-3 py-2.5">
                    <p className="truncate font-display text-sm font-semibold text-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {realCount > 0 ? realCount : c.count}{" "}
                      {(realCount || c.count) === 1 ? "product" : "products"}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Per-group rails (Amazon "department" sections) ---------- */}
      {GROUPS.map((group) => {
        const groupProducts = products.filter((p) =>
          group.slugs.includes(p.categorySlug),
        );
        if (groupProducts.length === 0) return null;
        return (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}`}
            className="container-abitaz mt-12"
          >
            <div className="rounded-lg bg-surface p-5 md:p-8">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="min-w-0">
                  <h2
                    id={`group-${group.id}`}
                    className="font-display text-xl font-bold md:text-2xl"
                  >
                    {group.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{group.blurb}</p>
                </div>
                <Link
                  to={`/category/${group.slugs[0]}`}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Shop the department
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </div>

              {/* Sub-category chips */}
              <div className="mb-4 flex flex-wrap gap-2">
                {group.slugs.map((slug) => {
                  const c = categories.find((x) => x.slug === slug);
                  if (!c) return null;
                  return (
                    <Link
                      key={slug}
                      to={`/category/${slug}`}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {c.name}
                    </Link>
                  );
                })}
              </div>

              <ProductRail
                items={groupProducts}
                ariaLabel={`${group.title} products`}
              />
            </div>
          </section>
        );
      })}

      <div className="container-abitaz mt-12 mb-16 text-center">
        <Link
          to="/category/pendant-lamps"
          className="inline-flex h-12 items-center justify-center rounded-md bg-cta px-8 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
        >
          Browse the full catalogue
        </Link>
      </div>
    </SiteLayout>
  );
};

export default Categories;