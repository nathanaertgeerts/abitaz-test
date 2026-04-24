import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export type MegaColumn = {
  title: string;
  links: { label: string; to: string }[];
};

export type MegaFeature = {
  eyebrow: string;
  title: string;
  description: string;
  cta: { label: string; to: string };
  image?: string;
};

export type MegaMenuItem = {
  label: string;
  to: string;
  columns?: MegaColumn[];
  feature?: MegaFeature;
  viewAll?: { label: string; to: string };
};

type Props = {
  items: MegaMenuItem[];
};

export const MegaMenu = ({ items }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const open = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 120);
  };

  return (
    <div className="relative" onMouseLeave={scheduleClose}>
      <ul className="container-abitaz flex h-11 items-center gap-6 overflow-x-auto text-sm font-medium">
        {items.map((item, i) => {
          const hasMenu = !!(item.columns?.length || item.feature);
          const isOpen = openIndex === i;
          return (
            <li
              key={item.label}
              onMouseEnter={() => (hasMenu ? open(i) : scheduleClose())}
              className="flex items-center"
            >
              <Link
                to={item.to}
                className={`flex items-center gap-1 whitespace-nowrap py-3 transition-colors ${
                  isOpen ? "text-cta" : "text-primary-foreground/90 hover:text-cta"
                }`}
              >
                {item.label}
                {hasMenu && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Panel */}
      {openIndex !== null && items[openIndex] && (items[openIndex].columns?.length || items[openIndex].feature) && (
        <div
          onMouseEnter={() => open(openIndex)}
          onMouseLeave={scheduleClose}
          className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-background text-foreground shadow-lg animate-in fade-in-0 slide-in-from-top-1 duration-150"
        >
          <div className="container-abitaz py-8">
            <div className="grid grid-cols-12 gap-8">
              {items[openIndex].columns?.map((col) => (
                <div key={col.title} className="col-span-12 md:col-span-2">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {col.title}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.to + link.label}>
                        <Link
                          to={link.to}
                          onClick={() => setOpenIndex(null)}
                          className="block text-sm text-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {items[openIndex].feature && (
                <div className="col-span-12 md:col-span-4">
                  <div className="overflow-hidden rounded-lg bg-surface">
                    {items[openIndex].feature!.image && (
                      <img
                        src={items[openIndex].feature!.image}
                        alt=""
                        className="h-40 w-full object-cover"
                      />
                    )}
                    <div className="p-5">
                      <span className="text-xs font-medium uppercase tracking-wide text-cta">
                        {items[openIndex].feature!.eyebrow}
                      </span>
                      <h4 className="mt-1 font-display text-lg font-bold">
                        {items[openIndex].feature!.title}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {items[openIndex].feature!.description}
                      </p>
                      <Link
                        to={items[openIndex].feature!.cta.to}
                        onClick={() => setOpenIndex(null)}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
                      >
                        {items[openIndex].feature!.cta.label} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {items[openIndex].viewAll && (
              <div className="mt-6 border-t border-border pt-4">
                <Link
                  to={items[openIndex].viewAll!.to}
                  onClick={() => setOpenIndex(null)}
                  className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                >
                  {items[openIndex].viewAll!.label} →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
