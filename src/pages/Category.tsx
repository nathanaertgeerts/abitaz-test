import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/data/products";
import promoDesigner from "@/assets/promo-designer-sale.jpg";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/**
 * Sidebar tree: top-level groups, each with their own subcategories.
 * Drives both highlighting the current page and which group auto-opens.
 */
const categoryTree: { slug: string; name: string; subs: { slug: string; name: string }[] }[] = [
  {
    slug: "indoor-lighting",
    name: "Indoor lighting",
    subs: [
      { slug: "pendant-lamps", name: "Pendant lamps" },
      { slug: "ceiling-lamps", name: "Ceiling lamps" },
      { slug: "recessed-spots", name: "Recessed spots" },
      { slug: "wall-lamps", name: "Wall lamps" },
      { slug: "floor-lamps", name: "Floor lamps" },
      { slug: "table-lamps", name: "Table lamps" },
    ],
  },
  {
    slug: "outdoor-lighting",
    name: "Outdoor lighting",
    subs: [
      { slug: "outdoor-wall-lamps", name: "Outdoor wall lamps" },
      { slug: "outdoor-ceiling", name: "Outdoor ceiling" },
      { slug: "ground-spots", name: "Ground spots" },
      { slug: "path-lighting", name: "Path lighting" },
      { slug: "string-lights", name: "String lights" },
    ],
  },
  {
    slug: "bulbs",
    name: "Light bulbs",
    subs: [
      { slug: "bulbs", name: "All bulbs" },
      { slug: "smart-lighting", name: "Smart bulbs" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    subs: [
      { slug: "textile-cords", name: "Textile cords" },
      { slug: "power-cables", name: "Power cables" },
      { slug: "cable-connectors", name: "Cable connectors" },
      { slug: "lampshades", name: "Lampshades" },
      { slug: "dimmers-switches", name: "Dimmers & switches" },
    ],
  },
  {
    slug: "furniture",
    name: "Furniture",
    subs: [
      { slug: "chairs", name: "Chairs" },
      { slug: "lounge-chairs", name: "Lounge chairs" },
      { slug: "sofas", name: "Sofas" },
      { slug: "dining-tables", name: "Dining tables" },
      { slug: "coffee-tables", name: "Coffee tables" },
      { slug: "side-tables", name: "Side tables" },
      { slug: "shelving", name: "Shelving" },
      { slug: "cabinets", name: "Cabinets" },
    ],
  },
];

/* ---------- Filter facet definitions per top-category ---------- */
type CheckFacet = { title: string; options: { name: string; count: number }[] };
type SwatchFacet = {
  title: string;
  options: { name: string; swatch: string; count: number }[];
};
type FilterSet = {
  /** Range filter (Price / Wattage etc.) */
  range: { title: string; min: number; max: number; unit?: string };
  /** Plain checkbox facets */
  checks: CheckFacet[];
  /** Optional colour-swatch facet */
  swatches?: SwatchFacet;
};

/* Universal facets shared across most verticals — added at the bottom of the rail. */
const universalChecks: CheckFacet[] = [
  {
    title: "Brand",
    options: [
      { name: "Louis Poulsen", count: 124 },
      { name: "Flos", count: 98 },
      { name: "Artemide", count: 76 },
      { name: "Nordlux", count: 412 },
      { name: "Philips", count: 287 },
      { name: "&tradition", count: 64 },
    ],
  },
  {
    title: "Availability",
    options: [
      { name: "In stock — ships in 1-2 days", count: 2185 },
      { name: "On sale", count: 412 },
      { name: "New arrivals", count: 87 },
    ],
  },
];

const lightingFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 865, unit: "€" },
  checks: [
    {
      title: "Room",
      options: [
        { name: "Living room", count: 824 },
        { name: "Dining room", count: 612 },
        { name: "Kitchen", count: 318 },
        { name: "Bedroom", count: 287 },
        { name: "Bathroom", count: 142 },
        { name: "Hallway", count: 198 },
        { name: "Kids room", count: 96 },
        { name: "Office", count: 124 },
      ],
    },
    {
      title: "Style",
      options: [
        { name: "Modern", count: 612 },
        { name: "Designer", count: 318 },
        { name: "Industrial", count: 184 },
        { name: "Scandinavian", count: 287 },
        { name: "Classic", count: 142 },
        { name: "Rustic", count: 64 },
      ],
    },
    {
      title: "Light source",
      options: [
        { name: "Integrated LED", count: 712 },
        { name: "Replaceable bulb (E27)", count: 482 },
        { name: "Replaceable bulb (E14)", count: 281 },
        { name: "GU10 spot", count: 198 },
      ],
    },
    {
      title: "Features",
      options: [
        { name: "Dimmable", count: 524 },
        { name: "Smart compatible", count: 187 },
        { name: "Adjustable / directional", count: 142 },
        { name: "Tunable white", count: 84 },
      ],
    },
    {
      title: "Material",
      options: [
        { name: "Metal", count: 281 },
        { name: "Aluminium", count: 185 },
        { name: "Glass", count: 81 },
        { name: "Wood", count: 31 },
        { name: "Fabric", count: 42 },
        { name: "Plastic", count: 21 },
      ],
    },
    ...universalChecks,
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "White", swatch: "#ffffff", count: 1825 },
      { name: "Black", swatch: "#1f1f1f", count: 1705 },
      { name: "Gold", swatch: "#d4af37", count: 1523 },
      { name: "Brass", swatch: "#b58a3a", count: 412 },
      { name: "Grey", swatch: "#9ca3af", count: 1054 },
      { name: "Silver", swatch: "#c0c0c0", count: 854 },
    ],
  },
};

const outdoorFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 865, unit: "€" },
  checks: [
    {
      title: "Mounting",
      options: [
        { name: "Wall", count: 412 },
        { name: "Ceiling", count: 184 },
        { name: "Ground / spike", count: 142 },
        { name: "Path / bollard", count: 96 },
        { name: "Pendant", count: 64 },
        { name: "String light", count: 48 },
      ],
    },
    {
      title: "IP rating",
      options: [
        { name: "IP44 — splash proof", count: 312 },
        { name: "IP54 — dust & splash", count: 198 },
        { name: "IP65 — water jets", count: 145 },
        { name: "IP67 — submersible", count: 47 },
      ],
    },
    {
      title: "Power source",
      options: [
        { name: "Hardwired (230V)", count: 524 },
        { name: "Low voltage (12V/24V)", count: 142 },
        { name: "Solar", count: 96 },
        { name: "Battery / rechargeable", count: 38 },
      ],
    },
    {
      title: "Smart features",
      options: [
        { name: "Motion sensor", count: 184 },
        { name: "Dusk-to-dawn sensor", count: 96 },
        { name: "Dimmable", count: 142 },
        { name: "Smart / app control", count: 64 },
      ],
    },
    {
      title: "Material",
      options: [
        { name: "Aluminium", count: 220 },
        { name: "Stainless steel", count: 132 },
        { name: "Galvanised steel", count: 84 },
        { name: "Plastic", count: 51 },
      ],
    },
    ...universalChecks,
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "Black", swatch: "#1f1f1f", count: 412 },
      { name: "Anthracite", swatch: "#3a3a3a", count: 298 },
      { name: "White", swatch: "#ffffff", count: 187 },
      { name: "Brass", swatch: "#b58a3a", count: 96 },
    ],
  },
};

const bulbFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 80, unit: "€" },
  checks: [
    {
      title: "Socket",
      options: [
        { name: "E27", count: 482 },
        { name: "E14", count: 381 },
        { name: "GU10", count: 264 },
        { name: "G9", count: 88 },
        { name: "B22", count: 25 },
      ],
    },
    {
      title: "Wattage (LED)",
      options: [
        { name: "≤ 4W", count: 145 },
        { name: "5–7W", count: 312 },
        { name: "8–10W", count: 187 },
        { name: "> 10W", count: 64 },
      ],
    },
    {
      title: "Colour temperature",
      options: [
        { name: "2200K — extra warm", count: 92 },
        { name: "2700K — warm white", count: 421 },
        { name: "3000K — soft white", count: 198 },
        { name: "4000K — cool white", count: 64 },
        { name: "Tunable white", count: 38 },
      ],
    },
    {
      title: "Brightness (lumens)",
      options: [
        { name: "≤ 250 lm", count: 84 },
        { name: "250–500 lm", count: 287 },
        { name: "500–800 lm", count: 312 },
        { name: "800–1500 lm", count: 198 },
        { name: "> 1500 lm", count: 64 },
      ],
    },
    {
      title: "Features",
      options: [
        { name: "Dimmable", count: 312 },
        { name: "Smart / Wi-Fi", count: 84 },
        { name: "Filament look", count: 145 },
        { name: "Frosted glass", count: 98 },
      ],
    },
    ...universalChecks,
  ],
};

