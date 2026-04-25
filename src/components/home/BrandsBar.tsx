import { Link } from "react-router-dom";
import { brands } from "@/data/products";
import { brandLogos } from "./BrandLogos";

export const BrandsBar = () => {
  return (
    <section aria-label="Top brands" className="container-abitaz mt-14">
      <div className="rounded-lg bg-surface p-6 md:p-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by brand</h2>
          <Link to="/brands" className="text-sm font-medium text-primary hover:underline">
            All brands
          </Link>
        </div>
        {/* Single-row horizontal scroller — never wraps to a second line.
            Snap + hidden scrollbar give a clean swipe / drag feel. */}
        <div
          className="-mx-2 flex snap-x snap-mandatory gap-3 overflow-x-auto px-2 pb-1
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {brands.map((b) => {
            const Logo = brandLogos[b.slug];
            return (
              <Link
                key={b.slug}
                to={`/brand/${b.slug}`}
                aria-label={b.name}
                className="group flex h-20 w-[160px] flex-none snap-start items-center justify-center rounded-md bg-card px-4 text-foreground/70 transition hover:text-primary hover:shadow-md sm:w-[180px] md:w-[200px]"
              >
                {Logo ? (
                  <Logo className="h-8 w-auto max-w-full transition group-hover:scale-[1.03]" />
                ) : (
                  <span className="font-display font-semibold">{b.name}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};