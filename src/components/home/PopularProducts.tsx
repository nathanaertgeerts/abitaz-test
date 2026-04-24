import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const PopularProducts = () => {
  return (
    <section aria-label="Popular products" className="container-abitaz mt-14">
      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Highlights
        </span>
        <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">Popular products</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
};