/* Decoration: candles, vases, lampshades, side tables, mirrors, decor objects.
   Filters focus on style, room and material — not electrical specs. */
const decorationFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 350, unit: "€" },
  checks: [
    {
      title: "Type",
      options: [
        { name: "Lampshades", count: 187 },
        { name: "Candles", count: 98 },
        { name: "Candle holders", count: 76 },
        { name: "Vases", count: 64 },
        { name: "Mirrors", count: 42 },
        { name: "Side tables", count: 58 },
        { name: "Wall art", count: 31 },
        { name: "Diffusers", count: 24 },
      ],
    },
    {
      title: "Room",
      options: [
        { name: "Living room", count: 312 },
        { name: "Dining room", count: 142 },
        { name: "Bedroom", count: 96 },
        { name: "Bathroom", count: 48 },
        { name: "Hallway", count: 64 },
      ],
    },
    {
      title: "Style",
      options: [
        { name: "Modern", count: 184 },
        { name: "Scandinavian", count: 142 },
        { name: "Designer", count: 98 },
        { name: "Bohemian", count: 56 },
        { name: "Industrial", count: 42 },
      ],
    },
    {
      title: "Material",
      options: [
        { name: "Ceramic", count: 124 },
        { name: "Glass", count: 96 },
        { name: "Metal", count: 142 },
        { name: "Wood", count: 87 },
        { name: "Fabric", count: 64 },
      ],
    },
    ...universalChecks,
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "White", swatch: "#ffffff", count: 187 },
      { name: "Black", swatch: "#1f1f1f", count: 198 },
      { name: "Beige", swatch: "#e5e1d3", count: 112 },
      { name: "Terracotta", swatch: "#c4622d", count: 64 },
      { name: "Forest", swatch: "#3f5c3a", count: 38 },
      { name: "Mustard", swatch: "#e8a13a", count: 42 },
    ],
  },
};

/* Installation: switches, sockets, dimmers, drivers, cables.
   Filters focus on electrical compatibility and finishes. */
const installationFilters: FilterSet = {
  range: { title: "Price", min: 1, max: 250, unit: "€" },
  checks: [
    {
      title: "Type",
      options: [
        { name: "Wall switches", count: 142 },
        { name: "Power sockets", count: 124 },
        { name: "Dimmers", count: 96 },
        { name: "Smart switches", count: 84 },
        { name: "Cover plates", count: 76 },
        { name: "Cables & cords", count: 168 },
        { name: "Drivers & transformers", count: 48 },
      ],
    },
    {
      title: "System / range",
      options: [
        { name: "Niko Pure", count: 124 },
        { name: "Niko Original", count: 98 },
        { name: "Bticino Living Now", count: 64 },
        { name: "Legrand", count: 56 },
        { name: "Universal", count: 184 },
      ],
    },
    {
      title: "Finish",
      options: [
        { name: "White", count: 287 },
        { name: "Black", count: 142 },
        { name: "Anthracite", count: 96 },
        { name: "Brushed steel", count: 64 },
        { name: "Brass", count: 38 },
      ],
    },
    {
      title: "Smart compatibility",
      options: [
        { name: "Niko Home Control", count: 84 },
        { name: "Zigbee", count: 64 },
        { name: "Wi-Fi", count: 48 },
        { name: "KNX", count: 32 },
      ],
    },
    ...universalChecks,
  ],
};

