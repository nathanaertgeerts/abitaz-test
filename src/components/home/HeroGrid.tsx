import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// Static fallback (full-size original)
import heroWinter from "@/assets/hero-spring-sale.jpg";
import heroIndoor from "@/assets/hero-indoor.jpg";
import heroOutdoor from "@/assets/hero-outdoor.jpg";
import heroInstall from "@/assets/hero-installation.jpg";
import heroDesigner from "@/assets/hero-designer.jpg";
// Responsive WebP srcsets generated at build time by vite-imagetools
import heroWinterSet from "@/assets/hero-spring-sale.jpg?w=480;768;1200;1600&format=webp&as=srcset";
import heroIndoorSet from "@/assets/hero-indoor.jpg?w=480;768;1200;1600&format=webp&as=srcset";
import heroOutdoorSet from "@/assets/hero-outdoor.jpg?w=480;768;1200;1600&format=webp&as=srcset";
import heroInstallSet from "@/assets/hero-installation.jpg?w=480;768;1200;1600&format=webp&as=srcset";
import heroDesignerSet from "@/assets/hero-designer.jpg?w=480;768;1200;1600&format=webp&as=srcset";

type Tile = {
  to: string;
  image: string;
  srcSet: string;
  eyebrow?: string;
  title: string;
  className: string;
  priority?: boolean;
  /** Tailwind classes for rounding the outer corner this tile sits in (md+) */
  roundClass?: string;
  /** Sizes attribute hinting layout width per breakpoint */
  sizes: string;
};

const tiles: Tile[] = [
  {
    to: "/sale",
    image: heroWinter,
    srcSet: heroWinterSet,
    eyebrow: "Up to -45%",
    title: "Spring Sale",
    className: "md:col-span-4 md:row-span-2",
    priority: true,
    // Spans both rows on the left → rounds top-left + bottom-left
    roundClass: "md:rounded-l-lg",
    // Mobile: ~88vw. Desktop ≥768px: half the container (~50vw, capped by container)
    sizes: "(min-width: 1280px) 640px, (min-width: 768px) 50vw, 88vw",
  },
  {
    to: "/category/pendant-lamps",
    image: heroIndoor,
    srcSet: heroIndoorSet,
    eyebrow: "All your lights for",
    title: "Indoor",
    className: "md:col-span-2 md:row-span-1",
    sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 88vw",
  },
  {
    to: "/category/outdoor-lighting",
    image: heroOutdoor,
    srcSet: heroOutdoorSet,
    eyebrow: "All your lights for",
    title: "Outdoor",
    className: "md:col-span-2 md:row-span-1",
    // Top-right corner
    roundClass: "md:rounded-tr-lg",
    sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 88vw",
  },
  {
    to: "/category/installation",
    image: heroInstall,
    srcSet: heroInstallSet,
    eyebrow: "Everything for your project",
    title: "Installation materials",
    className: "md:col-span-2 md:row-span-1",
    sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 88vw",
  },
  {
    to: "/brands/flos",
    image: heroDesigner,
    srcSet: heroDesignerSet,
    eyebrow: "Flos",
    title: "Absinthe",
    className: "md:col-span-2 md:row-span-1",
    // Bottom-right corner
    roundClass: "md:rounded-br-lg",
    sizes: "(min-width: 1280px) 320px, (min-width: 768px) 25vw, 88vw",
  },
];

export const HeroGrid = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
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
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
    el.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
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
    el.scrollTo({ left: clamped * w, behavior: reduceMotion ? "auto" : "smooth" });
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Home" && e.key !== "End") {
      return;
    }
    e.preventDefault();
    const max = tiles.length - 1;
    let next = activeIndex;
    if (e.key === "ArrowLeft") next = Math.max(0, activeIndex - 1);
    else if (e.key === "ArrowRight") next = Math.min(max, activeIndex + 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = max;
    scrollToIndex(next);
  };

  return (
    <section aria-label="Featured collections" className="container-abitaz pt-4">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured collections carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain rounded-lg px-4 pb-1 [touch-action:pan-x_pan-y] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [scroll-snap-stop:always] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
            reduceMotion ? "[scroll-behavior:auto]" : "scroll-smooth [scroll-behavior:smooth]"
          }`}
        >
          {tiles.map((tile, i) => (
            <Link
              key={tile.to + i}
              to={tile.to}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${tiles.length}: ${tile.title}`}
              aria-current={activeIndex === i ? "true" : undefined}
              draggable={false}
              onClick={(e) => {
                if (dragState.current.moved) {
                  e.preventDefault();
                  dragState.current.moved = false;
                }
              }}
              className="group relative h-56 w-[88%] flex-none snap-center overflow-hidden rounded-lg bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <img
                src={tile.image}
                srcSet={tile.srcSet}
                sizes={tile.sizes}
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
              aria-current={activeIndex === i ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                reduceMotion ? "" : "transition-all"
              } ${
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
              srcSet={tile.srcSet}
              sizes={tile.sizes}
              alt={tile.title}
              loading={tile.priority ? "eager" : "lazy"}
              fetchPriority={tile.priority ? "high" : "auto"}
              className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
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