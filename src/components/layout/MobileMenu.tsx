import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import type { MegaMenuItem, MegaGroup } from "./MegaMenu";

type Props = {
  items: MegaMenuItem[];
};

/** Slide-in mobile navigation. Top-level items expand to reveal their groups
 *  (or columns when an item has no groups). */
export const MobileMenu = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground hover:bg-primary-hover md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[88vw] max-w-sm flex-col p-0">
        <SheetHeader className="shrink-0 border-b border-border px-4 py-4 text-left">
          <SheetTitle className="font-display text-lg">Menu</SheetTitle>
        </SheetHeader>

        {/* Search */}
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="shrink-0 border-b border-border px-4 py-3"
        >
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="mobile-search"
              type="search"
              placeholder="Search products, brands…"
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta"
            />
          </div>
        </form>

        <nav aria-label="Main" className="min-h-0 flex-1 overflow-y-auto py-2">
          <ul>
            {items.map((item) => {
              const groups: MegaGroup[] =
                item.groups && item.groups.length > 0
                  ? item.groups
                  : item.columns
                    ? [{ label: item.label, to: item.to, columns: item.columns }]
                    : [];
              const hasChildren = groups.length > 0;
              const isOpen = expanded === item.label;

              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={close}
                      className="flex items-center justify-between px-4 py-3 text-base font-semibold text-foreground hover:bg-surface"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="border-b border-border/60">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-4 py-3 text-base font-semibold text-foreground hover:bg-surface"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="bg-surface px-4 pb-4 pt-1">
                      <Link
                        to={item.to}
                        onClick={close}
                        className="mb-2 inline-block text-sm font-semibold text-primary hover:underline"
                      >
                        View all {item.label.toLowerCase()} →
                      </Link>
                      <ul className="space-y-4">
                        {groups.map((g) => (
                          <li key={g.label}>
                            {g.to ? (
                              <Link
                                to={g.to}
                                onClick={close}
                                className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-cta"
                              >
                                {g.label}
                              </Link>
                            ) : (
                              <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                {g.label}
                              </div>
                            )}
                            <ul className="space-y-1.5 pl-1">
                              {g.columns.flatMap((col) =>
                                col.links.map((link) => (
                                  <li key={`${g.label}-${col.title}-${link.label}`}>
                                    <Link
                                      to={link.to}
                                      onClick={close}
                                      className="block py-1 text-sm text-foreground hover:text-primary"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                )),
                              )}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border px-4 py-4">
          <SheetClose asChild>
            <Link
              to="/account"
              className="block rounded-md border border-input px-3 py-2 text-center text-sm font-semibold text-foreground hover:bg-surface"
            >
              Account
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};