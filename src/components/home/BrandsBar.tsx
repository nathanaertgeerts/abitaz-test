import { Link } from "react-router-dom";
import { brands } from "@/data/products";
import { brandLogos } from "./BrandLogos";

export const BrandsBar = () => {
  const loop = [...brands, ...brands];
  return (
    <section aria-label="Top brands" className="container-abitaz mt-8">
      <div className="rounded-lg bg-surface p-4 md:p-5">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by brand</h2>
          <Link to="/brands" className="whitespace-nowrap text-sm font-medium text-primary hover:underline">
            All brands →
          </Link>
        </div>
        {/* Auto-scrolling marquee — pauses on hover, respects prefers-reduced-motion */}
        <div
          className="group relative -mx-2 overflow-hidden px-2"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
          }}
        >
          <div
            className="flex w-max gap-3 motion-safe:animate-[brand-marquee_40s_linear_infinite] motion-safe:group-hover:[animation-play-state:paused]"
          >
            {loop.map((b, i) => {
              const Logo = brandLogos[b.slug];
              return (
                <Link
                  key={`${b.slug}-${i}`}
                  to={`/brand/${b.slug}`}
                  aria-label={b.name}
                  aria-hidden={i >= brands.length}
                  tabIndex={i >= brands.length ? -1 : 0}
                  className="group/card flex h-20 w-[160px] flex-none items-center justify-center rounded-md bg-card px-4 text-foreground/70 transition hover:text-primary hover:shadow-md sm:w-[180px] md:w-[200px]"
                >
                  {Logo ? (
                    <Logo className="h-8 w-auto max-w-full transition group-hover/card:scale-[1.03]" />
                  ) : (
                    <span className="font-display font-semibold">{b.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};