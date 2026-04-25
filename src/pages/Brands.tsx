import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { brandLogos } from "@/components/home/BrandLogos";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { brands, products } from "@/data/products";

/* ---------- Brand tiers (mirrors the megamenu structure) ---------- */
type Tier = "premium" | "everyday" | "professional";

const TIERS: { id: Tier; label: string; description: string; brandSlugs: string[] }[] = [
  {
    id: "premium",
    label: "Premium designer",
    description:
      "Iconic Scandinavian and Italian houses — the pieces you'll keep for a lifetime.",
    brandSlugs: ["louis-poulsen", "flos", "artemide", "martinelli-luce", "tradition", "normann-copenhagen"],
  },
  {
    id: "everyday",
    label: "Everyday lighting",
    description: "Reliable favourites for every room — quality fixtures at honest prices.",
    brandSlugs: ["nordlux", "philips"],
  },
  {
    id: "professional",
    label: "Architectural & professional",
    description:
      "Specification-grade luminaires engineered for retail, hospitality and offices.",
    brandSlugs: ["absinthe", "vysn"],
  },
];

/* ---------- Reusable horizontal carousel of products ---------- */
const ProductRail = ({ items, ariaLabel }: { items: typeof products; ariaLabel: string }) => {
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

      {/* Desktop scroll buttons */}
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

/* ---------- Decorative pendant-lamp silhouette for the hero ---------- */
const PendantSkyline = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 1200 220"
    preserveAspectRatio="xMidYEnd slice"
    aria-hidden
    className={className}
  >
    {/* Floor line */}
    <line x1="0" y1="218" x2="1200" y2="218" stroke="currentColor" strokeWidth="2" />
    {/* Repeating pendant silhouettes — varied heights & shapes */}
    {[
      { cx: 80, top: 30, len: 90, type: "globe", r: 28 },
      { cx: 160, top: 40, len: 120, type: "cone" },
      { cx: 240, top: 20, len: 70, type: "dome", r: 36 },
      { cx: 330, top: 50, len: 130, type: "globe", r: 24 },
      { cx: 410, top: 30, len: 100, type: "cone" },
      { cx: 500, top: 25, len: 90, type: "dome", r: 40 },
      { cx: 590, top: 45, len: 130, type: "globe", r: 22 },
      { cx: 660, top: 30, len: 100, type: "cone" },
      { cx: 740, top: 20, len: 80, type: "dome", r: 34 },
      { cx: 820, top: 50, len: 120, type: "globe", r: 26 },
      { cx: 900, top: 30, len: 100, type: "cone" },
      { cx: 980, top: 25, len: 90, type: "dome", r: 38 },
      { cx: 1070, top: 40, len: 130, type: "globe", r: 24 },
      { cx: 1150, top: 30, len: 100, type: "cone" },
    ].map((p, i) => {
      const cordY = p.top + p.len;
      return (
        <g key={i} fill="currentColor" stroke="currentColor">
          {/* Cord */}
          <line
            x1={p.cx}
            y1={0}
            x2={p.cx}
            y2={cordY}
            strokeWidth="1.5"
            stroke="currentColor"
          />
          {p.type === "globe" && (
            <circle cx={p.cx} cy={cordY + (p.r ?? 24)} r={p.r ?? 24} />
          )}
          {p.type === "dome" && (
            <path
              d={`M ${p.cx - (p.r ?? 36)} ${cordY + (p.r ?? 36)} A ${p.r ?? 36} ${p.r ?? 36} 0 0 1 ${p.cx + (p.r ?? 36)} ${cordY + (p.r ?? 36)} L ${p.cx - (p.r ?? 36)} ${cordY + (p.r ?? 36)} Z`}
            />
          )}
          {p.type === "cone" && (
            <path
              d={`M ${p.cx - 4} ${cordY} L ${p.cx + 4} ${cordY} L ${p.cx + 28} ${cordY + 40} L ${p.cx - 28} ${cordY + 40} Z`}
            />
          )}
        </g>
      );
    })}
  </svg>
);