const furnitureFilters: FilterSet = {
  range: { title: "Price", min: 50, max: 4500, unit: "€" },
  checks: [
    {
      title: "Room",
      options: [
        { name: "Living room", count: 312 },
        { name: "Dining room", count: 198 },
        { name: "Bedroom", count: 145 },
        { name: "Office", count: 87 },
        { name: "Outdoor", count: 64 },
      ],
    },
    {
      title: "Type",
      options: [
        { name: "Chairs", count: 184 },
        { name: "Lounge chairs", count: 96 },
        { name: "Sofas", count: 58 },
        { name: "Dining tables", count: 112 },
        { name: "Coffee tables", count: 87 },
        { name: "Side tables", count: 64 },
        { name: "Shelving", count: 78 },
        { name: "Cabinets", count: 45 },
      ],
    },
    {
      title: "Material",
      options: [
        { name: "Solid wood", count: 215 },
        { name: "Veneer", count: 124 },
        { name: "Metal", count: 168 },
        { name: "Upholstered", count: 142 },
        { name: "Marble", count: 38 },
      ],
    },
    {
      title: "Designer",
      options: [
        { name: "Hans J. Wegner", count: 24 },
        { name: "Verner Panton", count: 18 },
        { name: "Arne Jacobsen", count: 16 },
        { name: "Charles & Ray Eames", count: 14 },
      ],
    },
    {
      title: "Seats (sofas & benches)",
      options: [
        { name: "1 seat", count: 96 },
        { name: "2 seats", count: 84 },
        { name: "3 seats", count: 56 },
        { name: "4+ seats", count: 18 },
      ],
    },
    ...universalChecks,
  ],
  swatches: {
    title: "Color",
    options: [
      { name: "Natural oak", swatch: "#cfa37a", count: 198 },
      { name: "Walnut", swatch: "#5a3a24", count: 124 },
      { name: "Black", swatch: "#1f1f1f", count: 142 },
      { name: "White", swatch: "#ffffff", count: 87 },
      { name: "Beige", swatch: "#e5e1d3", count: 76 },
    ],
  },
};

/** Pick the right filter set for the active top-category.
 *  Accessories splits into Decoration vs Installation based on the active sub-slug. */
const installationSlugs = new Set([
  "installation",
  "switches-sockets",
  "wall-switches",
  "power-sockets",
  "smart-switches",
  "cover-plates",
  "dimmers-switches",
  "wall-dimmers",
  "plug-dimmers",
  "drivers",
  "cables",
  "textile-cords",
  "power-cables",
  "cable-connectors",
  "sockets-fittings",
]);

const getFiltersForGroup = (groupSlug: string, currentSlug: string): FilterSet => {
  if (groupSlug === "bulbs") return bulbFilters;
  if (groupSlug === "outdoor-lighting") return outdoorFilters;
  if (groupSlug === "furniture") return furnitureFilters;
  if (groupSlug === "accessories") {
    return installationSlugs.has(currentSlug) ? installationFilters : decorationFilters;
  }
  return lightingFilters;
};

const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <details open className="border-b border-border py-4 [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground">
      {title}
      <ChevronDown className="transition group-open:rotate-180" />
    </summary>
    <div className="mt-3 space-y-2 text-sm">{children}</div>
  </details>
);

