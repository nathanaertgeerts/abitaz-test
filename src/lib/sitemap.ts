/**
 * Canonical sitemap for Abitaz — single source of truth used by:
 *   - /sitemap page (dev & designer hand-off)
 *   - skeleton pages (status badges)
 *   - future: XML sitemap generation
 *
 * Status legend:
 *   "done"      — page is built and production-ready
 *   "skeleton"  — placeholder shipped (this PR), structure ready, content TBD
 *   "planned"   — not yet implemented; referenced for roadmap visibility
 *   "cms"       — content driven by CMS, uses a shared template
 */
export type PageStatus = "done" | "skeleton" | "planned" | "cms";

export type SitemapNode = {
  label: string;
  path?: string;
  status: PageStatus;
  note?: string;
  children?: SitemapNode[];
};

export type SitemapSection = {
  id: string;
  title: string;
  description: string;
  nodes: SitemapNode[];
};

/**
 * v2 conventions (locale-normalized):
 *  - All user-facing routes are prefixed `/[locale]/…` where
 *    [locale] ∈ { nl, fr, en, de, it, es }. Resolved by middleware
 *    (cookie → Accept-Language → fallback).
 *  - Language-neutral system files (`/sitemap.xml`, `/robots.txt`)
 *    live at the domain root, no locale prefix.
 *  - Dynamic segments use Next.js bracket syntax (`[slug]`, `[id]`).
 *  - Plural-nest: every collection's detail nests under its plural
 *    index — `/categories/[slug]`, `/brands/[slug]`, `/rooms/[slug]`,
 *    `/products/[slug]`.
 */
export const conventions = {
  locales: ["nl", "fr", "en", "de", "it", "es"] as const,
  localePrefix: "/[locale]",
  dynamicSegmentSyntax: "[slug] / [id]" as const,
  pluralNest: true,
};

export const changelog = [
  "Added `/[locale]` prefix to every user-facing route; kept `/sitemap.xml` & `/robots.txt` language-neutral at root.",
  "`/category/[slug]` → `/categories/[slug]` (plural-nest convention).",
  "`/product/[slug]` → `/products/[slug]` to match `/api/products/[slug]`.",
  "`/order-confirmation` → `/checkout/return` (XL HUB redirect + polling). Pending Stripe-vs-Mollie decision.",
  "Collapsed duplicate `/account/wishlist` into the single canonical `/wishlist`.",
  "Converted dynamic segments from `:slug` to Next.js bracket syntax (`[slug]`, `[id]`).",
  "Annotated `/new`, `/best-sellers`, `/sale` as CategoryTemplate queries rather than bespoke pages.",
  "Linked `/track-order` into the guest lookup; pointed the `/pro` CTA at `/signup/b2b`.",
  "Reworded XML-sitemap note: dynamic slug enumeration + per-locale hreflang required.",
];

