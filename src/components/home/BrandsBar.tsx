import { Link } from "react-router-dom";
import { brands } from "@/data/products";

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {brands.map((b) => (
            <Link
              key={b.slug}
              to={`/brand/${b.slug}`}
              className="flex h-20 items-center justify-center rounded-md bg-card font-display text-base font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};