import { useEffect, useRef, useState } from "react";
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section aria-label="Featured collections" className="container-abitaz pt-4">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tiles.map((tile, i) => (
            <Link
              key={tile.to + i}
              to={tile.to}
              className="group relative h-56 w-[88%] flex-none snap-center overflow-hidden rounded-lg bg-surface"
            >
              <img
                src={tile.image}
                alt={tile.title}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {tile.eyebrow && (
                  <span className="block text-xs font-medium opacity-90">{tile.eyebrow}</span>
                )}
                <span className="font-display text-2xl font-bold leading-tight">{tile.title}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Dots */}
        <div className="mt-3 flex justify-center gap-1.5">
          {tiles.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === i ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 8-col grid */}
      <div className="hidden md:grid md:grid-cols-8 md:auto-rows-[220px] md:gap-px md:overflow-hidden md:rounded-lg md:bg-border">
        {tiles.map((tile, i) => (
          <Link
            key={tile.to + i}
            to={tile.to}
            className={`group relative overflow-hidden bg-surface ${tile.roundClass ?? ""} ${tile.className}`}
          >
            <img
              src={tile.image}
              alt={tile.title}
              loading={tile.priority ? "eager" : "lazy"}
              fetchPriority={tile.priority ? "high" : "auto"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              {tile.eyebrow && (
                <span className="block text-sm font-medium opacity-90">{tile.eyebrow}</span>
              )}
              <span className="font-display text-3xl font-bold leading-tight">{tile.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};