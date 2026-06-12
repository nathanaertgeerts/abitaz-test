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
    to: "/categories/lighting",
    groups: [
      /* ---------- LIGHTING ---------- */
      {
        label: "Lighting",
        to: "/categories/lighting",
        columns: [
          {
            title: "Indoor lighting",
            to: "/categories/indoor-lighting",
            links: [
              { label: "Pendant lights", to: "/categories/pendant-lights" },
              { label: "Ceiling lights", to: "/categories/ceiling-lights" },
              { label: "Recessed lights", to: "/categories/recessed-lights" },
              { label: "Spotlights", to: "/categories/spotlights" },
              { label: "Wall lights", to: "/categories/wall-lights" },
              { label: "Floor lamps", to: "/categories/floor-lamps" },
              { label: "Table lamps", to: "/categories/table-lamps" },
              { label: "Track lighting", to: "/categories/track-lighting" },
            ],
            moreLink: { label: "+ 2 more", to: "/categories/indoor-lighting" },
          },
          {
            title: "Outdoor lighting",
            to: "/categories/outdoor-lighting",
            links: [
              { label: "Bollards", to: "/categories/bollards" },
              { label: "Lamp posts", to: "/categories/lamp-posts" },
              { label: "Spike lights", to: "/categories/spike-lights" },
              { label: "Underwater lights", to: "/categories/underwater-lights" },
              { label: "Pendant lights outdoor", to: "/categories/pendant-lights-outdoor" },
              { label: "Ceiling lights outdoor", to: "/categories/ceiling-lights-outdoor" },
              { label: "Recessed lights outdoor", to: "/categories/recessed-lights-outdoor" },
              { label: "Spotlights outdoor", to: "/categories/spotlights-outdoor" },
            ],
            moreLink: { label: "+ 4 more", to: "/categories/outdoor-lighting" },
          },
          {
            title: "Light sources",
            to: "/categories/light-sources",
            links: [
              { label: "LED bulbs", to: "/categories/led-bulbs" },
              { label: "LED light strips", to: "/categories/led-light-strips" },
              { label: "Smart bulbs", to: "/categories/smart-bulbs" },
              { label: "Filament bulbs", to: "/categories/filament-bulbs" },
              { label: "LED modules", to: "/categories/led-modules" },
            ],
          },
          {
            title: "Lighting accessories",
            to: "/categories/lighting-accessories",
            links: [
              { label: "Power supplies", to: "/categories/power-supplies" },
              { label: "Canopies", to: "/categories/canopies" },
              { label: "LED profiles and covers", to: "/categories/led-profiles-and-covers" },
            ],
          },
        ],
        feature: {
          eyebrow: "New collection",
          title: "Architectural lighting, sourced.",
          description:
            "Over 4,800 fixtures from Artemide, Martinelli Luce, SLV and more — trusted by lighting designers across Europe.",
          cta: { label: "Explore Lighting", to: "/categories/lighting" },
          image: heroIndoor,
        },
      },

      /* ---------- ACCESSORIES ---------- */
      {
        label: "Accessories",
        to: "/categories/accessories",
        columns: [
          {
            title: "Decoration",
            to: "/categories/decoration",
            links: [
              { label: "Vases", to: "/categories/vases" },
              { label: "Mirrors", to: "/categories/mirrors" },
              { label: "Candles", to: "/categories/candles" },
              { label: "Candle holders", to: "/categories/candle-holders" },
              { label: "Picture frames", to: "/categories/picture-frames" },
              { label: "Clocks", to: "/categories/clocks" },
              { label: "Home fragrances", to: "/categories/home-fragrances" },
              { label: "Wall decorations", to: "/categories/wall-decorations" },
            ],
            moreLink: { label: "+ 4 more", to: "/categories/decoration" },
          },
          {
            title: "Kitchen & table",
            to: "/categories/kitchen-accessories",
            links: [
              { label: "Knives", to: "/categories/knives" },
              { label: "Cutting boards", to: "/categories/cutting-boards" },
              { label: "Pots & Pans", to: "/categories/pots-and-pans" },
              { label: "Glassware", to: "/categories/glassware" },
              { label: "Cutlery", to: "/categories/cutlery" },
              { label: "Mugs & Cups", to: "/categories/mugs-and-cups" },
              { label: "Trays", to: "/categories/trays" },
              { label: "Carafes", to: "/categories/carafes" },
            ],
            moreLink: { label: "+ 6 more", to: "/categories/table-accessories" },
          },
          {
            title: "Storage & racks",
            to: "/categories/storage",
            links: [
              { label: "Baskets", to: "/categories/baskets" },
              { label: "Shelves", to: "/categories/shelves" },
              { label: "Coat stands & hooks", to: "/categories/coat-stands-racks-and-hooks" },
              { label: "Organizers", to: "/categories/organizers" },
              { label: "Magazine racks", to: "/categories/magazine-racks" },
              { label: "Wine racks", to: "/categories/wine-racks" },
              { label: "Umbrella stands", to: "/categories/umbrella-stands" },
              { label: "Garbage bins", to: "/categories/garbage-bins" },
            ],
            moreLink: { label: "+ 5 more", to: "/categories/storage" },
          },
          {
            title: "Textiles & garden",
            to: "/categories/home-textiles",
            links: [
              { label: "Cushions", to: "/categories/cushions" },
              { label: "Rugs", to: "/categories/rugs" },
              { label: "Plaids", to: "/categories/plaids" },
              { label: "Bed linen", to: "/categories/bed-linen" },
              { label: "Bath towels", to: "/categories/bath-towels" },
              { label: "Doormats", to: "/categories/doormats" },
              { label: "Planters", to: "/categories/planters" },
              { label: "Artificial plants", to: "/categories/artificial-plants" },
            ],
            moreLink: { label: "+ 8 more", to: "/categories/home-textiles" },
          },
        ],
        feature: {
          eyebrow: "Finishing touches",
          title: "Style your space",
          description:
            "Vases, candles and decorative objects to complete every room — handpicked from European studios.",
          cta: { label: "Shop decoration", to: "/categories/decoration" },
          image: promoSummer,
        },
      },

      /* ---------- FURNITURE ---------- */
      {
        label: "Furniture",
        to: "/categories/furniture",
        columns: [
          {
            title: "Seating",
            to: "/categories/seating",
            links: [
              { label: "Chairs", to: "/categories/chairs" },
              { label: "Armchairs", to: "/categories/armchairs" },
              { label: "Sofas", to: "/categories/sofas" },
              { label: "Stools", to: "/categories/stools" },
              { label: "Bar stools", to: "/categories/bar-stools" },
              { label: "Office chairs", to: "/categories/office-chairs" },
              { label: "Poufs & Hockers", to: "/categories/poufs-and-hockers" },
              { label: "Sun loungers & Daybeds", to: "/categories/sun-loungers-and-daybeds" },
            ],
            moreLink: { label: "+ 3 more", to: "/categories/seating" },
          },
          {
            title: "Tables",
            to: "/categories/tables",
            links: [
              { label: "Dining tables", to: "/categories/dining-tables" },
              { label: "Coffee tables", to: "/categories/coffee-tables" },
              { label: "Side tables", to: "/categories/side-tables" },
              { label: "Bar tables", to: "/categories/bar-tables" },
              { label: "Garden tables", to: "/categories/garden-tables" },
              { label: "Trolleys", to: "/categories/trolleys" },
            ],
          },
          {
            title: "Cabinets & storage",
            to: "/categories/cabinets",
            links: [
              { label: "Display cabinets", to: "/categories/display-cabinets" },
              { label: "Drawer cabinets", to: "/categories/drawer-cabinets" },
              { label: "Dressers", to: "/categories/dressers" },
              { label: "Hanging cabinets", to: "/categories/hanging-cabinets" },
              { label: "Nightstands", to: "/categories/nightstands" },
              { label: "Shelving cabinets", to: "/categories/shelving-cabinets" },
              { label: "TV stands", to: "/categories/tv-stands" },
            ],
          },
          {
            title: "Workspace & more",
            to: "/categories/furniture",
            links: [
              { label: "Desks", to: "/categories/desks" },
              { label: "Benches", to: "/categories/benches" },
              { label: "Garden chairs", to: "/categories/garden-chairs" },
              { label: "Hanging chairs", to: "/categories/hanging-chairs" },
              { label: "Rocking chairs", to: "/categories/rocking-chairs" },
            ],
          },
        ],
        feature: {
          eyebrow: "Designer picks",
          title: "Scandinavian classics",
          description:
            "Iconic chairs and tables that pair beautifully with our designer lighting.",
          cta: { label: "Shop furniture", to: "/categories/furniture" },
          image: heroDesigner,
        },
      },
    ],
    viewAll: { label: "View all products", to: "/categories/lighting" },
  },

  /* ---------- BRANDS ---------- */
  {
    label: "Brands",
    to: "/brands",
    groups: [
      {
        label: "Lighting brands",
        to: "/brands?category=lighting",
        columns: [
          {
            title: "Designer",
            to: "/brands?tier=premium",
            links: [
              { label: "Louis Poulsen", to: "/brands/louis-poulsen" },
              { label: "Flos", to: "/brands/flos" },
              { label: "Artemide", to: "/brands/artemide" },
              { label: "Martinelli Luce", to: "/brands/martinelli-luce" },
              { label: "&tradition", to: "/brands/tradition" },
            ],
            moreLink: { label: "All designer brands →", to: "/brands?tier=premium" },
          },
          {
            title: "Everyday",
            to: "/brands?tier=everyday",
            links: [
              { label: "Nordlux", to: "/brands/nordlux" },
              { label: "Philips", to: "/brands/philips" },
              { label: "Eglo", to: "/brands/eglo" },
              { label: "Brilliant", to: "/brands/brilliant" },
              { label: "Paulmann", to: "/brands/paulmann" },
            ],
            moreLink: { label: "All everyday brands →", to: "/brands?tier=everyday" },
          },
          {
            title: "Architectural",
            to: "/brands?tier=architectural",
            links: [
              { label: "Vibia", to: "/brands/vibia" },
              { label: "Wever & Ducré", to: "/brands/wever-ducre" },
              { label: "Foscarini", to: "/brands/foscarini" },
              { label: "Marset", to: "/brands/marset" },
              { label: "Occhio", to: "/brands/occhio" },
            ],
            moreLink: { label: "All architectural brands →", to: "/brands?tier=architectural" },
          },
          {
            title: "Technical",
            to: "/brands?tier=technical",
            links: [
              { label: "Absinthe Lights", to: "/brands/absinthe" },
              { label: "VYSN", to: "/brands/vysn" },
              { label: "SLV", to: "/brands/slv" },
              { label: "Delta Light", to: "/brands/delta-light" },
              { label: "Modular Lighting", to: "/brands/modular-lighting" },
            ],
            moreLink: { label: "All technical brands →", to: "/brands?tier=technical" },
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
        label: "Furniture brands",
        to: "/brands?category=furniture",
        columns: [
          {
            title: "Scandinavian",
            to: "/brands?category=furniture&region=nordic",
            links: [
              { label: "Hay", to: "/brands/hay" },
              { label: "Muuto", to: "/brands/muuto" },
              { label: "Fritz Hansen", to: "/brands/fritz-hansen" },
              { label: "Carl Hansen & Søn", to: "/brands/carl-hansen" },
              { label: "String Furniture", to: "/brands/string-furniture" },
            ],
            moreLink: { label: "All Scandinavian brands →", to: "/brands?category=furniture&region=nordic" },
          },
          {
            title: "Italian & European",
            to: "/brands?category=furniture&region=eu",
            links: [
              { label: "Kartell", to: "/brands/kartell" },
              { label: "Magis", to: "/brands/magis" },
              { label: "Cassina", to: "/brands/cassina" },
              { label: "Vitra", to: "/brands/vitra" },
              { label: "Ethnicraft", to: "/brands/ethnicraft" },
            ],
            moreLink: { label: "All Italian & EU brands →", to: "/brands?category=furniture&region=eu" },
          },
          {
            title: "Outdoor & garden",
            to: "/brands?category=furniture&use=outdoor",
            links: [
              { label: "Fermob", to: "/brands/fermob" },
              { label: "Cane-line", to: "/brands/cane-line" },
              { label: "Fatboy", to: "/brands/fatboy" },
              { label: "Houe", to: "/brands/houe" },
              { label: "Weishäupl", to: "/brands/weishaupl" },
            ],
            moreLink: { label: "All outdoor brands →", to: "/brands?category=furniture&use=outdoor" },
          },
        ],
        feature: {
          eyebrow: "Designer picks",
          title: "Hay essentials",
          description:
            "Playful, functional Danish design — chairs, tables and storage for every room.",
          cta: { label: "Shop Hay", to: "/brands/hay" },
          image: productPendantWhite,
        },
      },
      {
        label: "Accessories brands",
        to: "/brands?category=accessories",
        columns: [
          {
            title: "Decoration & objects",
            to: "/brands?category=accessories&type=decor",
            links: [
              { label: "Ferm Living", to: "/brands/ferm-living" },
              { label: "Hübsch", to: "/brands/hubsch" },
              { label: "Bloomingville", to: "/brands/bloomingville" },
              { label: "Broste Copenhagen", to: "/brands/broste" },
              { label: "House Doctor", to: "/brands/house-doctor" },
            ],
            moreLink: { label: "All decoration brands →", to: "/brands?category=accessories&type=decor" },
          },
          {
            title: "Kitchen & table",
            to: "/brands?category=accessories&type=kitchen",
            links: [
              { label: "Iittala", to: "/brands/iittala" },
              { label: "Stelton", to: "/brands/stelton" },
              { label: "Eva Solo", to: "/brands/eva-solo" },
              { label: "Alessi", to: "/brands/alessi" },
              { label: "Le Creuset", to: "/brands/le-creuset" },
            ],
            moreLink: { label: "All kitchen brands →", to: "/brands?category=accessories&type=kitchen" },
          },
          {
            title: "Textiles & scent",
            to: "/brands?category=accessories&type=textiles",
            links: [
              { label: "Lexington", to: "/brands/lexington" },
              { label: "HKliving", to: "/brands/hkliving" },
              { label: "Skagerak", to: "/brands/skagerak" },
              { label: "Rituals", to: "/brands/rituals" },
              { label: "Tine K Home", to: "/brands/tine-k-home" },
            ],
            moreLink: { label: "All textile brands →", to: "/brands?category=accessories&type=textiles" },
          },
        ],
        feature: {
          eyebrow: "New in",
          title: "Ferm Living spring",
          description:
            "Fresh ceramics, cushions and decorative objects from the Copenhagen studio.",
          cta: { label: "Shop Ferm Living", to: "/brands/ferm-living" },
          image: promoSummer,
        },
      },
      {
        label: "On sale",
        to: "/sale",
        columns: [
          {
            title: "Designer on sale",
            to: "/sale",
            links: [
              { label: "Louis Poulsen sale", to: "/brands/louis-poulsen?sale=1" },
              { label: "Flos sale", to: "/brands/flos?sale=1" },
              { label: "Artemide sale", to: "/brands/artemide?sale=1" },
              { label: "&tradition sale", to: "/brands/tradition?sale=1" },
              { label: "Martinelli Luce sale", to: "/brands/martinelli-luce?sale=1" },
            ],
            moreLink: { label: "All designer sale →", to: "/sale?tier=premium" },
          },
          {
            title: "Everyday on sale",
            to: "/sale?tier=everyday",
            links: [
              { label: "Nordlux sale", to: "/brands/nordlux?sale=1" },
              { label: "Philips sale", to: "/brands/philips?sale=1" },
              { label: "Eglo sale", to: "/brands/eglo?sale=1" },
              { label: "Brilliant sale", to: "/brands/brilliant?sale=1" },
              { label: "Paulmann sale", to: "/brands/paulmann?sale=1" },
            ],
            moreLink: { label: "All everyday sale →", to: "/sale?tier=everyday" },
          },
          {
            title: "Technical on sale",
            to: "/sale?tier=technical",
            links: [
              { label: "SLV sale", to: "/brands/slv?sale=1" },
              { label: "VYSN sale", to: "/brands/vysn?sale=1" },
              { label: "Absinthe sale", to: "/brands/absinthe?sale=1" },
              { label: "Delta Light sale", to: "/brands/delta-light?sale=1" },
              { label: "Modular sale", to: "/brands/modular-lighting?sale=1" },
            ],
            moreLink: { label: "All technical sale →", to: "/sale?tier=technical" },
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
          { label: "Warm minimalist loft", to: "/inspiration/warm-minimalist-loft" },
          { label: "Scandi kitchen glow", to: "/inspiration/scandi-kitchen-glow" },
          { label: "Dark academia office", to: "/inspiration/dark-academia-office" },
        ],
      },
      {
        title: "Guides",
        to: "/guides/lighting-planner",
        links: [
          { label: "Lighting planner", to: "/guides/lighting-planner" },
          { label: "Size & spec guide", to: "/guides/size-spec" },
          { label: "Journal & guides", to: "/blog" },
        ],
      },
      {
        title: "Lookbook",
        to: "/collections",
        links: [
          { label: "Outdoor dining", to: "/inspiration/outdoor-dining-lights" },
          { label: "Spa-mood bathroom", to: "/inspiration/spa-bathroom-mood" },
          { label: "Kids' room", to: "/inspiration/kids-room-rainbow" },
          { label: "All collections", to: "/collections" },
        ],
      },
      {
        title: "Pro & trade",
        to: "/pro",
        links: [
          { label: "Trade programme", to: "/pro" },
          { label: "Project references", to: "/pro/projects" },
          { label: "Request a quote", to: "/pro/quote" },
        ],
      },
    ],
    feature: {
      eyebrow: "Editorial",
      title: "Spring lookbook 2026",
      description:
        "Our favourite pairings of architectural lighting and Scandinavian furniture.",
      cta: { label: "Read the lookbook", to: "/inspiration" },
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