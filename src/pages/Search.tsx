import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [draft, setDraft] = useState(initial);

  // Keep input in sync if URL changes (e.g. user navigates back/forward)
  useEffect(() => {
    setDraft(params.get("q") ?? "");
  }, [params]);

  const q = (params.get("q") ?? "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return products.filter((p) => {
      const haystack = [p.name, p.brand, p.sku, p.category, p.description]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [q]);

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
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden>/</li>
            <li className="text-foreground">Search</li>
          </ol>
        </nav>

        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search"}
        </h1>

        <form role="search" onSubmit={onSubmit} className="mt-5 max-w-2xl">
          <label htmlFor="search-page-input" className="sr-only">
            Search products, brands or SKUs
          </label>
          <div className="flex gap-2">
            <input
              id="search-page-input"
              type="search"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search products, brands or SKUs…"
              className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
            />
            <button
              type="submit"
              className="h-11 rounded-md bg-cta px-5 text-sm font-semibold text-cta-foreground transition hover:opacity-90"
            >
              Search
            </button>
          </div>
        </form>

        {q && (
          <p className="mt-4 text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
        )}

        {q && results.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {q && results.length === 0 && (
          <div className="mt-10 rounded-lg border border-border bg-card p-8 text-center">
            <p className="font-display text-lg font-semibold">No products match your search.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword, brand, or SKU. You can also{" "}
              <Link to="/category/pendant-lamps" className="text-primary hover:underline">
                browse the catalogue
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default Search;