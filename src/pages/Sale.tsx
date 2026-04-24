import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { brandLogos } from "@/components/home/BrandLogos";

import heroWinter from "@/assets/hero-winter-sale.jpg";
import heroIndoor from "@/assets/hero-indoor.jpg";
import heroOutdoor from "@/assets/hero-outdoor.jpg";
import heroInstall from "@/assets/hero-installation.jpg";
import heroDesigner from "@/assets/hero-designer.jpg";
import promoDesigner from "@/assets/promo-designer-sale.jpg";
import promoSummer from "@/assets/promo-summer-gift.jpg";

import productOrange from "@/assets/product-pendant-orange.jpg";
import productGreen from "@/assets/product-pendant-green.jpg";
import productWhite from "@/assets/product-pendant-white.jpg";
import productBlack from "@/assets/product-pendant-black.jpg";
import productDome from "@/assets/product-pendant-dome.jpg";
import productGlobe from "@/assets/product-pendant-globe.jpg";
import productBulb from "@/assets/product-bulb-edison.jpg";

/* ---------- Reusable tile (Amazon "card with image grid" feel) ---------- */
type GridTile = { label: string; image: string; to: string };

const TileCard = ({
  title,
  cta,
  to,
  tiles,
}: {
  title: string;
  cta: string;
  to: string;
  tiles: GridTile[];
}) => (
  <section className="rounded-lg bg-card p-4 shadow-sm md:p-5">
    <h2 className="mb-3 font-display text-xl font-bold leading-tight md:text-2xl">{title}</h2>
    <div className="grid grid-cols-2 gap-2.5">
      {tiles.slice(0, 4).map((t) => (
        <Link
          key={t.label}
          to={t.to}
          className="group flex flex-col gap-2 text-foreground"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-surface">
            <img
              src={t.image}
              alt={t.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="text-sm font-medium leading-tight group-hover:text-primary">
            {t.label}
          </span>
        </Link>
      ))}
    </div>
    <Link
      to={to}
      className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
    >
      {cta}
    </Link>
  </section>
);

/* ---------- Single big image card ---------- */
const BigCard = ({
  title,
  cta,
  to,
  image,
  ratio = "aspect-[4/5]",
}: {
  title: string;
  cta: string;
  to: string;
  image: string;
  ratio?: string;
}) => (
  <section className="rounded-lg bg-card p-4 shadow-sm md:p-5">
    <h2 className="mb-3 font-display text-xl font-bold leading-tight md:text-2xl">{title}</h2>
    <Link to={to} className="group block">
      <div className={`overflow-hidden rounded-md bg-surface ${ratio}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
    <Link
      to={to}
      className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover hover:underline"
    >
      {cta}
    </Link>
  </section>
);

/* ---------- Deals carousel (horizontal scroll with arrows) ---------- */
type Deal = {
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);

const DealsRow = ({ title, deals }: { title: string; deals: Deal[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <section className="rounded-lg bg-card p-4 shadow-sm md:p-5">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold leading-tight md:text-2xl">{title}</h2>
          <Link
            to="/sale"
            className="mt-1 inline-block text-sm font-semibold text-primary hover:underline"
          >
            See all deals
          </Link>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-surface"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-surface"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="-mx-2 flex gap-3 overflow-x-auto scroll-smooth px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {deals.map((d) => {
          const off = Math.round((1 - d.price / d.originalPrice) * 100);
          return (
            <Link
              key={d.slug}
              to={`/product/${d.slug}`}
              className="group flex w-[160px] flex-none flex-col gap-2 md:w-[180px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 rounded-sm bg-cta px-2 py-1 text-[11px] font-bold text-cta-foreground">
                  -{off}%
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline gap-2">
                  <span className="rounded-sm bg-sale/10 px-1.5 py-0.5 text-[11px] font-bold text-sale">
                    -{off}%
                  </span>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Limited
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-foreground">
                    {formatPrice(d.price)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(d.originalPrice)}
                  </span>
                </div>
                <span className="line-clamp-2 text-xs text-muted-foreground">{d.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

/* ---------- Sticky sub-hero banner (Amazon "Today's Deals" style) ---------- */
const SaleHero = () => (
  <section className="container-abitaz pt-4">
    <div className="relative overflow-hidden rounded-lg bg-primary text-primary-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <span className="inline-block w-fit rounded-sm bg-cta px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-cta-foreground">
            Winter Sale · Up to -45%
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Light up your home for less
          </h1>
          <p className="max-w-md text-sm text-primary-foreground/85 md:text-base">
            Hundreds of designer pendants, outdoor lights and bulbs at their lowest prices of the
            season. While stocks last.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/category/pendant-lamps"
              className="rounded-md bg-cta px-5 py-2.5 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
            >
              Shop pendants
            </Link>
            <Link
              to="/category/outdoor-lighting"
              className="rounded-md bg-background/10 px-5 py-2.5 text-sm font-semibold text-primary-foreground ring-1 ring-inset ring-primary-foreground/30 transition hover:bg-background/20"
            >
              Shop outdoor
            </Link>
          </div>
        </div>
        <div className="relative h-48 md:h-auto">
          <img
            src={heroWinter}
            alt="Winter Sale"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/0 to-transparent md:from-primary/80" />
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Brand strip ---------- */
const SaleBrands = () => {
  const items = ["louis-poulsen", "tradition", "nordlux", "flos", "philips", "normann-copenhagen"];
  return (
    <section className="container-abitaz mt-6">
      <div className="rounded-lg bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-xl font-bold md:text-2xl">Top brands on sale</h2>
          <Link to="/sale" className="text-sm font-semibold text-primary hover:underline">
            See all brands
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {items.map((slug) => {
            const Logo = brandLogos[slug];
            return (
              <Link
                key={slug}
                to={`/category/pendant-lamps`}
                className="group grid h-20 place-items-center rounded-md border border-border bg-background px-3 transition hover:border-primary hover:shadow-sm"
              >
                <Logo className="h-6 w-full text-foreground/70 transition group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Sale = () => {
  useEffect(() => {
    document.title = "Winter Sale — Up to -45% off lighting | Abitaz";
    const desc =
      "Abitaz Winter Sale: save up to 45% on designer pendants, outdoor lighting, smart bulbs and installation materials. Limited time deals.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  /* Build deal data from products with a generated "was" price */
  const deals: Deal[] = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice ?? Math.round(p.price * 1.35 * 100) / 100,
  }));

  /* ---- Tile content ---- */
  const indoorTiles: GridTile[] = [
    { label: "Pendant lamps", image: productOrange, to: "/category/pendant-lamps" },
    { label: "Ceiling lamps", image: productDome, to: "/category/ceiling-lamps" },
    { label: "Wall lamps", image: productBlack, to: "/category/wall-lamps" },
    { label: "Table lamps", image: productGlobe, to: "/category/table-lamps" },
  ];

  const outdoorTiles: GridTile[] = [
    { label: "Garden lighting", image: heroOutdoor, to: "/category/outdoor-lighting" },
    { label: "Wall outdoor", image: heroIndoor, to: "/category/outdoor-lighting" },
    { label: "Path lighting", image: heroDesigner, to: "/category/outdoor-lighting" },
    { label: "Spots & floods", image: heroInstall, to: "/category/outdoor-lighting" },
  ];

  const installTiles: GridTile[] = [
    { label: "Switches", image: heroInstall, to: "/category/installation" },
    { label: "Cables", image: heroInstall, to: "/category/installation" },
    { label: "Sockets", image: heroInstall, to: "/category/installation" },
    { label: "Tools", image: heroInstall, to: "/category/installation" },
  ];

  const bulbsTiles: GridTile[] = [
    { label: "E27 bulbs", image: productBulb, to: "/category/bulbs" },
    { label: "E14 bulbs", image: productBulb, to: "/category/bulbs" },
    { label: "GU10 spots", image: productBulb, to: "/category/bulbs" },
    { label: "Smart bulbs", image: productBulb, to: "/category/bulbs" },
  ];

  const designerTiles: GridTile[] = [
    { label: "Louis Poulsen", image: productOrange, to: "/category/pendant-lamps" },
    { label: "&tradition", image: productGreen, to: "/category/pendant-lamps" },
    { label: "Flos", image: heroDesigner, to: "/category/pendant-lamps" },
    { label: "Nordlux", image: productWhite, to: "/category/pendant-lamps" },
  ];

  return (
    <SiteLayout>
      <SaleHero />

      {/* Row 1: 4 tile cards (Amazon's classic 4-col category grid) */}
      <div className="container-abitaz mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TileCard
          title="Indoor lighting deals"
          cta="See more indoor"
          to="/category/pendant-lamps"
          tiles={indoorTiles}
        />
        <TileCard
          title="Outdoor lighting deals"
          cta="See more outdoor"
          to="/category/outdoor-lighting"
          tiles={outdoorTiles}
        />
        <BigCard
          title="Designer brands -30%"
          cta="Shop designers"
          to="/category/pendant-lamps"
          image={promoDesigner}
        />
        <TileCard
          title="Bulbs & smart"
          cta="Shop bulbs"
          to="/category/bulbs"
          tiles={bulbsTiles}
        />
      </div>

      {/* Today's deals carousel */}
      <div className="container-abitaz mt-4">
        <DealsRow title="Today's deals" deals={deals} />
      </div>

      {/* Row 2: dual promo + 2 tile cards */}
      <div className="container-abitaz mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BigCard
          title="Free gift over €150"
          cta="Discover offer"
          to="/sale"
          image={promoSummer}
        />
        <TileCard
          title="Designer favourites"
          cta="See all designers"
          to="/category/pendant-lamps"
          tiles={designerTiles}
        />
        <TileCard
          title="Installation materials"
          cta="Shop installation"
          to="/category/installation"
          tiles={installTiles}
        />
        <BigCard
          title="Outdoor season -25%"
          cta="Shop outdoor"
          to="/category/outdoor-lighting"
          image={heroOutdoor}
        />
      </div>

      {/* Brands strip */}
      <SaleBrands />

      {/* Best of sale grid (full product cards) */}
      <section className="container-abitaz mt-6">
        <div className="rounded-lg bg-card p-4 shadow-sm md:p-5">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-xl font-bold md:text-2xl">Best of the sale</h2>
            <Link to="/sale" className="text-sm font-semibold text-primary hover:underline">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard
                key={p.slug}
                product={{
                  ...p,
                  originalPrice:
                    p.originalPrice ?? Math.round(p.price * 1.35 * 100) / 100,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Second deals row */}
      <div className="container-abitaz mt-4 mb-12">
        <DealsRow title="More limited time deals" deals={[...deals].reverse()} />
      </div>
    </SiteLayout>
  );
};

export default Sale;
