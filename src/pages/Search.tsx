import { ChevronDown, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

/* ---------- Filter facets (cross-category set tailored for search) ---------- */
const PRICE_MIN = 1;
const PRICE_MAX = 4500;

const checkFacets: { title: string; options: { name: string; count: number }[] }[] = [
  {
    title: "Category",
    options: [
      { name: "Pendant lamps", count: 0 },
      { name: "Ceiling lamps", count: 0 },
      { name: "Wall lamps", count: 0 },
      { name: "Floor lamps", count: 0 },
      { name: "Table lamps", count: 0 },
      { name: "Outdoor lighting", count: 0 },
      { name: "Bulbs", count: 0 },
      { name: "Furniture", count: 0 },
      { name: "Accessories", count: 0 },
    ],
  },
  {
    title: "Material",
    options: [
      { name: "Aluminium", count: 0 },
      { name: "Glass", count: 0 },
      { name: "Metal", count: 0 },
      { name: "Wood", count: 0 },
      { name: "Plastic", count: 0 },
    ],
  },
];

const swatchOptions: { name: string; swatch: string }[] = [
  { name: "White", swatch: "#ffffff" },
  { name: "Black", swatch: "#1f1f1f" },
  { name: "Gold", swatch: "#d4af37" },
  { name: "Grey", swatch: "#9ca3af" },
  { name: "Silver", swatch: "#c0c0c0" },
];

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details open className="border-b border-border py-4 [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
      {title}
      <ChevronDown className="transition group-open:rotate-180" />
    </summary>
    <div className="mt-3 space-y-2 text-sm">{children}</div>
  </details>
);

