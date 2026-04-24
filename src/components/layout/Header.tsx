import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { MegaMenu, type MegaMenuItem } from "./MegaMenu";
import heroIndoor from "@/assets/hero-indoor.jpg";

const mainNav: MegaMenuItem[] = [
  {
    label: "Lighting",
    to: "/category/indoor-lighting",
    columns: [
      {
        title: "Indoor lighting",
        links: [
          { label: "Pendant lamps", to: "/category/pendant-lamps" },
          { label: "Ceiling lamps", to: "/category/ceiling-lamps" },
          { label: "Wall lamps", to: "/category/wall-lamps" },
          { label: "Floor lamps", to: "/category/floor-lamps" },
          { label: "Table lamps", to: "/category/table-lamps" },
          { label: "Recessed spots", to: "/category/recessed-spots" },
        ],
      },
      {
        title: "Outdoor lighting",
        links: [
          { label: "Outdoor wall lamps", to: "/category/outdoor-wall-lamps" },
          { label: "Ceiling lamps", to: "/category/outdoor-ceiling" },
          { label: "Ground spots", to: "/category/ground-spots" },
          { label: "String lights", to: "/category/string-lights" },
        ],
      },
      {
        title: "Track lighting",
        links: [
          { label: "Tracks", to: "/category/tracks" },
          { label: "Track fixtures", to: "/category/track-fixtures" },
          { label: "Connectors & end caps", to: "/category/track-connectors" },
          { label: "Power supplies", to: "/category/track-power" },
        ],
      },
      {
        title: "Light bulbs",
        links: [
          { label: "E27 bulbs", to: "/category/bulbs?socket=e27" },
          { label: "E14 bulbs", to: "/category/bulbs?socket=e14" },
          { label: "GU10 spots", to: "/category/bulbs?socket=gu10" },
          { label: "Smart bulbs", to: "/category/bulbs?type=smart" },
        ],
      },
    ],
    feature: {
      eyebrow: "Featured",
      title: "Philips Hue",
      description:
        "Philips' ingenious lighting system — smart lighting at your fingertips, with full control in your hands.",
      cta: { label: "Discover Hue", to: "/brands/philips" },
      image: heroIndoor,
    },
    viewAll: { label: "View all lighting", to: "/category/indoor-lighting" },
  },
  {
    label: "Accessories",
    to: "/category/accessories",
    columns: [
      {
        title: "Cables & cords",
        links: [
          { label: "Textile cords", to: "/category/textile-cords" },
          { label: "Power cables", to: "/category/power-cables" },
          { label: "Cable connectors", to: "/category/cable-connectors" },
        ],
      },
      {
        title: "Lampshades",
        links: [
          { label: "Fabric shades", to: "/category/fabric-shades" },
          { label: "Metal shades", to: "/category/metal-shades" },
          { label: "Glass shades", to: "/category/glass-shades" },
        ],
      },
      {
        title: "Dimmers & switches",
        links: [
          { label: "Wall dimmers", to: "/category/wall-dimmers" },
          { label: "Plug-in dimmers", to: "/category/plug-dimmers" },
          { label: "Smart switches", to: "/category/smart-switches" },
        ],
      },
    ],
    viewAll: { label: "View all accessories", to: "/category/accessories" },
  },
  {
    label: "Furniture",
    to: "/category/furniture",
    columns: [
      {
        title: "Seating",
        links: [
          { label: "Chairs", to: "/category/chairs" },
          { label: "Lounge chairs", to: "/category/lounge-chairs" },
          { label: "Sofas", to: "/category/sofas" },
        ],
      },
      {
        title: "Tables",
        links: [
          { label: "Dining tables", to: "/category/dining-tables" },
          { label: "Coffee tables", to: "/category/coffee-tables" },
          { label: "Side tables", to: "/category/side-tables" },
        ],
      },
      {
        title: "Storage",
        links: [
          { label: "Shelving", to: "/category/shelving" },
          { label: "Cabinets", to: "/category/cabinets" },
        ],
      },
    ],
    viewAll: { label: "View all furniture", to: "/category/furniture" },
  },
  {
    label: "Brands",
    to: "/brands",
    columns: [
      {
        title: "Premium",
        links: [
          { label: "Louis Poulsen", to: "/brands/louis-poulsen" },
          { label: "Flos", to: "/brands/flos" },
          { label: "&tradition", to: "/brands/tradition" },
          { label: "Normann Copenhagen", to: "/brands/normann-copenhagen" },
        ],
      },
      {
        title: "Everyday",
        links: [
          { label: "Nordlux", to: "/brands/nordlux" },
          { label: "Philips", to: "/brands/philips" },
        ],
      },
    ],
    viewAll: { label: "All brands A–Z", to: "/brands" },
  },
  { label: "Sale", to: "/sale" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top blue bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-abitaz flex h-16 items-center gap-4 md:gap-8">
          <Logo />

          {/* Search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="ml-2 hidden flex-1 md:block"
          >
            <label htmlFor="site-search" className="sr-only">
              Search products, brands or SKUs
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="site-search"
                type="search"
                placeholder="Search products, brands or SKUs…"
                className="h-10 w-full rounded-md border-0 bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
              />
            </div>
          </form>

          {/* Right actions */}
          <nav aria-label="Account" className="ml-auto flex items-center gap-1 md:gap-2">
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
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[11px] font-semibold text-cta-foreground">
                0
              </span>
            </Link>
          </nav>
        </div>

        {/* Main category nav with mega menu */}
        <div className="border-t border-white/10">
          <MegaMenu items={mainNav} />
        </div>
      </div>

      {/* USP ribbon (yellow) */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container-abitaz flex h-9 items-center justify-center gap-6 overflow-x-auto text-xs font-medium md:justify-between md:text-sm">
          <span className="whitespace-nowrap">✓ Free shipping from €50</span>
          <span className="hidden whitespace-nowrap md:inline">✓ 30-day returns</span>
          <span className="hidden whitespace-nowrap md:inline">✓ Professional support</span>
          <span className="whitespace-nowrap">✓ In stock — ships in 1-2 days</span>
        </div>
      </div>
    </header>
  );
};