const Brands = () => {
  const [params] = useSearchParams();
  const tierFilter = params.get("tier") as Tier | null;

  useEffect(() => {
    document.title = "Shop by brand — Abitaz";
    const desc =
      "Discover Abitaz's curated line-up of designer and architectural lighting brands — Louis Poulsen, Flos, Nordlux, Philips and more.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  // Top picks = first product of every brand that has products
  const topPicks = useMemo(() => {
    const seen = new Set<string>();
    const picks: typeof products = [];
    for (const p of products) {
      if (!seen.has(p.brandSlug)) {
        seen.add(p.brandSlug);
        picks.push(p);
      }
    }
    return picks;
  }, []);

  const visibleTiers = tierFilter
    ? TIERS.filter((t) => t.id === tierFilter)
    : TIERS;

  /* Brand → product count, used in the tile grid */
  const productsByBrand = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      const arr = map.get(p.brandSlug) ?? [];
      arr.push(p);
      map.set(p.brandSlug, arr);
    }
    return map;
  }, []);

  return (
    <SiteLayout>
      {/* ---------- Themed hero (Amazon "Brands of Belgium" style) ---------- */}
      <section
        aria-label="Shop by brand"
        className="container-abitaz mt-6"
      >
        <div className="relative overflow-hidden rounded-lg bg-cta">
          {/* Decorative skyline */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 text-cta-foreground/15">
            <PendantSkyline className="h-full w-full" />
          </div>

          <div className="relative px-6 py-10 md:px-12 md:py-16 lg:py-20">
            <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-cta-foreground md:text-6xl lg:text-7xl">
              Shop by <span className="text-foreground">Brand</span>
            </h1>
            <p className="mt-3 font-display text-2xl font-semibold text-cta-foreground/95 md:text-3xl">
              Discover our designer line-up
            </p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-foreground/85 md:text-base">
          With our brand directory we bring together the designers, manufacturers
          and architectural specialists that shape every Abitaz project — from
          iconic Scandinavian classics to specification-grade professional
          lighting. Browse the full line-up below or jump straight into the
          collection that fits your style.
        </p>
      </section>

      {/* ---------- Top brand picks ---------- */}
      <section
        aria-labelledby="top-brand-picks"
        className="container-abitaz mt-10"
      >
        <div className="rounded-lg bg-surface p-5 md:p-8">
          <div className="mb-4 flex items-baseline justify-between">
            <h2
              id="top-brand-picks"
              className="font-display text-xl font-bold md:text-2xl"
            >
              Top brand picks
            </h2>
            <Link
              to="/category/pendant-lamps"
              className="text-sm font-medium text-primary hover:underline"
            >
              See all products
            </Link>
          </div>
          <ProductRail items={topPicks} ariaLabel="Top brand picks" />
        </div>
      </section>

      {/* ---------- Shop by brand — tile grid ---------- */}
      <section
        aria-labelledby="shop-by-brand"
        className="container-abitaz mt-12"
      >
        <h2
          id="shop-by-brand"
          className="mb-5 font-display text-xl font-bold md:text-2xl"
        >
          Shop by brand
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((b) => {
            const Logo = brandLogos[b.slug];
            const count = productsByBrand.get(b.slug)?.length ?? 0;
            return (
              <li key={b.slug}>
                <Link
                  to={`/brands/${b.slug}`}
                  aria-label={`${b.name} — shop all products`}
                  className="group block overflow-hidden rounded-md border border-border bg-card transition hover:shadow-md"
                >
                  <div className="grid aspect-[4/3] place-items-center bg-cta/10 px-4 text-foreground/80 transition group-hover:bg-cta/20">
                    {Logo ? (
                      <Logo className="h-10 w-auto max-w-[80%]" />
                    ) : (
                      <span className="font-display font-semibold">{b.name}</span>
                    )}
                  </div>
                  <div className="border-t border-border bg-background px-3 py-2.5">
                    <p className="truncate font-display text-sm font-semibold text-foreground">
                      {b.name}
                    </p>
                    {count > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {count} {count === 1 ? "product" : "products"}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------- Per-tier rails ---------- */}
      {visibleTiers.map((tier) => {
        const tierProducts = products.filter((p) =>
          tier.brandSlugs.includes(p.brandSlug),
        );
        if (tierProducts.length === 0) return null;
        return (
          <section
            key={tier.id}
            aria-labelledby={`tier-${tier.id}`}
            className="container-abitaz mt-12"
          >
            <div className="rounded-lg bg-surface p-5 md:p-8">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div className="min-w-0">
                  <h2
                    id={`tier-${tier.id}`}
                    className="font-display text-xl font-bold md:text-2xl"
                  >
                    {tier.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </div>
                <Link
                  to={`/brands?tier=${tier.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  See the brands
                </Link>
              </div>

              {/* Brand chips for this tier */}
              <div className="mb-4 flex flex-wrap gap-2">
                {tier.brandSlugs.map((slug) => {
                  const b = brands.find((x) => x.slug === slug);
                  if (!b) return null;
                  return (
                    <Link
                      key={slug}
                      to={`/brands/${slug}`}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {b.name}
                    </Link>
                  );
                })}
              </div>

              <ProductRail
                items={tierProducts}
                ariaLabel={`${tier.label} products`}
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

export default Brands;