import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";
import promoDesigner from "@/assets/promo-designer-sale.jpg";

/**
 * Sidebar tree: top-level groups, each with their own subcategories.
 * Drives both highlighting the current page and which group auto-opens.
 */
const categoryTree: { slug: string; name: string; subs: { slug: string; name: string }[] }[] = [
  {
    slug: "indoor-lighting",
    name: "Indoor lighting",
    subs: [
      { slug: "pendant-lamps", name: "Pendant lamps" },
      { slug: "ceiling-lamps", name: "Ceiling lamps" },
      { slug: "wall-lamps", name: "Wall lamps" },
      { slug: "floor-lamps", name: "Floor lamps" },
      { slug: "table-lamps", name: "Table lamps" },
    ],
  },
  {
    slug: "outdoor-lighting",
    name: "Outdoor lighting",
    subs: [
      { slug: "outdoor-wall-lamps", name: "Outdoor wall lamps" },
      { slug: "outdoor-ceiling", name: "Outdoor ceiling" },
      { slug: "ground-spots", name: "Ground spots" },
      { slug: "path-lighting", name: "Path lighting" },
      { slug: "string-lights", name: "String lights" },
    ],
  },
  {
    slug: "bulbs",
    name: "Light bulbs",
    subs: [
      { slug: "bulbs", name: "All bulbs" },
      { slug: "smart-lighting", name: "Smart bulbs" },
    ],
  },
];

/* ---------- Filter facet definitions per top-category ---------- */
type CheckFacet = { title: string; options: { name: string; count: number }[] };
type SwatchFacet = {
  title: string;
  options: { name: string; swatch: string; count: number }[];
};
type FilterSet = {
  /** Range filter (Price / Wattage etc.) */
  range: { title: string; min: number; max: number; unit?: string };
  /** Plain checkbox facets */
  checks: CheckFacet[];
  /** Optional colour-swatch facet */
  swatches?: SwatchFacet;
};

const lightingFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 865, unit: "€" },
  checks: [
    {
      title: "Material",
      options: [
        { name: "Aluminium", count: 185 },
        { name: "Glass", count: 81 },
        { name: "Metal", count: 281 },
        { name: "Plastic", count: 21 },
        { name: "Wood", count: 31 },
      ],
    },
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "White", swatch: "#ffffff", count: 1825 },
      { name: "Black", swatch: "#1f1f1f", count: 1705 },
      { name: "Gold", swatch: "#d4af37", count: 1523 },
      { name: "Grey", swatch: "#9ca3af", count: 1054 },
      { name: "Silver", swatch: "#c0c0c0", count: 854 },
    ],
  },
};

const outdoorFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 865, unit: "€" },
  checks: [
    {
      title: "IP rating",
      options: [
        { name: "IP44 — splash proof", count: 312 },
        { name: "IP54 — dust & splash", count: 198 },
        { name: "IP65 — water jets", count: 145 },
        { name: "IP67 — submersible", count: 47 },
      ],
    },
    {
      title: "Material",
      options: [
        { name: "Aluminium", count: 220 },
        { name: "Stainless steel", count: 132 },
        { name: "Galvanised steel", count: 84 },
        { name: "Plastic", count: 51 },
      ],
    },
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "Black", swatch: "#1f1f1f", count: 412 },
      { name: "Anthracite", swatch: "#3a3a3a", count: 298 },
      { name: "White", swatch: "#ffffff", count: 187 },
      { name: "Brass", swatch: "#b58a3a", count: 96 },
    ],
  },
};

const bulbFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 80, unit: "€" },
  checks: [
    {
      title: "Socket",
      options: [
        { name: "E27", count: 482 },
        { name: "E14", count: 381 },
        { name: "GU10", count: 264 },
        { name: "G9", count: 88 },
        { name: "B22", count: 25 },
      ],
    },
    {
      title: "Wattage (LED)",
      options: [
        { name: "≤ 4W", count: 145 },
        { name: "5–7W", count: 312 },
        { name: "8–10W", count: 187 },
        { name: "> 10W", count: 64 },
      ],
    },
    {
      title: "Colour temperature",
      options: [
        { name: "2200K — extra warm", count: 92 },
        { name: "2700K — warm white", count: 421 },
        { name: "3000K — soft white", count: 198 },
        { name: "4000K — cool white", count: 64 },
        { name: "Tunable white", count: 38 },
      ],
    },
    {
      title: "Features",
      options: [
        { name: "Dimmable", count: 312 },
        { name: "Smart / Wi-Fi", count: 84 },
        { name: "Filament look", count: 145 },
      ],
    },
  ],
};

/** Pick the right filter set for the active top-category. */
const getFiltersForGroup = (groupSlug: string): FilterSet => {
  if (groupSlug === "bulbs") return bulbFilters;
  if (groupSlug === "outdoor-lighting") return outdoorFilters;
  return lightingFilters;
};

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details open className="border-b border-border py-4 [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
      {title}
      <ChevronDown className="transition group-open:rotate-180" />
    </summary>
    <div className="mt-3 space-y-2 text-sm">{children}</div>
  </details>
);

