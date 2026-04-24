import { Link } from "react-router-dom";
import { categories } from "@/data/products";

export const CategoryStrip = () => {
  return (
    <section aria-label="Shop by category" className="container-abitaz mt-12">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by category</h2>
        <Link to="/categories" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="flex flex-col items-center justify-center rounded-lg bg-surface p-4 text-center transition hover:bg-secondary hover:text-secondary-foreground"
          >
            <span className="text-sm font-medium">{cat.name}</span>
            <span className="mt-1 text-xs text-muted-foreground">{cat.count} products</span>
          </Link>
        ))}
      </div>
    </section>
  );
};