export const sitemap: SitemapSection[] = [
  {
    id: "shop",
    title: "Shop",
    description:
      "The commercial heart of the site. Every category, brand, room and curated edit lives here and reuses the same listing template so CMS-driven additions need zero new dev.",
    nodes: [
      { label: "Home", path: "/[locale]/", status: "done" },
      {
        label: "Categories",
        path: "/[locale]/categories",
        status: "done",
        children: [
          {
            label: "Category template (PLP)",
            path: "/[locale]/categories/[slug]",
            status: "cms",
            note:
              "Shared CategoryTemplate — facets, breadcrumb, hero banner, SEO copy. Any new CMS category fits this shell.",
          },
        ],
      },
      {
        label: "Brands",
        path: "/[locale]/brands",
        status: "done",
        children: [
          {
            label: "Brand template",
            path: "/[locale]/brands/[slug]",
            status: "cms",
            note:
              "Reused for every brand. CMS controls hero, story, banner, featured collections.",
          },
        ],
      },
      {
        label: "Shop by room",
        path: "/[locale]/rooms",
        status: "skeleton",
        note: "Top e-commerce best practice — convert browsers who think in spaces, not categories.",
        children: [
          { label: "Room template", path: "/[locale]/rooms/[slug]", status: "cms", note: "Reuses CategoryTemplate." },
          { label: "Living room", path: "/[locale]/rooms/living-room", status: "cms" },
          { label: "Dining room", path: "/[locale]/rooms/dining-room", status: "cms" },
          { label: "Kitchen", path: "/[locale]/rooms/kitchen", status: "cms" },
          { label: "Bedroom", path: "/[locale]/rooms/bedroom", status: "cms" },
          { label: "Bathroom", path: "/[locale]/rooms/bathroom", status: "cms" },
          { label: "Home office", path: "/[locale]/rooms/home-office", status: "cms" },
          { label: "Hallway", path: "/[locale]/rooms/hallway", status: "cms" },
          { label: "Kids room", path: "/[locale]/rooms/kids-room", status: "cms" },
          { label: "Outdoor", path: "/[locale]/rooms/outdoor", status: "cms" },
        ],
      },
      {
        label: "Inspiration & lookbook",
        path: "/[locale]/inspiration",
        status: "skeleton",
        note:
          "Editorial grid: room scenes, designer projects, shoppable hotspots. Drives time-on-site + SEO.",
        children: [
          { label: "Inspiration story", path: "/[locale]/inspiration/[slug]", status: "cms" },
        ],
      },
      { label: "New arrivals", path: "/[locale]/new", status: "skeleton", note: "CategoryTemplate with a `new` query — not a bespoke page." },
      { label: "Best sellers", path: "/[locale]/best-sellers", status: "skeleton", note: "CategoryTemplate with a best-seller sort/query." },
      { label: "Sale", path: "/[locale]/sale", status: "done", note: "CategoryTemplate with an on-sale facet." },
      { label: "Gift cards", path: "/[locale]/gift-cards", status: "skeleton" },
      {
        label: "Search results",
        path: "/[locale]/search",
        status: "done",
        note: "Typeahead lives in Header; this is the full results page.",
      },
    ],
  },
  {
    id: "product",
    title: "Product & purchase flow",
    description: "The buying funnel — already built and battle-tested.",
    nodes: [
      { label: "Product detail (PDP)", path: "/[locale]/products/[slug]", status: "done", note: "Renamed from `/product/[slug]` — now matches the `/api/products/[slug]` endpoint." },
      { label: "Cart", path: "/[locale]/cart", status: "done" },
      { label: "Checkout", path: "/[locale]/checkout", status: "done" },
      {
        label: "Checkout return / confirmation",
        path: "/[locale]/checkout/return",
        status: "done",
        note:
          "Replaces `/order-confirmation`. XL HUB redirect `/[locale]/checkout/return?orderId=…` with payment-status polling. DECISION NEEDED: Stripe (client-secret confirm + poll) vs Mollie (redirect + webhook) — finalize provider before locking. May redirect to a clean `/[locale]/order-confirmation` on success.",
      },
      {
        label: "Wishlist",
        path: "/[locale]/wishlist",
        status: "skeleton",
        note: "Single canonical route. Logged-out: localStorage. Logged-in: synced to account; the account nav links here. (Old `/account/wishlist` folded in.)",
      },
      {
        label: "Compare products",
        path: "/[locale]/compare",
        status: "planned",
        note: "Side-by-side specs — high value for technical buyers (drivers, fixtures, smart bulbs).",
      },
    ],
  },
  {
    id: "account",
    title: "My account",
    description:
      "Self-service hub. OTP-only auth (no passwords) via Jef's xl_otp Odoo module. Three signup paths from /login. Sessions are 30-day iron-session cookies.",
    nodes: [
      { label: "Sign in (OTP request)", path: "/[locale]/login", status: "skeleton", note: "3 buttons: Inloggen · Particulier · B2B." },
      { label: "OTP code entry", path: "/[locale]/login/otp", status: "skeleton", note: "6-digit code, 10 min TTL, 5 attempts." },
      { label: "Signup — Particulier (B2C)", path: "/[locale]/signup/particulier", status: "skeleton", note: "Name + email → OTP. res.partner without VAT, public pricelist." },
      { label: "Signup — B2B", path: "/[locale]/signup/b2b", status: "skeleton", note: "Company + VAT + email → OTP. 'B2B Pending' pricelist, manual approval in Odoo." },
      { label: "Account overview", path: "/[locale]/account", status: "skeleton" },
      { label: "Orders", path: "/[locale]/account/orders", status: "skeleton" },
      { label: "Order detail", path: "/[locale]/account/orders/[id]", status: "planned" },
      { label: "Addresses", path: "/[locale]/account/addresses", status: "skeleton" },
      { label: "Payment methods", path: "/[locale]/account/payment-methods", status: "planned", note: "Depends on saved cards — XL HUB v3 marks out-of-scope. Gated on that decision." },
      { label: "Returns (link to Odoo portal)", path: "/[locale]/account/returns", status: "skeleton", note: "MVP: deep-link to Odoo portal. Own RMA UI is follow-up." },
      { label: "Preferences", path: "/[locale]/account/preferences", status: "planned" },
      { label: "Guest order lookup", path: "/[locale]/orders/[id]", status: "planned", note: "Public, HMAC-token in query (?token=…), 1y TTL. No login required. `/track-order` resolves into this route." },
    ],
  },
  {
    id: "service",
    title: "Customer service",
    description:
      "Trust & support pages. Linked from the footer, checkout, PDP and confirmation email. Must be live before launch.",
    nodes: [
      { label: "Help center", path: "/[locale]/help", status: "skeleton" },
      { label: "FAQ", path: "/[locale]/faq", status: "skeleton" },
      { label: "Contact", path: "/[locale]/contact", status: "skeleton" },
      { label: "Delivery", path: "/[locale]/delivery", status: "skeleton" },
      { label: "Returns policy", path: "/[locale]/returns", status: "skeleton" },
      { label: "Warranty", path: "/[locale]/warranty", status: "skeleton" },
      { label: "Track my order", path: "/[locale]/track-order", status: "skeleton", note: "Resolves into the guest lookup `/[locale]/orders/[id]?token=…` — not a standalone tracker." },
      { label: "Size & spec guide", path: "/[locale]/guides/size-spec", status: "planned" },
      { label: "Light planner / advice", path: "/[locale]/guides/lighting-planner", status: "planned" },
    ],
  },
  {
    id: "trade",
    title: "Trade & B2B",
    description:
      "Lighting designers, electricians, architects. Distinct funnel — bulk pricing, projects, quotes.",
    nodes: [
      { label: "Pro program", path: "/[locale]/pro", status: "skeleton", note: "Primary CTA → `/[locale]/signup/b2b`, connecting the trade funnel to the B2B auth path." },
      { label: "Request a quote", path: "/[locale]/pro/quote", status: "planned" },
      { label: "Project orders", path: "/[locale]/pro/projects", status: "planned" },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Brand storytelling, recruitment, press.",
    nodes: [
      { label: "About Abitaz", path: "/[locale]/about", status: "skeleton" },
      { label: "Sustainability", path: "/[locale]/sustainability", status: "skeleton" },
      { label: "Careers", path: "/[locale]/careers", status: "skeleton" },
      { label: "Press", path: "/[locale]/press", status: "skeleton" },
      { label: "Stores / showroom", path: "/[locale]/stores", status: "skeleton" },
      { label: "Blog", path: "/[locale]/blog", status: "skeleton" },
      { label: "Blog post", path: "/[locale]/blog/[slug]", status: "cms" },
    ],
  },
  {
    id: "legal",
    title: "Legal & policies",
    description: "Required for EU compliance.",
    nodes: [
      { label: "Terms & conditions", path: "/[locale]/terms", status: "skeleton" },
      { label: "Privacy policy", path: "/[locale]/privacy", status: "skeleton" },
      { label: "Cookie policy", path: "/[locale]/cookies", status: "skeleton" },
      { label: "Imprint", path: "/[locale]/imprint", status: "planned" },
    ],
  },
  {
    id: "system",
    title: "System & utility",
    description: "Not in main nav. The two language-neutral files below are not locale-prefixed — they live at the domain root.",
    nodes: [
      { label: "404 Not found", path: "*", status: "done", note: "Catch-all, rendered within `/[locale]` (and at root for unprefixed misses)." },
      { label: "Sitemap (this page)", path: "/[locale]/sitemap", status: "done" },
      {
        label: "XML sitemap",
        path: "/sitemap.xml",
        status: "planned",
        note:
          "Root-level, language-neutral. Not purely derivable from this tree: static routes come from the tree, but every dynamic `[slug]` (categories, brands, rooms, inspiration, blog, products) must be enumerated from Payload/PIM at build/request time. Each URL also needs hreflang alternates for all six locales (+ x-default).",
      },
      { label: "robots.txt", path: "/robots.txt", status: "done" },
    ],
  },
];

/* ---------- Helpers ---------- */

export const statusMeta: Record<
  PageStatus,
  { label: string; tone: "success" | "warn" | "muted" | "info" }
> = {
  done: { label: "Built", tone: "success" },
  skeleton: { label: "Skeleton", tone: "info" },
  planned: { label: "Planned", tone: "warn" },
  cms: { label: "CMS-driven", tone: "muted" },
};

export const findNode = (path: string): SitemapNode | undefined => {
  const walk = (nodes: SitemapNode[]): SitemapNode | undefined => {
    for (const n of nodes) {
      if (n.path === path) return n;
      if (n.children) {
        const hit = walk(n.children);
        if (hit) return hit;
      }
    }
    return undefined;
  };
  for (const section of sitemap) {
    const hit = walk(section.nodes);
    if (hit) return hit;
  }
  return undefined;
};

export const countByStatus = () => {
  const counts: Record<PageStatus, number> = { done: 0, skeleton: 0, planned: 0, cms: 0 };
  const walk = (nodes: SitemapNode[]) =>
    nodes.forEach((n) => {
      counts[n.status] += 1;
      if (n.children) walk(n.children);
    });
  sitemap.forEach((s) => walk(s.nodes));
  return counts;
};