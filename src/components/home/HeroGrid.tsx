import { Link } from "react-router-dom";
import heroWinter from "@/assets/hero-winter-sale.jpg";
import heroIndoor from "@/assets/hero-indoor.jpg";
import heroOutdoor from "@/assets/hero-outdoor.jpg";
import heroInstall from "@/assets/hero-installation.jpg";
import heroDesigner from "@/assets/hero-designer.jpg";

type Tile = {
  to: string;
  image: string;
  eyebrow?: string;
  title: string;
  className: string;
  priority?: boolean;
  /** Tailwind classes for rounding the outer corner this tile sits in (md+) */
  roundClass?: string;
};

const tiles: Tile[] = [
  {
    to: "/sale",
    image: heroWinter,
    eyebrow: "Up to -45%",
    title: "Winter Sale",
    className: "md:col-span-4 md:row-span-2",
    priority: true,
    // Spans both rows on the left → rounds top-left + bottom-left
    roundClass: "md:rounded-l-lg",
  },
  {
    to: "/category/pendant-lamps",
    image: heroIndoor,
    eyebrow: "All your lights for",
    title: "Indoor",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    to: "/category/outdoor-lighting",
    image: heroOutdoor,
    eyebrow: "All your lights for",
    title: "Outdoor",
    className: "md:col-span-2 md:row-span-1",
    // Top-right corner
    roundClass: "md:rounded-tr-lg",
  },
  {
    to: "/category/installation",
    image: heroInstall,
    eyebrow: "Everything for your project",
    title: "Installation materials",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    to: "/brands/flos",
    image: heroDesigner,
    eyebrow: "New collection",
    title: "Flos",
    className: "md:col-span-2 md:row-span-1",
    // Bottom-right corner
    roundClass: "md:rounded-br-lg",
  },
];

export const HeroGrid = () => {
  return (
    <section aria-label="Featured collections" className="pt-4">
      <div className="grid grid-cols-2 gap-2 px-4 md:grid-cols-8 md:auto-rows-[220px] md:gap-0 md:overflow-hidden md:rounded-lg md:px-0">
        {tiles.map((tile, i) => (
          <Link
            key={tile.to + i}
            to={tile.to}
            className={`group relative overflow-hidden rounded-lg bg-surface md:rounded-none ${tile.roundClass ?? ""} ${tile.className}`}
          >
            <img
              src={tile.image}
              alt={tile.title}
              loading={tile.priority ? "eager" : "lazy"}
              fetchPriority={tile.priority ? "high" : "auto"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-5">
              {tile.eyebrow && (
                <span className="block text-xs font-medium opacity-90">
                  {tile.eyebrow}
                </span>
              )}
              <span className="font-display text-xl font-bold leading-tight md:text-3xl">
                {tile.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};