import { Link } from "react-router-dom";
import {
  Armchair,
  ArrowRight,
  Lamp,
  LampCeiling,
  LampDesk,
  LampFloor,
  LampWallUp,
  Lightbulb,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/data/products";

/** Map each category slug to a Lucide icon that visually communicates the type. */
const categoryIcons: Record<string, LucideIcon> = {
  "indoor-lighting": Lamp,
  "pendant-lamps": LampCeiling,
  "ceiling-lamps": LampCeiling,
  "wall-lamps": LampWallUp,
  "floor-lamps": LampFloor,
  "table-lamps": LampDesk,
  "outdoor-lighting": TreePine,
  bulbs: Lightbulb,
  accessories: Armchair,
  furniture: Armchair,
};

export const CategoryStrip = () => {
  return (
    <section aria-label="Shop by category" className="container-abitaz mt-8">
      <div className="rounded-lg bg-surface p-4 md:p-5">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by category</h2>
          <Link
            to="/categories"
            className="group inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] ?? Lamp;
            return (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="group flex flex-col items-center justify-center gap-2 rounded-md bg-card p-4 text-center transition hover:-translate-y-0.5 hover:text-primary hover:shadow-md"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-background text-primary transition-colors group-hover:bg-cta/10 group-hover:text-cta">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-sm font-medium leading-tight">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} products</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};