const Category = () => {
  const { slug = "pendant-lamps" } = useParams();
  const cat = useMemo(() => categories.find((c) => c.slug === slug), [slug]);
  // Resolve the top-level group of the active page (drives which filter set
  // and which sub-list to show in the sidebar).
  const activeGroup = useMemo(
    () =>
      categoryTree.find(
        (g) => g.slug === slug || g.subs.some((s) => s.slug === slug),
      ) ?? categoryTree[0],
    [slug],
  );
  const filterSet = useMemo(() => getFiltersForGroup(activeGroup.slug), [activeGroup]);
  // Filter the product grid down to the active category, but fall back to
  // all products when the demo dataset has no items for that slug — this
  // keeps every category page populated for the prototype.
  const list = useMemo(() => {
    const inCat = products.filter((p) => p.categorySlug === slug);
    return inCat.length > 0 ? inCat : products;
  }, [slug]);
  const [sort, setSort] = useState("popularity");
  // Filters are collapsed by default on mobile, always shown on desktop (lg+)
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const name = cat?.name ?? "Lighting";
    document.title = `${name} — Abitaz`;
    const desc = `Shop ${name.toLowerCase()} at Abitaz. Real stock, fast delivery and honest prices.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [cat]);

  const sorted = useMemo(() => {
    const copy = [...list];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [list, sort]);

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        {/* Header row: breadcrumb + title stacked on the left,
            slim promo banner on the right (desktop only) — banner top
            aligns with the breadcrumb. */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="lg:w-[260px] lg:flex-none">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li aria-hidden>/</li>
                <li><a href="/category/pendant-lamps" className="hover:text-primary">Lighting</a></li>
                <li aria-hidden>/</li>
                <li className="text-foreground">{cat?.name ?? "Pendant lamps"}</li>
              </ol>
            </nav>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              {cat?.name ?? "Pendant lamps"}
            </h1>
          </div>
          <Link
            to="/sale"
            aria-label="Winter Sale — up to 45% off designer lighting"
            className="group relative hidden flex-1 overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-sm lg:block"
          >
            <img
              src={promoDesigner}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
            <div className="relative flex h-full items-center justify-between gap-4 px-5">
              <div className="flex items-center gap-3">
                <span className="rounded-sm bg-cta px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-cta-foreground">
                  Winter Sale
                </span>
                <span className="font-display text-xl font-bold leading-tight">
                  Up to -45% on designer lighting
                </span>
              </div>
              <span className="rounded-md bg-background/15 px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-primary-foreground/30 transition group-hover:bg-background/25">
                Shop the sale
              </span>
            </div>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            {/* Mobile toggle for the whole filter panel */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="category-filters"
              className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground lg:hidden"
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div id="category-filters" className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
            <details open className="border-b border-border py-4">
              <summary className="cursor-pointer text-sm font-semibold">Categories</summary>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="font-semibold text-primary">{activeGroup.name}</li>
                {categoryTree.map((group) => {
                  const isActiveGroup =
                    group.slug === slug || group.subs.some((s) => s.slug === slug);
                  return (
                    <li key={group.slug} className="ml-3">
                      <Link
                        to={`/category/${group.slug}`}
                        aria-current={group.slug === slug ? "page" : undefined}
                        className={
                          group.slug === slug
                            ? "font-semibold text-primary"
                            : "font-medium text-foreground hover:text-primary"
                        }
                      >
                        {group.name}
                      </Link>
                      {/* Auto-expand the group that contains the active page */}
                      {isActiveGroup && (
                        <ul className="ml-3 mt-1.5 space-y-1.5 text-muted-foreground">
                          {group.subs.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/category/${s.slug}`}
                                aria-current={s.slug === slug ? "page" : undefined}
                                className={
                                  s.slug === slug
                                    ? "font-semibold text-primary"
                                    : "hover:text-primary"
                                }
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </details>

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filters
            </h2>

            <FilterSection title={filterSet.range.title}>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={filterSet.range.min}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  aria-label={`Min ${filterSet.range.title.toLowerCase()}`}
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  defaultValue={filterSet.range.max}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  aria-label={`Max ${filterSet.range.title.toLowerCase()}`}
                />
              </div>
            </FilterSection>

            {filterSet.checks.map((facet) => (
              <FilterSection key={facet.title} title={facet.title}>
                {facet.options.map((o) => (
                  <label key={o.name} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-input text-primary" />
                    <span>{o.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">({o.count})</span>
                  </label>
                ))}
              </FilterSection>
            ))}

            {filterSet.swatches && (
              <FilterSection title={filterSet.swatches.title}>
                {filterSet.swatches.options.map((c) => (
                  <label key={c.name} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-input text-primary" />
                    <span
                      className="h-4 w-6 rounded-sm border border-border"
                      style={{ backgroundColor: c.swatch }}
                      aria-hidden
                    />
                    <span>{c.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">({c.count})</span>
                  </label>
                ))}
              </FilterSection>
            )}
            </div>
          </aside>

          {/* Product grid */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{sorted.length} products</span>
              <label className="flex items-center gap-2 text-sm">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {sorted.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Category;