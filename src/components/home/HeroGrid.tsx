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
  const dragState = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
  });
  const momentumRaf = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const children = Array.from(el.children) as HTMLElement[];
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      setActiveIndex(bestIdx);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  const cancelMomentum = () => {
    if (momentumRaf.current !== null) {
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = null;
    }
  };

  const snapToNearest = (velocity: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const current = el.scrollLeft / w;
    // Use velocity to bias towards next/prev slide for a snappier feel
    const bias = Math.max(-1, Math.min(1, velocity * 0.004));
    const target = Math.round(current + bias);
    const max = tiles.length - 1;
    const clamped = Math.max(0, Math.min(max, target));
    el.scrollTo({ left: clamped * w, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle mouse drag; touch uses native momentum + scroll-snap
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    cancelMomentum();
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    if (!s.isDown) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;
    el.scrollLeft = s.startScroll - dx;
    const now = performance.now();
    const dt = Math.max(1, now - s.lastT);
    // px/ms; positive when moving finger left (scrolling right)
    s.velocity = (s.lastX - e.clientX) / dt;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    if (!s.isDown) return;
    s.isDown = false;
    const el = scrollerRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    snapToNearest(s.velocity * 1000); // convert to px/s-ish for the bias calc
  };

  return (
    <section aria-label="Featured collections" className="container-abitaz pt-4">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-1 touch-pan-y select-none [scroll-behavior:smooth] [scroll-snap-stop:always] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tiles.map((tile, i) => (
            <Link
              key={tile.to + i}
              to={tile.to}
              draggable={false}
              onClick={(e) => {
                if (dragState.current.moved) {
                  e.preventDefault();
                  dragState.current.moved = false;
                }
              }}
              className="group relative h-56 w-[88%] flex-none snap-center overflow-hidden rounded-lg bg-surface"
            >
              <img
                src={tile.image}
                alt={tile.title}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                draggable={false}
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