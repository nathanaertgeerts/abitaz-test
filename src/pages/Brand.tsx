import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { brandLogos } from "@/components/home/BrandLogos";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { brands, products } from "@/data/products";

/* ---------- Short editorial blurbs per brand (used in the hero) ---------- */
const BRAND_BLURBS: Record<string, string> = {
  "louis-poulsen":
    "Danish lighting house since 1874. Home to Poul Henningsen's iconic PH series — sculpted shades engineered for glare-free, layered light.",
  tradition:
    "Copenhagen-based design house re-issuing 20th-century classics alongside new work from contemporary designers. Best known for the FlowerPot and Bellevue series.",
  nordlux:
    "Scandinavia's largest decorative-lighting maker. Honest materials, considered detailing and a price tag that fits everyday rooms.",
  flos:
    "Italian design icon since 1962. Home to Castiglioni, Starck and Grcic — sculptural pieces that defined modern lighting.",
  artemide:
    "Milanese manufacturer of architectural and decorative lighting. The Tolomeo, Nesso and Tizio are global design references.",
  "martinelli-luce":
    "Tuscan family workshop since 1950. Sculptural, often playful pieces — the Pipistrello and Cobra are post-war classics.",
  philips:
    "Reliable, energy-efficient bulbs and consumer lighting from one of the original electrical manufacturers. The default for everyday sockets.",
  "normann-copenhagen":
    "Danish design label combining playful Scandinavian shapes with contemporary materials. Lighting, furniture and accessories under one roof.",
  absinthe:
    "Belgian architectural lighting brand. Recessed spots, surface cylinders and track systems engineered for a clean, professional finish.",
  vysn:
    "German specification-grade lighting. Modular GU10 and integrated-LED systems for retail, hospitality and demanding residential projects.",
  slv:
    "German manufacturer of architectural luminaires. A deep catalogue of recessed, surface, track and outdoor fixtures for every project.",
};

const Brand = () => {
  const { slug = "" } = useParams();
  const brand = useMemo(() => brands.find((b) => b.slug === slug), [slug]);
  const Logo = brandLogos[slug];

  const brandProducts = useMemo(
    () => products.filter((p) => p.brandSlug === slug),
    [slug],
  );

  useEffect(() => {
    const name = brand?.name ?? "Brand";
    document.title = `${name} — Abitaz`;
    const desc =
      BRAND_BLURBS[slug] ??
      `Shop the full ${name} collection at Abitaz — designer lighting with real stock and fast delivery.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc.slice(0, 160));
  }, [brand, slug]);

  /* Unknown slug — friendly empty state, never the global 404 */
  if (!brand) {
    return (
      <SiteLayout>
        <div className="container-abitaz py-16 text-center">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Brand not found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We couldn't find that brand. Browse the full directory below.
          </p>
          <Link
            to="/brands"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
          >
            View all brands
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const blurb = BRAND_BLURBS[slug];

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="container-abitaz mt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/brands" className="hover:text-primary">
                Brands
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{brand.name}</li>
          </ol>
        </nav>
      </div>

      {/* Brand hero */}
      <section
        aria-label={`${brand.name} brand hero`}
        className="container-abitaz mt-4"
      >
        <div className="overflow-hidden rounded-lg bg-cta">
          <div className="grid items-center gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:gap-10 md:px-12 md:py-14">
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold uppercase tracking-wider text-cta-foreground/80">
                Shop by brand
              </p>
              <h1 className="mt-2 font-display text-4xl font-extrabold leading-[0.95] text-cta-foreground md:text-5xl lg:text-6xl">
                {brand.name}
              </h1>
              {blurb && (
                <p className="mt-4 max-w-2xl text-cta-foreground/90 md:text-lg">
                  {blurb}
                </p>
              )}
            </div>
            {Logo && (
              <div className="hidden rounded-md bg-background/90 px-6 py-5 text-foreground md:block">
                <Logo className="h-12 w-auto max-w-[260px]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section
        aria-labelledby="brand-products"
        className="container-abitaz mt-10 mb-16"
      >
        <div className="mb-5 flex items-baseline justify-between">
          <h2
            id="brand-products"
            className="font-display text-xl font-bold md:text-2xl"
          >
            All {brand.name} products
          </h2>
          <p className="text-sm text-muted-foreground">
            {brandProducts.length}{" "}
            {brandProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {brandProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-surface px-6 py-12 text-center">
            <p className="font-display text-lg font-semibold">
              {brand.name} is coming soon to Abitaz.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              We're finalising stock for this brand. In the meantime, browse our
              wider catalogue or get in touch for project quotes.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/category/pendant-lamps"
                className="inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
              >
                Browse the catalogue
              </Link>
              <Link
                to="/brands"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
              >
                See all brands
              </Link>
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
};

export default Brand;