const Category = () => {
  const { slug = "pendant-lamps" } = useParams();
  const cat = useMemo(() => categories.find((c) => c.slug === slug), [slug]);
  // Resolve the top-level group of the active page (drives which filter set
  // and which sub-list to show in the sidebar).
  const activeGroup = useMemo(
    () =>
      categoryTree.find(
        (g) => g.slug === slug || g.subs.some((s) => s.slug === slug),
      ) ?? categoryTree[0],
    [slug],
  );
  const filterSet = useMemo(
    () => getFiltersForGroup(activeGroup.slug, slug),
    [activeGroup, slug],
  );
  // Base category list — falls back to the full catalogue when the demo
  // dataset has no items for that slug, so every page is populated.
  const baseList = useMemo(() => {
    const inCat = products.filter((p) => p.categorySlug === slug);
    return inCat.length > 0 ? inCat : products;
  }, [slug]);

  const [sort, setSort] = useState("popularity");
  // Filters are collapsed by default on mobile, always shown on desktop (lg+)
  const [filtersOpen, setFiltersOpen] = useState(false);

  // ----- Active filter state (reset whenever the filter set changes) -----
  const [minPrice, setMinPrice] = useState<number>(filterSet.range.min);
  const [maxPrice, setMaxPrice] = useState<number>(filterSet.range.max);
  const [checkedFacets, setCheckedFacets] = useState<Record<string, Set<string>>>({});
  const [checkedSwatches, setCheckedSwatches] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMinPrice(filterSet.range.min);
    setMaxPrice(filterSet.range.max);
    setCheckedFacets({});
    setCheckedSwatches(new Set());
  }, [filterSet]);

  const toggleFacet = (facetTitle: string, optionName: string) => {
    setCheckedFacets((prev) => {
      const next = { ...prev };
      const set = new Set(next[facetTitle] ?? []);
      if (set.has(optionName)) set.delete(optionName);
      else set.add(optionName);
      next[facetTitle] = set;
      return next;
    });
  };

  const toggleSwatch = (name: string) => {
    setCheckedSwatches((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const activeFilterCount =
    Object.values(checkedFacets).reduce((n, s) => n + s.size, 0) +
    checkedSwatches.size +
    (minPrice !== filterSet.range.min || maxPrice !== filterSet.range.max ? 1 : 0);

  const clearFilters = () => {
    setMinPrice(filterSet.range.min);
    setMaxPrice(filterSet.range.max);
    setCheckedFacets({});
    setCheckedSwatches(new Set());
  };

  /** Build a haystack string for a product (name + description + specs).
   *  Memoised per render via inline call — small dataset so cost is fine. */
  const productHaystack = (p: (typeof baseList)[number]) =>
    [p.name, p.description, ...p.specs.map((s) => `${s.label} ${s.value}`)]
      .join(" ")
      .toLowerCase();

  /** Does this product satisfy the given facet selection?
   *  Matches "any selected option" against the haystack. */
  const productMatchesFacet = (
    p: (typeof baseList)[number],
    options: Set<string>,
  ) => {
    if (options.size === 0) return true;
    const haystack = productHaystack(p);
    return Array.from(options).some((opt) => {
      const token = opt.split(/[—–-]/)[0].trim().toLowerCase();
      return haystack.includes(token);
    });
  };

  /** Does this product satisfy the colour swatch selection? */
  const productMatchesSwatches = (
    p: (typeof baseList)[number],
    selectedNames: Set<string>,
  ) => {
    if (selectedNames.size === 0) return true;
    const swatchOpts = filterSet.swatches?.options ?? [];
    const selectedHexes = new Set(
      swatchOpts
        .filter((o) => selectedNames.has(o.name))
        .map((o) => o.swatch.toLowerCase()),
    );
    const productColors = (p.colors ?? []).map((c) => c.toLowerCase());
    const nameMatch = Array.from(selectedNames).some((n) =>
      p.name.toLowerCase().includes(n.toLowerCase()),
    );
    const hexMatch = productColors.some((c) => selectedHexes.has(c));
    return nameMatch || hexMatch;
  };

  /** Apply ALL active filters; optionally exclude one facet from consideration
   *  (used to compute "would-be" counts for that facet's own options). */
  const productPasses = (
    p: (typeof baseList)[number],
    excludeFacetTitle?: string,
    excludeSwatches = false,
  ) => {
    if (p.price < minPrice || p.price > maxPrice) return false;
    for (const [title, options] of Object.entries(checkedFacets)) {
      if (title === excludeFacetTitle) continue;
      if (!productMatchesFacet(p, options)) return false;
    }
    if (!excludeSwatches && !productMatchesSwatches(p, checkedSwatches)) return false;
    return true;
  };

  /** Final filtered list. */
  const list = useMemo(
    () => baseList.filter((p) => productPasses(p)),
    // productPasses depends on baseList + filter state via closure
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseList, minPrice, maxPrice, checkedFacets, checkedSwatches, filterSet],
  );

  /** Live, dependent counts:
   *  - For each facet, count products that pass ALL OTHER filters
   *    AND match this single option. (Standard "non-self-filtering" pattern.)
   *  - Options with 0 results are dimmed and disabled (unless already checked,
   *    so users can always uncheck their own selection). */
  const dependentCounts = useMemo(() => {
    const checkCounts: Record<string, Record<string, number>> = {};
    for (const facet of filterSet.checks) {
      const candidates = baseList.filter((p) => productPasses(p, facet.title));
      const counts: Record<string, number> = {};
      for (const opt of facet.options) {
        const single = new Set([opt.name]);
        counts[opt.name] = candidates.filter((p) => productMatchesFacet(p, single)).length;
      }
      checkCounts[facet.title] = counts;
    }

    const swatchCounts: Record<string, number> = {};
    if (filterSet.swatches) {
      const candidates = baseList.filter((p) => productPasses(p, undefined, true));
      for (const opt of filterSet.swatches.options) {
        const single = new Set([opt.name]);
        swatchCounts[opt.name] = candidates.filter((p) =>
          productMatchesSwatches(p, single),
        ).length;
      }
    }
    return { checkCounts, swatchCounts };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseList, minPrice, maxPrice, checkedFacets, checkedSwatches, filterSet]);

  useEffect(() => {
    const name = cat?.name ?? "Lighting";
    document.title = `${name} — Abitaz`;
    const desc = `Shop ${name.toLowerCase()} at Abitaz. Real stock, fast delivery and honest prices.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [cat]);

  const sorted = useMemo(() => {
    const copy = [...list];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [list, sort]);

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        {/* Header row: breadcrumb + title stacked on the left,
            slim promo banner on the right (desktop only) — banner top
            aligns with the breadcrumb. */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="lg:w-[260px] lg:flex-none">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
              <ol className="flex items-center gap-2">
                <li><a href="/" className="hover:text-primary">Home</a></li>
                <li aria-hidden>/</li>
                <li><a href="/category/pendant-lamps" className="hover:text-primary">Lighting</a></li>
                <li aria-hidden>/</li>
                <li className="text-foreground">{cat?.name ?? "Pendant lamps"}</li>
              </ol>
            </nav>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              {cat?.name ?? "Pendant lamps"}
            </h1>
          </div>
          <Link
            to="/sale"
            aria-label="Winter Sale — up to 45% off designer lighting"
            className="group relative hidden flex-1 overflow-hidden rounded-lg bg-primary text-primary-foreground shadow-sm lg:block"
          >
            <img
              src={promoDesigner}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/30" />
            <div className="relative flex h-full items-center justify-between gap-4 px-5">
              <div className="flex items-center gap-3">
                <span className="rounded-sm bg-cta px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-cta-foreground">
                  Winter Sale
                </span>
                <span className="font-display text-xl font-bold leading-tight">
                  Up to -45% on designer lighting
                </span>
              </div>
              <span className="rounded-md bg-background/15 px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-primary-foreground/30 transition group-hover:bg-background/25">
                Shop the sale
              </span>
            </div>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* ---------- Mobile filter trigger (opens bottom sheet) ---------- */}
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground lg:hidden"
              >
                <span className="inline-flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1.5 text-[11px] font-semibold text-cta-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {sorted.length} products
                </span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="flex h-[88vh] flex-col gap-0 rounded-t-xl p-0"
            >
              {/* Sticky header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Filters</h2>
                  {activeFilterCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {activeFilterCount} active
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Close filters"
                    className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable filter body */}
              <div className="min-h-0 flex-1 overflow-y-auto px-5">
                <FilterSection title={filterSet.range.title}>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      min={filterSet.range.min}
                      max={maxPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value) || filterSet.range.min)}
                      className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                      aria-label={`Min ${filterSet.range.title.toLowerCase()}`}
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="number"
                      value={maxPrice}
                      min={minPrice}
                      max={filterSet.range.max}
                      onChange={(e) => setMaxPrice(Number(e.target.value) || filterSet.range.max)}
                      className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm"
                      aria-label={`Max ${filterSet.range.title.toLowerCase()}`}
                    />
                  </div>
                </FilterSection>

                {filterSet.checks.map((facet) => (
                  <FilterSection key={facet.title} title={facet.title}>
                    {facet.options.map((o) => {
                      const isChecked = checkedFacets[facet.title]?.has(o.name) ?? false;
                      const liveCount = dependentCounts.checkCounts[facet.title]?.[o.name] ?? 0;
                      const disabled = liveCount === 0 && !isChecked;
                      return (
                        <label
                          key={o.name}
                          className={`flex items-center gap-3 py-1 ${
                            disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => toggleFacet(facet.title, o.name)}
                            className="h-4 w-4 rounded border-input text-primary disabled:cursor-not-allowed"
                          />
                          <span>{o.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">({liveCount})</span>
                        </label>
                      );
                    })}
                  </FilterSection>
                ))}

                {filterSet.swatches && (
                  <FilterSection title={filterSet.swatches.title}>
                    {filterSet.swatches.options.map((c) => {
                      const isChecked = checkedSwatches.has(c.name);
                      const liveCount = dependentCounts.swatchCounts[c.name] ?? 0;
                      const disabled = liveCount === 0 && !isChecked;
                      return (
                        <label
                          key={c.name}
                          className={`flex items-center gap-3 py-1 ${
                            disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={disabled}
                            onChange={() => toggleSwatch(c.name)}
                            className="h-4 w-4 rounded border-input text-primary disabled:cursor-not-allowed"
                          />
                          <span
                            className="h-4 w-6 rounded-sm border border-border"
                            style={{ backgroundColor: c.swatch }}
                            aria-hidden
                          />
                          <span>{c.name}</span>
                          <span className="ml-auto text-xs text-muted-foreground">({liveCount})</span>
                      </label>
                      );
                    })}
                  </FilterSection>
                )}
              </div>

              {/* Sticky footer with Clear + Apply (results count) */}
              <div className="flex items-center gap-3 border-t border-border bg-background px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  disabled={activeFilterCount === 0}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="flex-[2] bg-cta text-cta-foreground hover:bg-cta-hover"
                >
                  Show {sorted.length} {sorted.length === 1 ? "product" : "products"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* ---------- Desktop sidebar ---------- */}
          <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
            <details open className="border-b border-border py-4">
              <summary className="cursor-pointer text-sm font-semibold">Categories</summary>
              <ul className="mt-3 space-y-3 text-sm">
                <li className="font-semibold text-primary">{activeGroup.name}</li>
                {categoryTree.map((group) => {
                  const isActiveGroup =
                    group.slug === slug || group.subs.some((s) => s.slug === slug);
                  return (
                    <li key={group.slug} className="ml-3">
                      <Link
                        to={`/category/${group.slug}`}
                        aria-current={group.slug === slug ? "page" : undefined}
                        className={
                          group.slug === slug
                            ? "font-semibold text-primary"
                            : "font-medium text-foreground hover:text-primary"
                        }
                      >
                        {group.name}
                      </Link>
                      {/* Auto-expand the group that contains the active page */}
                      {isActiveGroup && (
                        <ul className="ml-3 mt-1.5 space-y-1.5 text-muted-foreground">
                          {group.subs.map((s) => (
                            <li key={s.slug}>
                              <Link
                                to={`/category/${s.slug}`}
                                aria-current={s.slug === slug ? "page" : undefined}
                                className={
                                  s.slug === slug
                                    ? "font-semibold text-primary"
                                    : "hover:text-primary"
                                }
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </details>

            <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filters
            </h2>
            {activeFilterCount > 0 && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {activeFilterCount} active
                </span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-semibold text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}

            <FilterSection title={filterSet.range.title}>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={minPrice}
                  min={filterSet.range.min}
                  max={maxPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value) || filterSet.range.min)}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  aria-label={`Min ${filterSet.range.title.toLowerCase()}`}
                />
                <span className="text-muted-foreground">to</span>
                <input
                  type="number"
                  value={maxPrice}
                  min={minPrice}
                  max={filterSet.range.max}
                  onChange={(e) => setMaxPrice(Number(e.target.value) || filterSet.range.max)}
                  className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm"
                  aria-label={`Max ${filterSet.range.title.toLowerCase()}`}
                />
              </div>
            </FilterSection>

            {filterSet.checks.map((facet) => (
              <FilterSection key={facet.title} title={facet.title}>
                {facet.options.map((o) => {
                  const isChecked = checkedFacets[facet.title]?.has(o.name) ?? false;
                  const liveCount = dependentCounts.checkCounts[facet.title]?.[o.name] ?? 0;
                  const disabled = liveCount === 0 && !isChecked;
                  return (
                    <label
                      key={o.name}
                      className={`flex items-center gap-2 ${
                        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        onChange={() => toggleFacet(facet.title, o.name)}
                        className="h-4 w-4 rounded border-input text-primary disabled:cursor-not-allowed"
                      />
                      <span>{o.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">({liveCount})</span>
                    </label>
                  );
                })}
              </FilterSection>
            ))}

            {filterSet.swatches && (
              <FilterSection title={filterSet.swatches.title}>
                {filterSet.swatches.options.map((c) => {
                  const isChecked = checkedSwatches.has(c.name);
                  const liveCount = dependentCounts.swatchCounts[c.name] ?? 0;
                  const disabled = liveCount === 0 && !isChecked;
                  return (
                    <label
                      key={c.name}
                      className={`flex items-center gap-2 ${
                        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={disabled}
                        onChange={() => toggleSwatch(c.name)}
                        className="h-4 w-4 rounded border-input text-primary disabled:cursor-not-allowed"
                      />
                      <span
                        className="h-4 w-6 rounded-sm border border-border"
                        style={{ backgroundColor: c.swatch }}
                        aria-hidden
                      />
                      <span>{c.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">({liveCount})</span>
                    </label>
                  );
                })}
              </FilterSection>
            )}
          </aside>

          {/* Product grid */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{sorted.length} products</span>
              <label className="flex items-center gap-2 text-sm">
                Sort by
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {sorted.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Category;