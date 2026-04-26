import { Link } from "react-router-dom";
import {
  Armchair,
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
    <section aria-label="Shop by category" className="container-abitaz mt-12">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Shop by category</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat.slug] ?? Lamp;
          return (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-transparent bg-surface p-4 text-center transition hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-sm"
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
    </section>
  );
};