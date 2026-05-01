import { Headset, Heart, PackageCheck, RotateCcw, Search, ShoppingCart, Truck, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Logo } from "./Logo";
import { MegaMenu, type MegaMenuItem } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import heroIndoor from "@/assets/hero-indoor.jpg";
import heroOutdoor from "@/assets/hero-outdoor.jpg";
import heroDesigner from "@/assets/hero-designer.jpg";
import promoDesigner from "@/assets/promo-designer-sale.jpg";
import promoSummer from "@/assets/promo-summer-gift.jpg";
import productPendantOrange from "@/assets/product-pendant-orange.jpg";
import productPendantWhite from "@/assets/product-pendant-white.jpg";

const mainNav: MegaMenuItem[] = [
  {
    label: "Products",
    to: "/category/lighting",
    groups: [
      /* ---------- LIGHTING ---------- */
      {
        label: "Lighting",
        to: "/category/lighting",
        columns: [
          {
            title: "Indoor lighting",
            to: "/category/indoor-lighting",
            links: [
              { label: "Pendant lights", to: "/category/pendant-lights" },
              { label: "Ceiling lights", to: "/category/ceiling-lights" },
              { label: "Recessed lights", to: "/category/recessed-lights" },
              { label: "Spotlights", to: "/category/spotlights" },
              { label: "Wall lights", to: "/category/wall-lights" },
              { label: "Floor lamps", to: "/category/floor-lamps" },
              { label: "Table lamps", to: "/category/table-lamps" },
              { label: "Track lighting", to: "/category/track-lighting" },
            ],
            moreLink: { label: "+ 2 more", to: "/category/indoor-lighting" },
          },
          {
            title: "Outdoor lighting",
            to: "/category/outdoor-lighting",
            links: [
              { label: "Bollards", to: "/category/bollards" },
              { label: "Lamp posts", to: "/category/lamp-posts" },
              { label: "Spike lights", to: "/category/spike-lights" },
              { label: "Underwater lights", to: "/category/underwater-lights" },
              { label: "Pendant lights outdoor", to: "/category/pendant-lights-outdoor" },
              { label: "Ceiling lights outdoor", to: "/category/ceiling-lights-outdoor" },
              { label: "Recessed lights outdoor", to: "/category/recessed-lights-outdoor" },
              { label: "Spotlights outdoor", to: "/category/spotlights-outdoor" },
            ],
            moreLink: { label: "+ 4 more", to: "/category/outdoor-lighting" },
          },
          {
            title: "Light sources",
            to: "/category/light-sources",
            links: [
              { label: "LED bulbs", to: "/category/led-bulbs" },
              { label: "LED light strips", to: "/category/led-light-strips" },
              { label: "Smart bulbs", to: "/category/smart-bulbs" },
              { label: "Filament bulbs", to: "/category/filament-bulbs" },
              { label: "LED modules", to: "/category/led-modules" },
            ],
          },
          {
            title: "Lighting accessories",
            to: "/category/lighting-accessories",
            links: [
              { label: "Power supplies", to: "/category/power-supplies" },
              { label: "Canopies", to: "/category/canopies" },
              { label: "LED profiles and covers", to: "/category/led-profiles-and-covers" },
            ],
          },
        ],
        feature: {
          eyebrow: "New collection",
          title: "Architectural lighting, sourced.",
          description:
            "Over 4,800 fixtures from Artemide, Martinelli Luce, SLV and more — trusted by lighting designers across Europe.",
          cta: { label: "Explore Lighting", to: "/category/lighting" },
          image: heroIndoor,
        },
      },

      /* ---------- ACCESSORIES ---------- */
      {
        label: "Accessories",
        to: "/category/accessories",
        columns: [
          {
            title: "Decoration",
            to: "/category/decoration",
            links: [
              { label: "Vases", to: "/category/vases" },
              { label: "Mirrors", to: "/category/mirrors" },
              { label: "Candles", to: "/category/candles" },
              { label: "Candle holders", to: "/category/candle-holders" },
              { label: "Picture frames", to: "/category/picture-frames" },
              { label: "Clocks", to: "/category/clocks" },
              { label: "Home fragrances", to: "/category/home-fragrances" },
              { label: "Wall decorations", to: "/category/wall-decorations" },
            ],
            moreLink: { label: "+ 4 more", to: "/category/decoration" },
          },
          {
            title: "Kitchen & table",
            to: "/category/kitchen-accessories",
            links: [
              { label: "Knives", to: "/category/knives" },
              { label: "Cutting boards", to: "/category/cutting-boards" },
              { label: "Pots & Pans", to: "/category/pots-and-pans" },
              { label: "Glassware", to: "/category/glassware" },
              { label: "Cutlery", to: "/category/cutlery" },
              { label: "Mugs & Cups", to: "/category/mugs-and-cups" },
              { label: "Trays", to: "/category/trays" },
              { label: "Carafes", to: "/category/carafes" },
            ],
            moreLink: { label: "+ 6 more", to: "/category/table-accessories" },
          },
          {
            title: "Storage & racks",
            to: "/category/storage",
            links: [
              { label: "Baskets", to: "/category/baskets" },
              { label: "Shelves", to: "/category/shelves" },
              { label: "Coat stands & hooks", to: "/category/coat-stands-racks-and-hooks" },
              { label: "Organizers", to: "/category/organizers" },
              { label: "Magazine racks", to: "/category/magazine-racks" },
              { label: "Wine racks", to: "/category/wine-racks" },
              { label: "Umbrella stands", to: "/category/umbrella-stands" },
              { label: "Garbage bins", to: "/category/garbage-bins" },
            ],
            moreLink: { label: "+ 5 more", to: "/category/storage" },
          },
          {
            title: "Textiles & garden",
            to: "/category/home-textiles",
            links: [
              { label: "Cushions", to: "/category/cushions" },
              { label: "Rugs", to: "/category/rugs" },
              { label: "Plaids", to: "/category/plaids" },
              { label: "Bed linen", to: "/category/bed-linen" },
              { label: "Bath towels", to: "/category/bath-towels" },
              { label: "Doormats", to: "/category/doormats" },
              { label: "Planters", to: "/category/planters" },
              { label: "Artificial plants", to: "/category/artificial-plants" },
            ],
            moreLink: { label: "+ 8 more", to: "/category/home-textiles" },
          },
        ],
        feature: {
          eyebrow: "Finishing touches",
          title: "Style your space",
          description:
            "Vases, candles and decorative objects to complete every room — handpicked from European studios.",
          cta: { label: "Shop decoration", to: "/category/decoration" },
          image: promoSummer,
        },
      },

      /* ---------- FURNITURE ---------- */
      {
        label: "Furniture",
        to: "/category/furniture",
        columns: [
          {
            title: "Seating",
            to: "/category/seating",
            links: [
              { label: "Chairs", to: "/category/chairs" },
              { label: "Armchairs", to: "/category/armchairs" },
              { label: "Sofas", to: "/category/sofas" },
              { label: "Stools", to: "/category/stools" },
              { label: "Bar stools", to: "/category/bar-stools" },
              { label: "Office chairs", to: "/category/office-chairs" },
              { label: "Poufs & Hockers", to: "/category/poufs-and-hockers" },
              { label: "Sun loungers & Daybeds", to: "/category/sun-loungers-and-daybeds" },
            ],
            moreLink: { label: "+ 3 more", to: "/category/seating" },
          },
          {
            title: "Tables",
            to: "/category/tables",
            links: [
              { label: "Dining tables", to: "/category/dining-tables" },
              { label: "Coffee tables", to: "/category/coffee-tables" },
              { label: "Side tables", to: "/category/side-tables" },
              { label: "Bar tables", to: "/category/bar-tables" },
              { label: "Garden tables", to: "/category/garden-tables" },
              { label: "Trolleys", to: "/category/trolleys" },
            ],
          },
          {
            title: "Cabinets & storage",
            to: "/category/cabinets",
            links: [
              { label: "Display cabinets", to: "/category/display-cabinets" },
              { label: "Drawer cabinets", to: "/category/drawer-cabinets" },
              { label: "Dressers", to: "/category/dressers" },
              { label: "Hanging cabinets", to: "/category/hanging-cabinets" },
              { label: "Nightstands", to: "/category/nightstands" },
              { label: "Shelving cabinets", to: "/category/shelving-cabinets" },
              { label: "TV stands", to: "/category/tv-stands" },
            ],
          },
          {
            title: "Workspace & more",
            to: "/category/furniture",
            links: [
              { label: "Desks", to: "/category/desks" },
              { label: "Benches", to: "/category/benches" },
              { label: "Garden chairs", to: "/category/garden-chairs" },
              { label: "Hanging chairs", to: "/category/hanging-chairs" },
              { label: "Rocking chairs", to: "/category/rocking-chairs" },
            ],
          },
        ],
        feature: {
          eyebrow: "Designer picks",
          title: "Scandinavian classics",
          description:
            "Iconic chairs and tables that pair beautifully with our designer lighting.",
          cta: { label: "Shop furniture", to: "/category/furniture" },
          image: heroDesigner,
        },
      },
    ],
    viewAll: { label: "View all products", to: "/category/lighting" },
  },

  /* ---------- BRANDS ---------- */
  {
    label: "Brands",
    to: "/brands",
    groups: [
      {
        label: "Designer brands",
        to: "/brands?tier=premium",
        columns: [
          {
            title: "Top designers",
            to: "/brands?tier=premium",
            links: [
              { label: "Louis Poulsen", to: "/brands/louis-poulsen" },
              { label: "Flos", to: "/brands/flos" },
              { label: "Artemide", to: "/brands/artemide" },
              { label: "Martinelli Luce", to: "/brands/martinelli-luce" },
              { label: "&tradition", to: "/brands/tradition" },
              { label: "Normann Copenhagen", to: "/brands/normann-copenhagen" },
            ],
          },
        ],
        feature: {
          eyebrow: "Iconic",
          title: "Flos new collection",
          description:
            "Discover the latest Flos releases — sculptural, timeless designs.",
          cta: { label: "Shop Flos", to: "/brands/flos" },
          image: productPendantOrange,
        },
      },
      {
        label: "Everyday brands",
        to: "/brands?tier=everyday",
        columns: [
          {
            title: "Popular brands",
            to: "/brands?tier=everyday",
            links: [
              { label: "Nordlux", to: "/brands/nordlux" },
              { label: "Philips", to: "/brands/philips" },
            ],
          },
        ],
        feature: {
          eyebrow: "Best value",
          title: "Nordlux essentials",
          description:
            "Scandinavian design at honest prices — perfect for every room.",
          cta: { label: "Shop Nordlux", to: "/brands/nordlux" },
          image: productPendantWhite,
        },
      },
      {
        label: "Technical lighting",
        to: "/brands?tier=technical",
        columns: [
          {
            title: "Architectural & professional",
            to: "/brands?tier=technical",
            links: [
              { label: "Absinthe Lights", to: "/brands/absinthe" },
              { label: "VYSN", to: "/brands/vysn" },
              { label: "SLV", to: "/brands/slv" },
            ],
          },
        ],
        feature: {
          eyebrow: "Pro grade",
          title: "Spots, tracks & downlights",
          description:
            "Belgian and German technical brands for recessed spots, track systems and workspace lighting.",
          cta: { label: "Shop technical", to: "/brands?tier=technical" },
          image: productPendantWhite,
        },
      },
      {
        label: "On sale",
        to: "/sale",
        columns: [
          {
            title: "Sale by brand",
            to: "/sale",
            links: [
              { label: "Louis Poulsen sale", to: "/brands/louis-poulsen?sale=1" },
              { label: "Flos sale", to: "/brands/flos?sale=1" },
              { label: "Nordlux sale", to: "/brands/nordlux?sale=1" },
            ],
          },
        ],
        feature: {
          eyebrow: "Up to -45%",
          title: "Winter Sale",
          description:
            "The lowest prices of the season across designer and everyday brands.",
          cta: { label: "Shop the sale", to: "/sale" },
          image: promoDesigner,
        },
      },
    ],
    viewAll: { label: "All brands A–Z", to: "/brands" },
  },

  /* ---------- ROOMS ---------- */
  {
    label: "Rooms",
    to: "/rooms",
    columns: [
      {
        title: "Living spaces",
        to: "/rooms",
        links: [
          { label: "Living room", to: "/rooms/living-room" },
          { label: "Dining room", to: "/rooms/dining-room" },
          { label: "Hallway", to: "/rooms/hallway" },
          { label: "Home office", to: "/rooms/home-office" },
        ],
      },
      {
        title: "Private spaces",
        to: "/rooms",
        links: [
          { label: "Bedroom", to: "/rooms/bedroom" },
          { label: "Children's room", to: "/rooms/childrens-room" },
          { label: "Bathroom", to: "/rooms/bathroom" },
        ],
      },
      {
        title: "Cooking & utility",
        to: "/rooms",
        links: [
          { label: "Kitchen", to: "/rooms/kitchen" },
          { label: "Pantry", to: "/rooms/pantry" },
          { label: "Laundry room", to: "/rooms/laundry" },
        ],
      },
      {
        title: "Outside",
        to: "/rooms",
        links: [
          { label: "Garden", to: "/rooms/garden" },
          { label: "Terrace & balcony", to: "/rooms/terrace" },
          { label: "Entrance & façade", to: "/rooms/entrance" },
        ],
      },
    ],
    feature: {
      eyebrow: "Inspiration",
      title: "Shop by room",
      description:
        "Curated lighting, furniture and accessories for every space in your home.",
      cta: { label: "Browse all rooms", to: "/rooms" },
      image: heroOutdoor,
    },
    viewAll: { label: "View all rooms", to: "/rooms" },
  },

  { label: "Sale", to: "/sale" },

  /* ---------- INSPIRATION ---------- */
  {
    label: "Inspiration",
    to: "/inspiration",
    columns: [
      {
        title: "Stories",
        to: "/inspiration",
        links: [
          { label: "Latest articles", to: "/inspiration/articles" },
          { label: "Designer interviews", to: "/inspiration/interviews" },
          { label: "Behind the brand", to: "/inspiration/brands" },
        ],
      },
      {
        title: "Guides",
        to: "/inspiration/guides",
        links: [
          { label: "Lighting guide", to: "/inspiration/guides/lighting" },
          { label: "Choosing a bulb", to: "/inspiration/guides/bulbs" },
          { label: "Outdoor lighting tips", to: "/inspiration/guides/outdoor" },
          { label: "Smart home setup", to: "/inspiration/guides/smart-home" },
        ],
      },
      {
        title: "Lookbook",
        to: "/inspiration/lookbook",
        links: [
          { label: "Scandinavian", to: "/inspiration/lookbook/scandinavian" },
          { label: "Industrial", to: "/inspiration/lookbook/industrial" },
          { label: "Mid-century", to: "/inspiration/lookbook/mid-century" },
          { label: "Minimalist", to: "/inspiration/lookbook/minimalist" },
        ],
      },
      {
        title: "Pro & trade",
        to: "/inspiration/pro",
        links: [
          { label: "For architects", to: "/inspiration/pro/architects" },
          { label: "For interior designers", to: "/inspiration/pro/designers" },
          { label: "Project references", to: "/inspiration/pro/projects" },
        ],
      },
    ],
    feature: {
      eyebrow: "Editorial",
      title: "Spring lookbook 2026",
      description:
        "Our favourite pairings of architectural lighting and Scandinavian furniture.",
      cta: { label: "Read the lookbook", to: "/inspiration/lookbook" },
      image: promoDesigner,
    },
    viewAll: { label: "All inspiration", to: "/inspiration" },
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { itemCount } = useCart();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* USP bar (light grey, matches footer) — visible on all viewports */}
      <div className="border-b border-border bg-surface text-foreground">
        <div className="container-abitaz flex h-10 items-center justify-between gap-2 text-[11px] sm:gap-3 md:gap-6 md:overflow-x-auto md:text-xs">
          <span className="flex min-w-0 items-center gap-1.5 md:gap-2">
            <Truck className="h-3.5 w-3.5 flex-none text-cta md:h-4 md:w-4" aria-hidden />
            <span className="truncate">
              <strong className="font-semibold">Free shipping</strong>
              <span className="hidden xs:inline"> €50+</span>
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5 md:gap-2">
            <RotateCcw className="h-3.5 w-3.5 flex-none text-cta md:h-4 md:w-4" aria-hidden />
            <span className="truncate">
              <strong className="font-semibold">30-day</strong>
              <span className="hidden xs:inline"> returns</span>
              <span className="inline xs:hidden"> ret.</span>
            </span>
          </span>
          <span className="hidden items-center gap-2 whitespace-nowrap md:flex">
            <Headset className="h-4 w-4 text-cta" aria-hidden />
            <span><strong className="font-semibold">Expert</strong> support</span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5 md:gap-2">
            <PackageCheck className="h-3.5 w-3.5 flex-none text-cta md:h-4 md:w-4" aria-hidden />
            <span className="truncate md:hidden">
              <span className="hidden xs:inline">Ships in </span>
              <strong className="font-semibold">1-2 days</strong>
            </span>
            <span className="hidden md:inline"><strong className="font-semibold">In stock</strong> — ships in 1-2 days</span>
          </span>
        </div>
      </div>

      {/* Combined blue bar: logo + nav + search + actions */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-abitaz flex h-16 items-center gap-3 md:gap-6">
          {/* Mobile hamburger */}
          <MobileMenu items={mainNav} />

          <Logo />

          {/* Mega menu nav — sits inline next to logo on desktop */}
          <div className="hidden flex-none lg:block">
            <MegaMenu items={mainNav} inline />
          </div>

          {/* Search */}
          <form
            role="search"
            onSubmit={submitSearch}
            className="hidden min-w-0 flex-1 md:block"
          >
            <label htmlFor="site-search" className="sr-only">
              Search products, brands or SKUs
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands or SKUs…"
                className="h-10 w-full rounded-md border-0 bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              />
            </div>
          </form>

          {/* Right actions */}
          <nav aria-label="Account" className="ml-auto flex flex-none items-center gap-1 md:gap-2">
            <Link
              to="/account"
              className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-primary-hover md:inline-flex"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-primary-hover"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-primary-hover"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[11px] font-semibold text-cta-foreground">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Fallback category nav row for tablet (md) where inline nav is hidden */}
        <div className="hidden border-t border-white/10 md:block lg:hidden">
          <MegaMenu items={mainNav} />
        </div>
      </div>

      {/* Promo ribbon (yellow) — current campaign */}
      <div className="bg-secondary text-secondary-foreground">
        <Link
          to="/sale"
          className="container-abitaz flex h-9 items-center justify-center gap-1.5 overflow-hidden text-xs md:gap-2 md:text-sm"
        >
          {/* Mobile: short version */}
          <span className="truncate md:hidden">
            <strong className="font-semibold">Spring Sale</strong> — up to <strong>−40%</strong>
            <span className="ml-1 font-semibold underline underline-offset-2">Shop now →</span>
          </span>
          {/* Desktop: full version */}
          <span className="hidden whitespace-nowrap md:inline">
            <strong className="font-semibold">Spring Sale</strong> — up to <strong>−40%</strong> on selected designer brands.
            <span className="ml-2 font-semibold underline underline-offset-2">Shop the sale →</span>
          </span>
        </Link>
      </div>
    </header>
  );
};