import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, Search } from "lucide-react";
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

/** Slide-in mobile navigation with drill-in panels:
 *   Level 0 → list of top categories
 *   Level 1 → groups of the selected category (e.g. "Indoor lighting")
 *   Level 2 → all sub-links of the selected group
 *  This anchors the title at the top so users always see where they are. */
export const MobileMenu = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  const [itemIdx, setItemIdx] = useState<number | null>(null);
  const [groupIdx, setGroupIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    // Reset after exit animation
    setTimeout(() => {
      setItemIdx(null);
      setGroupIdx(null);
    }, 250);
  };

  // Scroll panel back to top whenever the user drills in or back out
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [itemIdx, groupIdx, open]);

  const activeItem = itemIdx !== null ? items[itemIdx] : null;
  const activeGroups: MegaGroup[] = activeItem
    ? activeItem.groups && activeItem.groups.length > 0
      ? activeItem.groups
      : activeItem.columns
        ? [{ label: activeItem.label, to: activeItem.to, columns: activeItem.columns }]
        : []
    : [];
  const activeGroup = groupIdx !== null ? activeGroups[groupIdx] : null;

  const title =
    activeGroup?.label ?? activeItem?.label ?? "Menu";

  const goBack = () => {
    if (groupIdx !== null) setGroupIdx(null);
    else if (itemIdx !== null) setItemIdx(null);
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
          <div className="flex items-center gap-2">
            {(itemIdx !== null || groupIdx !== null) && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Back"
                className="-ml-2 inline-flex items-center justify-center rounded-md p-1.5 text-foreground hover:bg-surface"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <SheetTitle className="font-display text-lg">{title}</SheetTitle>
          </div>
        </SheetHeader>

        {/* Search — only on the root level */}
        {itemIdx === null && (
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
        )}

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {/* LEVEL 0 — top categories */}
          {itemIdx === null && (
            <nav aria-label="Main">
              <ul>
                {items.map((item, i) => {
                  const hasChildren = !!(
                    item.groups?.length || item.columns?.length
                  );
                  if (!hasChildren) {
                    return (
                      <li key={item.label} className="border-b border-border/60">
                        <Link
                          to={item.to}
                          onClick={close}
                          className="flex items-center justify-between px-4 py-3.5 text-base font-semibold text-foreground hover:bg-surface"
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
                        onClick={() => setItemIdx(i)}
                        className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-base font-semibold text-foreground hover:bg-surface"
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {/* LEVEL 1 — groups of selected category */}
          {activeItem && groupIdx === null && (
            <nav aria-label={activeItem.label}>
              <Link
                to={activeItem.to}
                onClick={close}
                className="block border-b border-border/60 bg-surface px-4 py-3 text-sm font-semibold text-primary hover:underline"
              >
                View all {activeItem.label.toLowerCase()} →
              </Link>
              <ul>
                {activeGroups.map((g, i) => (
                  <li key={g.label} className="border-b border-border/60">
                    <button
                      type="button"
                      onClick={() => setGroupIdx(i)}
                      className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left text-[15px] font-semibold text-foreground hover:bg-surface"
                    >
                      <span>{g.label}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* LEVEL 2 — sub-links of selected group */}
          {activeGroup && (
            <nav aria-label={activeGroup.label}>
              {activeGroup.to && (
                <Link
                  to={activeGroup.to}
                  onClick={close}
                  className="block border-b border-border/60 bg-surface px-4 py-3 text-sm font-semibold text-primary hover:underline"
                >
                  View all {activeGroup.label.toLowerCase()} →
                </Link>
              )}
              <div className="px-4 py-2">
                {activeGroup.columns.map((col) => (
                  <div key={col.title} className="border-b border-border/60 py-3 last:border-b-0">
                    {col.to ? (
                      <Link
                        to={col.to}
                        onClick={close}
                        className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-cta"
                      >
                        {col.title}
                      </Link>
                    ) : (
                      <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        {col.title}
                      </div>
                    )}
                    <ul className="space-y-1">
                      {col.links.map((link) => (
                        <li key={`${col.title}-${link.label}`}>
                          <Link
                            to={link.to}
                            onClick={close}
                            className="block py-1.5 text-sm text-foreground hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                      {col.moreLink && (
                        <li key={`${col.title}-more`}>
                          <Link
                            to={col.moreLink.to}
                            onClick={close}
                            className="block py-1.5 text-sm font-semibold text-primary hover:underline"
                          >
                            {col.moreLink.label}
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          )}
        </div>

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