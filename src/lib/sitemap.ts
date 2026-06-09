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

export const sitemap: SitemapSection[] = [
  {
    id: "shop",
    title: "Shop",
    description:
      "The commercial heart of the site. Every category, brand, room and curated edit lives here and reuses the same listing template so CMS-driven additions need zero new dev.",
    nodes: [
      { label: "Home", path: "/", status: "done" },
      {
        label: "Categories",
        path: "/categories",
        status: "done",
        children: [
          {
            label: "Category template (PLP)",
            path: "/category/:slug",
            status: "cms",
            note:
              "Shared CategoryTemplate — facets, breadcrumb, hero banner, SEO copy. Any new CMS category fits this shell.",
          },
        ],
      },
      {
        label: "Brands",
        path: "/brands",
        status: "done",
        children: [
          {
            label: "Brand template",
            path: "/brands/:slug",
            status: "cms",
            note:
              "Reused for every brand. CMS controls hero, story, banner, featured collections.",
          },
        ],
      },
      {
        label: "Shop by room",
        path: "/rooms",
        status: "skeleton",
        note: "Top e-commerce best practice — convert browsers who think in spaces, not categories.",
        children: [
          { label: "Room template", path: "/rooms/:slug", status: "cms", note: "Reuses CategoryTemplate." },
          { label: "Living room", path: "/rooms/living-room", status: "cms" },
          { label: "Dining room", path: "/rooms/dining-room", status: "cms" },
          { label: "Kitchen", path: "/rooms/kitchen", status: "cms" },
          { label: "Bedroom", path: "/rooms/bedroom", status: "cms" },
          { label: "Bathroom", path: "/rooms/bathroom", status: "cms" },
          { label: "Home office", path: "/rooms/home-office", status: "cms" },
          { label: "Hallway", path: "/rooms/hallway", status: "cms" },
          { label: "Kids room", path: "/rooms/kids-room", status: "cms" },
          { label: "Outdoor", path: "/rooms/outdoor", status: "cms" },
        ],
      },
      {
        label: "Inspiration & lookbook",
        path: "/inspiration",
        status: "skeleton",
        note:
          "Editorial grid: room scenes, designer projects, shoppable hotspots. Drives time-on-site + SEO.",
        children: [
          { label: "Inspiration story", path: "/inspiration/:slug", status: "cms" },
        ],
      },
      { label: "New arrivals", path: "/new", status: "skeleton" },
      { label: "Best sellers", path: "/best-sellers", status: "skeleton" },
      { label: "Sale", path: "/sale", status: "done" },
      { label: "Gift cards", path: "/gift-cards", status: "skeleton" },
      {
        label: "Search results",
        path: "/search",
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
      { label: "Product detail (PDP)", path: "/product/:slug", status: "done" },
      { label: "Cart", path: "/cart", status: "done" },
      { label: "Checkout", path: "/checkout", status: "done" },
      { label: "Order confirmation", path: "/order-confirmation", status: "done" },
      {
        label: "Wishlist",
        path: "/wishlist",
        status: "skeleton",
        note: "Logged-out: localStorage. Logged-in: synced to account.",
      },
      {
        label: "Compare products",
        path: "/compare",
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
      { label: "Sign in (OTP request)", path: "/login", status: "skeleton", note: "3 buttons: Inloggen · Particulier · B2B." },
      { label: "OTP code entry", path: "/login/otp", status: "skeleton", note: "6-digit code, 10 min TTL, 5 attempts." },
      { label: "Signup — Particulier (B2C)", path: "/signup/particulier", status: "skeleton", note: "Name + email → OTP. res.partner without VAT, public pricelist." },
      { label: "Signup — B2B", path: "/signup/b2b", status: "skeleton", note: "Company + VAT + email → OTP. 'B2B Pending' pricelist, manual approval in Odoo." },
      { label: "Account overview", path: "/account", status: "skeleton" },
      { label: "Orders", path: "/account/orders", status: "skeleton" },
      { label: "Order detail", path: "/account/orders/:id", status: "planned" },
      { label: "Addresses", path: "/account/addresses", status: "skeleton" },
      { label: "Payment methods", path: "/account/payment-methods", status: "planned" },
      { label: "Returns (link to Odoo portal)", path: "/account/returns", status: "skeleton", note: "MVP: deep-link to Odoo portal. Own RMA UI is follow-up." },
      { label: "Wishlist (account)", path: "/account/wishlist", status: "planned" },
      { label: "Preferences", path: "/account/preferences", status: "planned" },
      { label: "Guest order lookup", path: "/orders/:id", status: "planned", note: "Public, HMAC-token in query (?token=…), 1y TTL. No login required." },
    ],
  },
  {
    id: "service",
    title: "Customer service",
    description:
      "Trust & support pages. Linked from the footer, checkout, PDP and confirmation email. Must be live before launch.",
    nodes: [
      { label: "Help center", path: "/help", status: "skeleton" },
      { label: "FAQ", path: "/faq", status: "skeleton" },
      { label: "Contact", path: "/contact", status: "skeleton" },
      { label: "Delivery", path: "/delivery", status: "skeleton" },
      { label: "Returns policy", path: "/returns", status: "skeleton" },
      { label: "Warranty", path: "/warranty", status: "skeleton" },
      { label: "Track my order", path: "/track-order", status: "skeleton" },
      { label: "Size & spec guide", path: "/guides/size-spec", status: "planned" },
      { label: "Light planner / advice", path: "/guides/lighting-planner", status: "planned" },
    ],
  },
  {
    id: "trade",
    title: "Trade & B2B",
    description:
      "Lighting designers, electricians, architects. Distinct funnel — bulk pricing, projects, quotes.",
    nodes: [
      { label: "Pro program", path: "/pro", status: "skeleton" },
      { label: "Request a quote", path: "/pro/quote", status: "planned" },
      { label: "Project orders", path: "/pro/projects", status: "planned" },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Brand storytelling, recruitment, press.",
    nodes: [
      { label: "About Abitaz", path: "/about", status: "skeleton" },
      { label: "Sustainability", path: "/sustainability", status: "skeleton" },
      { label: "Careers", path: "/careers", status: "skeleton" },
      { label: "Press", path: "/press", status: "skeleton" },
      { label: "Stores / showroom", path: "/stores", status: "skeleton" },
      { label: "Blog", path: "/blog", status: "skeleton" },
      { label: "Blog post", path: "/blog/:slug", status: "cms" },
    ],
  },
  {
    id: "legal",
    title: "Legal & policies",
    description: "Required for EU compliance.",
    nodes: [
      { label: "Terms & conditions", path: "/terms", status: "skeleton" },
      { label: "Privacy policy", path: "/privacy", status: "skeleton" },
      { label: "Cookie policy", path: "/cookies", status: "skeleton" },
      { label: "Imprint", path: "/imprint", status: "planned" },
    ],
  },
  {
    id: "system",
    title: "System & utility",
    description: "Not in main nav.",
    nodes: [
      { label: "404 Not found", path: "*", status: "done" },
      { label: "Sitemap (this page)", path: "/sitemap", status: "done" },
      { label: "XML sitemap", path: "/sitemap.xml", status: "planned", note: "For Google. Auto-generated from this tree." },
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