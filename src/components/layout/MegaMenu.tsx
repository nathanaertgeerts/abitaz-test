import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export type MegaColumn = {
  title: string;
  to?: string;
  links: { label: string; to: string }[];
  /** Optional "+N more" link rendered after the link list. */
  moreLink?: { label: string; to: string };
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; to: string };
  image?: string;
};

/** A "group" represents one selectable top-category in the left rail.
 *  Each group can have its own sub-columns and featured panel. */
export type MegaGroup = {
  label: string;
  to?: string;
  columns: MegaColumn[];
  feature?: MegaFeature;
};

export type MegaMenuItem = {
  label: string;
  to: string;
  /** Preferred: groups shown in a left rail; selecting one swaps the right side. */
  groups?: MegaGroup[];
  /** Legacy single-panel layout (still supported when no `groups`). */
  columns?: MegaColumn[];
  feature?: MegaFeature;
  viewAll?: { label: string; to: string };
};

type Props = {
  items: MegaMenuItem[];
  /** When true, the trigger row renders inline (no container, no fixed height)
   *  and the dropdown panel is positioned to span the full viewport width
   *  beneath the sticky header. */
  inline?: boolean;
};

export const MegaMenu = ({ items, inline = false }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const closeTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLUListElement | null>(null);
  const [panelTop, setPanelTop] = useState<number>(0);

  useEffect(() => {
    if (!inline) return;
    const updateTop = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPanelTop(rect.bottom);
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", updateTop, true);
    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", updateTop, true);
    };
  }, [inline, openIndex]);

  const open = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (i !== openIndex) setActiveGroup(0);
    setOpenIndex(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
  };

  // Reset selected group whenever menu closes
  useEffect(() => {
    if (openIndex === null) setActiveGroup(0);
  }, [openIndex]);

  const closeAll = () => setOpenIndex(null);

  return (
    <div className={inline ? "" : "relative"} onMouseLeave={scheduleClose}>
      <ul
        ref={triggerRef}
        className={
          inline
            ? "flex items-center gap-5 text-sm font-medium"
            : "container-abitaz flex h-11 items-center gap-6 overflow-x-auto text-sm font-medium"
        }
      >
        {items.map((item, i) => {
          const hasMenu = !!(item.groups?.length || item.columns?.length || item.feature);
          const isOpen = openIndex === i;
          return (
            <li
              key={item.label}
              onMouseEnter={() => (hasMenu ? open(i) : scheduleClose())}
              className="flex items-center"
            >
              <Link
                to={item.to}
                className={`relative flex items-center gap-1.5 whitespace-nowrap py-3 text-[15px] font-semibold tracking-[-0.005em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-secondary after:transition-transform after:duration-200 ${
                  isOpen
                    ? "text-white after:scale-x-100"
                    : "text-white/90 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {item.label}
                {hasMenu && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Panel */}
      {openIndex !== null &&
        items[openIndex] &&
        (items[openIndex].groups?.length ||
          items[openIndex].columns?.length ||
          items[openIndex].feature) && (
        <div
          onMouseEnter={() => open(openIndex)}
          onMouseLeave={scheduleClose}
          style={inline ? { top: panelTop } : undefined}
          className={
            inline
              ? "fixed left-0 right-0 z-50 border-t border-white/10 bg-background text-foreground shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-150"
              : "absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-background text-foreground shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-150"
          }
        >
          <MegaPanel
            item={items[openIndex]}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            onClose={closeAll}
          />
        </div>
      )}
    </div>
  );
};

/* -------- Panel rendered with optional left-rail groups -------- */
const MegaPanel = ({
  item,
  activeGroup,
  setActiveGroup,
  onClose,
}: {
  item: MegaMenuItem;
  activeGroup: number;
  setActiveGroup: (i: number) => void;
  onClose: () => void;
}) => {
  // If no explicit groups, synthesize one from legacy columns/feature
  const groups: MegaGroup[] =
    item.groups && item.groups.length > 0
      ? item.groups
      : [
          {
            label: item.label,
            to: item.to,
            columns: item.columns ?? [],
            feature: item.feature,
          },
        ];

  const showRail = (item.groups?.length ?? 0) > 0;
  const idx = Math.min(activeGroup, groups.length - 1);
  const current = groups[idx];

  return (
    <div className="container-abitaz py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Left rail with selectable top-categories */}
        {showRail && (
          <nav
            aria-label="Categories"
            className="col-span-12 md:col-span-3"
          >
            <ul className="space-y-1 border-r border-border pr-4">
              {groups.map((g, i) => {
                const active = i === idx;
                return (
                  <li key={g.label}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveGroup(i)}
                      onFocus={() => setActiveGroup(i)}
                      onClick={() => {
                        if (g.to) {
                          onClose();
                          // allow Link below to navigate via wrapper
                        }
                        setActiveGroup(i);
                      }}
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-left text-[13px] font-bold uppercase tracking-wider transition-colors ${
                        active
                          ? "bg-cta/10 text-cta"
                          : "text-foreground hover:bg-surface hover:text-primary"
                      }`}
                    >
                      <span className="whitespace-nowrap">
                        {g.to ? (
                          <Link
                            to={g.to}
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                            }}
                            className="block"
                          >
                            {g.label}
                          </Link>
                        ) : (
                          g.label
                        )}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 flex-none transition-opacity ${
                          active ? "opacity-100" : "opacity-30"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Right side: sub-columns + feature for the active group */}
        <div
          className={`col-span-12 ${
            showRail ? "md:col-span-9" : "md:col-span-12"
          }`}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {current.columns.map((col) => (
              <div key={col.title} className="min-w-0 flex-1">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide md:whitespace-nowrap">
                  {col.to ? (
                    <Link
                      to={col.to}
                      onClick={onClose}
                      className="text-foreground transition-colors hover:text-primary"
                    >
                      {col.title}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{col.title}</span>
                  )}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to + link.label}>
                      <Link
                        to={link.to}
                        onClick={onClose}
                        className="block text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {col.moreLink && (
                    <li key={`${col.title}-more`}>
                      <Link
                        to={col.moreLink.to}
                        onClick={onClose}
                        className="block text-sm font-semibold text-primary hover:underline"
                      >
                        {col.moreLink.label}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}

            {current.feature && (
              <div className="w-full md:w-64 md:flex-none">
                <div className="overflow-hidden rounded-lg bg-surface">
                  {current.feature.image && (
                    <img
                      src={current.feature.image}
                      alt=""
                      className="h-32 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-cta">
                      {current.feature.eyebrow}
                    </span>
                    <h4 className="mt-1 font-display text-base font-bold">
                      {current.feature.title}
                    </h4>
                    <p className="mt-1.5 line-clamp-3 text-xs text-muted-foreground">
                      {current.feature.description}
                    </p>
                    <Link
                      to={current.feature.cta.to}
                      onClick={onClose}
                      className="mt-2 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                    >
                      {current.feature.cta.label} →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {item.viewAll && (
        <div className="mt-6 border-t border-border pt-4">
          <Link
            to={item.viewAll.to}
            onClick={onClose}
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            {item.viewAll.label} →
          </Link>
        </div>
      )}
    </div>
  );
};
