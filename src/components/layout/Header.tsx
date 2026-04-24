import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";

const mainNav = [
  { label: "Lighting", to: "/category/pendant-lamps" },
  { label: "Installation materials", to: "/category/installation" },
  { label: "Brands", to: "/brands" },
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

        {/* Main category nav */}
        <div className="border-t border-white/10">
          <div className="container-abitaz flex h-11 items-center gap-6 overflow-x-auto text-sm font-medium">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap py-3 transition-colors ${
                    isActive ? "text-cta" : "text-primary-foreground/90 hover:text-cta"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
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