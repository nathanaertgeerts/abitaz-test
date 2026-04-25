import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { MegaMenu, type MegaMenuItem } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import heroIndoor from "@/assets/hero-indoor.jpg";
import heroOutdoor from "@/assets/hero-outdoor.jpg";
import heroDesigner from "@/assets/hero-designer.jpg";
import heroInstall from "@/assets/hero-installation.jpg";
import promoDesigner from "@/assets/promo-designer-sale.jpg";
import promoSummer from "@/assets/promo-summer-gift.jpg";
import productPendantOrange from "@/assets/product-pendant-orange.jpg";
import productPendantWhite from "@/assets/product-pendant-white.jpg";

const mainNav: MegaMenuItem[] = [
  {
    label: "Lighting",
    to: "/category/indoor-lighting",
    groups: [
      {
        label: "Indoor lighting",
        to: "/category/indoor-lighting",
        columns: [
          {
            title: "Pendants & ceiling",
            to: "/category/pendant-lamps",
            links: [
              { label: "Pendant lamps", to: "/category/pendant-lamps" },
              { label: "Ceiling lamps", to: "/category/ceiling-lamps" },
              { label: "Recessed spots", to: "/category/recessed-spots" },
              { label: "Track lighting", to: "/category/track-lighting" },
            ],
          },
          {
            title: "Wall & floor",
            to: "/category/wall-lamps",
            links: [
              { label: "Wall lamps", to: "/category/wall-lamps" },
              { label: "Floor lamps", to: "/category/floor-lamps" },
              { label: "Table lamps", to: "/category/table-lamps" },
              { label: "Reading lights", to: "/category/reading-lights" },
            ],
          },
        ],
        feature: {
          eyebrow: "Featured",
          title: "Philips Hue",
          description:
            "Smart lighting at your fingertips. Full control in one app.",
          cta: { label: "Discover Hue", to: "/brands/philips" },
          image: heroIndoor,
        },
      },
      {
        label: "Outdoor lighting",
        to: "/category/outdoor-lighting",
        columns: [
          {
            title: "Wall & ceiling",
            to: "/category/outdoor-wall-lamps",
            links: [
              { label: "Outdoor wall lamps", to: "/category/outdoor-wall-lamps" },
              { label: "Outdoor ceiling", to: "/category/outdoor-ceiling" },
              { label: "Porch lights", to: "/category/porch-lights" },
            ],
          },
          {
            title: "Garden & path",
            to: "/category/ground-spots",
            links: [
              { label: "Ground spots", to: "/category/ground-spots" },
              { label: "Path lighting", to: "/category/path-lighting" },
              { label: "String lights", to: "/category/string-lights" },
              { label: "Solar lighting", to: "/category/solar-lighting" },
            ],
          },
        ],
        feature: {
          eyebrow: "Outdoor season",
          title: "Garden ready —25%",
          description:
            "Light up your terrace and garden with weatherproof favourites.",
          cta: { label: "Shop outdoor", to: "/category/outdoor-lighting" },
          image: heroOutdoor,
        },
      },
      {
        label: "LED & bulbs",
        to: "/category/bulbs",
        columns: [
          {
            title: "By socket",
            to: "/category/bulbs",
            links: [
              { label: "E27 bulbs", to: "/category/bulbs?socket=e27" },
              { label: "E14 bulbs", to: "/category/bulbs?socket=e14" },
              { label: "GU10 spots", to: "/category/bulbs?socket=gu10" },
              { label: "G9 capsules", to: "/category/bulbs?socket=g9" },
            ],
          },
          {
            title: "By type",
            to: "/category/bulbs",
            links: [
              { label: "Filament bulbs", to: "/category/bulbs?type=filament" },
              { label: "Smart bulbs", to: "/category/bulbs?type=smart" },
              { label: "Dimmable LED", to: "/category/bulbs?type=dimmable" },
              { label: "Colour LED", to: "/category/bulbs?type=color" },
            ],
          },
        ],
        feature: {
          eyebrow: "Save energy",
          title: "Switch to LED",
          description:
            "Up to 80% less energy with the same warm, comfortable light.",
          cta: { label: "Shop LED", to: "/category/bulbs" },
          image: heroDesigner,
        },
      },
      {
        label: "Smart lighting",
        to: "/category/smart-lighting",
        columns: [
          {
            title: "Systems",
            to: "/category/smart-lighting",
            links: [
              { label: "Philips Hue", to: "/brands/philips" },
              { label: "Nordlux Smart", to: "/brands/nordlux" },
              { label: "Smart switches", to: "/category/smart-switches" },
            ],
          },
          {
            title: "Accessories",
            to: "/category/smart-accessories",
            links: [
              { label: "Remotes", to: "/category/smart-remotes" },
              { label: "Sensors", to: "/category/smart-sensors" },
              { label: "Bridges", to: "/category/smart-bridges" },
            ],
          },
        ],
        feature: {
          eyebrow: "New",
          title: "Smart starter sets",
          description:
            "Everything you need to make your home smart, in one box.",
          cta: { label: "View sets", to: "/category/smart-lighting" },
          image: heroIndoor,
        },
      },
    ],
    viewAll: { label: "View all lighting", to: "/category/indoor-lighting" },
  },
  {
    label: "Accessories",
    to: "/category/accessories",
    columns: [
      {
        title: "Cables & cords",
        to: "/category/cables",
        links: [
          { label: "Textile cords", to: "/category/textile-cords" },
          { label: "Power cables", to: "/category/power-cables" },
          { label: "Cable connectors", to: "/category/cable-connectors" },
        ],
      },
      {
        title: "Lampshades",
        to: "/category/lampshades",
        links: [
          { label: "Fabric shades", to: "/category/fabric-shades" },
          { label: "Metal shades", to: "/category/metal-shades" },
          { label: "Glass shades", to: "/category/glass-shades" },
        ],
      },
      {
        title: "Dimmers & switches",
        to: "/category/dimmers-switches",
        links: [
          { label: "Wall dimmers", to: "/category/wall-dimmers" },
          { label: "Plug-in dimmers", to: "/category/plug-dimmers" },
          { label: "Smart switches", to: "/category/smart-switches" },
        ],
      },
    ],
    feature: {
      eyebrow: "Make it yours",
      title: "Textile cords & fittings",
      description:
        "Personalise any pendant with colourful cords, sockets and matching shades.",
      cta: { label: "Shop accessories", to: "/category/accessories" },
      image: heroInstall,
    },
    viewAll: { label: "View all accessories", to: "/category/accessories" },
  },
  {
    label: "Furniture",
    to: "/category/furniture",
    columns: [
      {
        title: "Seating",
        to: "/category/seating",
        links: [
          { label: "Chairs", to: "/category/chairs" },
          { label: "Lounge chairs", to: "/category/lounge-chairs" },
          { label: "Sofas", to: "/category/sofas" },
        ],
      },
      {
        title: "Tables",
        to: "/category/tables",
        links: [
          { label: "Dining tables", to: "/category/dining-tables" },
          { label: "Coffee tables", to: "/category/coffee-tables" },
          { label: "Side tables", to: "/category/side-tables" },
        ],
      },
      {
        title: "Storage",
        to: "/category/storage",
        links: [
          { label: "Shelving", to: "/category/shelving" },
          { label: "Cabinets", to: "/category/cabinets" },
        ],
      },
    ],
    feature: {
      eyebrow: "Designer picks",
      title: "Scandinavian classics",
      description:
        "Iconic chairs and tables that pair beautifully with our designer lighting.",
      cta: { label: "Shop furniture", to: "/category/furniture" },
      image: promoSummer,
    },
    viewAll: { label: "View all furniture", to: "/category/furniture" },
  },
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
  { label: "Sale", to: "/sale" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full">
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
            onSubmit={(e) => e.preventDefault()}
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
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[11px] font-semibold text-cta-foreground">
                0
              </span>
            </Link>
          </nav>
        </div>

        {/* Fallback category nav row for tablet (md) where inline nav is hidden */}
        <div className="hidden border-t border-white/10 md:block lg:hidden">
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