const Search = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [draft, setDraft] = useState(initial);

  useEffect(() => {
    setDraft(params.get("q") ?? "");
  }, [params]);

  const q = (params.get("q") ?? "").trim().toLowerCase();

  /* ----- Filter state ----- */
  const [sort, setSort] = useState("popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);
  const [checkedFacets, setCheckedFacets] = useState<Record<string, Set<string>>>({});
  const [checkedSwatches, setCheckedSwatches] = useState<Set<string>>(new Set());

  // Reset filters whenever the query changes
  useEffect(() => {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setCheckedFacets({});
    setCheckedSwatches(new Set());
  }, [q]);

  const toggleFacet = (facetTitle: string, optionName: string) => {
    setCheckedFacets((prev) => {
      const next = { ...prev };
      const set = new Set(next[facetTitle] ?? []);
      if (set.has(optionName)) set.delete(optionName);
      else set.add(optionName);
      next[facetTitle] = set;
      return next;
    });
  };

  const toggleSwatch = (name: string) => {
    setCheckedSwatches((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const activeFilterCount =
    Object.values(checkedFacets).reduce((n, s) => n + s.size, 0) +
    checkedSwatches.size +
    (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX ? 1 : 0);

  const clearFilters = () => {
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setCheckedFacets({});
    setCheckedSwatches(new Set());
  };

  /* ----- Search + filter pipeline ----- */
  const baseResults = useMemo(() => {
    if (!q) return [];
    return products.filter((p) => {
      const haystack = [p.name, p.brand, p.sku, p.category, p.description]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [q]);

  const filtered = useMemo(() => {
    return baseResults.filter((p) => {
      if (p.price < minPrice || p.price > maxPrice) return false;

      for (const [, options] of Object.entries(checkedFacets)) {
        if (options.size === 0) continue;
        const haystack = [
          p.name,
          p.description,
          p.category,
          ...p.specs.map((s) => `${s.label} ${s.value}`),
        ]
          .join(" ")
          .toLowerCase();
        const anyMatch = Array.from(options).some((opt) => {
          const token = opt.split(/[—–-]/)[0].trim().toLowerCase();
          return haystack.includes(token);
        });
        if (!anyMatch) return false;
      }

      if (checkedSwatches.size > 0) {
        const selectedHexes = new Set(
          swatchOptions
            .filter((o) => checkedSwatches.has(o.name))
            .map((o) => o.swatch.toLowerCase()),
        );
        const productColors = (p.colors ?? []).map((c) => c.toLowerCase());
        const nameMatch = Array.from(checkedSwatches).some((n) =>
          p.name.toLowerCase().includes(n.toLowerCase()),
        );
        const hexMatch = productColors.some((c) => selectedHexes.has(c));
        if (!nameMatch && !hexMatch) return false;
      }

      return true;
    });
  }, [baseResults, minPrice, maxPrice, checkedFacets, checkedSwatches]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [filtered, sort]);

  useEffect(() => {
    document.title = q ? `Search: ${q} — Abitaz` : "Search — Abitaz";
  }, [q]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = draft.trim();
    if (next) setParams({ q: next });
    else setParams({});
  };

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        {/* Header row mirrors the Category page: breadcrumb + compact heading on
            the left (260px), and the search form occupies the banner slot on
            the right (flex-1, desktop only spans full row). */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <div className="lg:w-[260px] lg:flex-none">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <ol className="flex items-center gap-2">
                <li><Link to="/" className="hover:text-primary">Home</Link></li>
                <li aria-hidden>/</li>
                <li className="text-foreground">Search</li>
              </ol>
            </nav>
            <h1 className="font-display text-xl font-bold md:text-2xl">
              {q ? (
                <>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Search results
                  </span>
                  <span className="line-clamp-2">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                "Search"
              )}
            </h1>
          </div>

          <form
            role="search"
            onSubmit={onSubmit}
            className="flex h-11 w-full flex-1 items-center overflow-hidden rounded-md border border-border bg-card shadow-sm"
          >
            <label htmlFor="search-page-input" className="sr-only">
              Search products, brands or SKUs
            </label>
            <SearchIcon className="ml-4 h-5 w-5 flex-none text-muted-foreground" aria-hidden />
            <input
              id="search-page-input"
              type="search"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search products, brands or SKUs…"
              className="h-full w-full min-w-0 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="h-full flex-none bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:opacity-90"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="search-filters"
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

            <div id="search-filters" className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
              <h2 className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:mt-0">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {activeFilterCount} active
                  </span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-semibold text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <FilterSection title="Price">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    min={PRICE_MIN}
                    max={maxPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || PRICE_MIN)}
                    className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                    aria-label="Min price"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="number"
                    value={maxPrice}
                    min={minPrice}
                    max={PRICE_MAX}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || PRICE_MAX)}
                    className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                    aria-label="Max price"
                  />
                </div>
              </FilterSection>

              {checkFacets.map((facet) => (
                <FilterSection key={facet.title} title={facet.title}>
                  {facet.options.map((o) => (
                    <label key={o.name} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checkedFacets[facet.title]?.has(o.name) ?? false}
                        onChange={() => toggleFacet(facet.title, o.name)}
                        className="h-4 w-4 rounded border-input text-primary"
                      />
                      <span>{o.name}</span>
                    </label>
                  ))}
                </FilterSection>
              ))}

              <FilterSection title="Color">
                {swatchOptions.map((c) => (
                  <label key={c.name} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checkedSwatches.has(c.name)}
                      onChange={() => toggleSwatch(c.name)}
                      className="h-4 w-4 rounded border-input text-primary"
                    />
                    <span
                      className="h-4 w-6 rounded-sm border border-border"
                      style={{ backgroundColor: c.swatch }}
                      aria-hidden
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </FilterSection>
            </div>
          </aside>

          {/* Results */}
          <section>
            {!q && (
              <div className="rounded-lg border border-border bg-card p-8 text-center">
                <p className="font-display text-lg font-semibold">
                  Search the Abitaz catalogue
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Type a product name, brand or SKU above to get started.
                </p>
              </div>
            )}

            {q && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {sorted.length} {sorted.length === 1 ? "product" : "products"} found
                    {baseResults.length !== sorted.length && (
                      <> (of {baseResults.length})</>
                    )}
                  </span>
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

                {sorted.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {sorted.map((p) => (
                      <ProductCard key={p.slug} product={p} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-card p-8 text-center">
                    <p className="font-display text-lg font-semibold">
                      No products match your search.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try a different keyword, clear filters, or{" "}
                      <Link to="/category/pendant-lamps" className="text-primary hover:underline">
                        browse the catalogue
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Search;