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
 * v3.1 conventions (locale-normalized + locked decisions):
 *  - All user-facing routes are prefixed `/[locale]/…` where
 *    [locale] ∈ { nl, fr, en, de, it, es }. Resolved by middleware
 *    (cookie `NEXT_LOCALE` → Accept-Language → DEFAULT_LOCALE).
 *  - DEFAULT_LOCALE = nl. Root `/` → 307 to resolved locale, NOT indexed.
 *  - `x-default` hreflang → `/nl/` until a neutral locale switcher exists.
 *  - Language-neutral system files (`/sitemap.xml`, `/robots.txt`)
 *    live at the domain root, no locale prefix.
 *  - Dynamic segments use Next.js bracket syntax (`[slug]`, `[id]`).
 *  - Plural-nest: every collection's detail nests under its plural
 *    index — `/categories/[slug]`, `/brands/[slug]`, `/rooms/[slug]`,
 *    `/collections/[slug]`, `/products/[slug]`.
 *  - Per-locale slugs (D2): CMS authors a slug per locale per record;
 *    resolver maps (locale, localizedSlug) → id; hreflang pairs the
 *    localized URLs. Slug change emits a 301 from the old localized slug.
 *  - Faceted-PLP policy (D4): clean PLP is canonical & indexable;
 *    `?filter/?sort` variants → canonical to clean PLP + noindex,follow.
 *    Pagination `?page=N` keeps self-canonicals and stays indexable.
 *  - Template governance (D5): Category = taxonomy (PIM), Collection =
 *    curated merchandising (Payload), Room = spatial intent. One
 *    indexable page per search intent; would-be duplicates become a
 *    filter/collection, never a new page.
 */
export const conventions = {
  locales: ["nl", "fr", "en", "de", "it", "es"] as const,
  defaultLocale: "nl" as const,
  localePrefix: "/[locale]",
  dynamicSegmentSyntax: "[slug] / [id]" as const,
  pluralNest: true,
  rootRedirect: "307 → DEFAULT_LOCALE (cookie → Accept-Language → nl), not indexed",
  xDefault: "/nl/",
  localizedSlugs: true,
  facetedPLP: "clean PLP canonical+indexable; ?filter/?sort → canonical to clean + noindex,follow",
};

/**
 * Decisions log — v3.1 (each item closes an open question from v2).
 */
export type Decision = {
  id: string;
  topic: string;
  status: "decided" | "open-deferred";
  summary: string;
};

export const decisions: Decision[] = [
  {
    id: "D1",
    topic: "Payment provider",
    status: "decided",
    summary:
      "Stripe, integrated *through Odoo*. Odoo owns payment.transaction and is the payment authority. FE never calls Stripe directly for state — creates payment via Odoo and polls Odoo order/payment status. 3DS/SCA via Stripe-via-Odoo. GATING: a Stripe-via-Odoo POC must validate the full round-trip (create-payment → payment.transaction → Stripe redirect + 3DS → webhook → status poll → SO confirmed) in staging before P0 build is committed.",
  },
  {
    id: "D2",
    topic: "Localized slugs",
    status: "decided",
    summary:
      "Per-locale slugs, authored in the CMS (e.g. /nl/products/tafellamp-x vs /fr/products/lampe-de-table-x). Requires slug-per-locale map + hreflang pairing of the localized URLs. Changed slug → 301 from old localized slug.",
  },
  {
    id: "D3",
    topic: "Search backend",
    status: "open-deferred",
    summary:
      "Engine choice (Typesense / Meilisearch / Algolia) deferred. Minimum buildable behavior: keyword/prefix match over Postgres-synced PIM (name, SKU, category, brand) + header typeahead + product/categories/brand suggestions + no-results recovery. Pricing from Odoo pricelists. NOT yet: relevance tuning, synonyms, typo-tolerance, faceted ranking. Revisit before catalog scale.",
  },
  {
    id: "D4",
    topic: "Faceted-PLP URL policy",
    status: "decided",
    summary:
      "Clean PLP is canonical and indexable. Filtered/sorted variants (?color=&sort=) carry <link rel=canonical> → clean PLP and noindex,follow. Pagination (?page=N) keeps self-canonicals.",
  },
  {
    id: "D5",
    topic: "Template governance",
    status: "decided",
    summary:
      "Category vs Collection vs Room intent locked. Category = catalog taxonomy (PIM + Odoo). Collection = curated merchandising (Payload selection over PIM/Odoo products), can be temporary. Room = spatial/use-case intent. One primary indexable page per search intent; new top-level listing requires editorial sign-off.",
  },
];

export const changelog = [
  "v3.1 — Added Decisions log (D1–D5) and Build priority (P0–P3) to the doc.",
  "v3.1 — Locked DEFAULT_LOCALE=nl; root `/` → 307 to resolved locale, not indexed; x-default → /nl/.",
  "v3.1 — Faceted PLP policy: clean PLP canonical+indexable; `?filter/?sort` → canonical to clean + noindex,follow.",
  "v3.1 — Added `/[locale]/collections` + `/collections/[slug]` template (Payload-curated, distinct from Category and Room).",
  "v3.1 — Checkout substates: `/checkout/shipping`, `/checkout/payment`, `/checkout/pending`, `/checkout/failed`; retry-pay at `/account/orders/[id]/pay`.",
  "v3.1 — Account: added `/account/orders/[id]/tracking`, `/account/orders/[id]/return`, `/account/invoices`, `/account/invoices/[id]`, `/account/delete-account`.",
  "v3.1 — Pro: added `/pro/apply`, `/pro/bulk-order`, `/pro/spec-sheets`, `/pro/faq`.",
  "v3.1 — Legal: added `/right-of-withdrawal`, `/shipping-policy`, `/accessibility`; renamed info page to `/payment-options` (301 from old `/payment-methods`); account feature stays `/account/payment-methods` (no clash).",
  "v3.1 — System split: `/api/health` (public liveness, no dep detail) vs `/api/internal/health` (protected deep check). Added `/maintenance`, `/500`, `/api/preview/*`.",
  "v3.1 — Localized slugs (D2): per-locale slug authored in CMS; hreflang pairs the localized URLs.",
  "v3.1 — Search (D3) deferred; minimum behavior documented (Postgres-synced PIM keyword).",
  "v2 — Added `/[locale]` prefix to every user-facing route; kept `/sitemap.xml` & `/robots.txt` language-neutral at root.",
  "`/categories/[slug]` → `/categories/[slug]` (plural-nest convention).",
  "`/products/[slug]` → `/products/[slug]` to match `/api/products/[slug]`.",
  "`/order-confirmation` → `/checkout/return` (XL HUB redirect + polling). Pending Stripe-vs-Mollie decision.",
  "Collapsed duplicate `/account/wishlist` into the single canonical `/wishlist`.",
  "Converted dynamic segments from `:slug` to Next.js bracket syntax (`[slug]`, `[id]`).",
  "Annotated `/new`, `/best-sellers`, `/sale` as CategoryTemplate queries rather than bespoke pages.",
  "Linked `/track-order` into the guest lookup; pointed the `/pro` CTA at `/signup/b2b`.",
  "Reworded XML-sitemap note: dynamic slug enumeration + per-locale hreflang required.",
];

/**
 * Build priority — P0 happy-path MVP, then P1 launch surface, then growth/scale.
 */
export type Priority = {
  id: "P0" | "P1" | "P2" | "P3";
  title: string;
  description: string;
  items: string[];
  prework?: string[];
};

export const priorities: Priority[] = [
  {
    id: "P0",
    title: "Happy-path MVP — one customer buys one product, one locale",
    description:
      "Gated on the D1 Stripe-via-Odoo POC. Build and harden this surface before anything else.",
    prework: [
      "D1 Stripe-via-Odoo POC: create-payment → payment.transaction → Stripe redirect + 3DS → webhook → status poll → SO confirmed, end-to-end in staging.",
      "Cart-merge + pricelist-recompute spike: Redis anon cart → Odoo draft on login, with price-shift banner.",
    ],
    items: [
      "Root locale redirect (307) + `/[locale]` home",
      "`/[locale]/categories/[slug]` (PLP) + `/[locale]/products/[slug]` (PDP)",
      "`/[locale]/cart` + `/[locale]/checkout`",
      "`/[locale]/checkout/return` + `/checkout/pending` + `/checkout/failed`",
      "`/[locale]/order-confirmation`",
      "`/[locale]/login` + `/login/otp`",
      "`/[locale]/terms` + `/privacy` + `/cookies` + cookie-consent CMP banner",
      "`/robots.txt` + `/sitemap.xml` + public `/api/health` liveness",
      "API: auth/otp/*, cart/*, checkout/* (create-payment + status poll), webhooks/odoo + /stripe",
    ],
  },
  {
    id: "P1",
    title: "Complete the launch surface",
    description:
      "Returns are promoted to P1 because EU 14-day right of withdrawal requires a return path at launch.",
    items: [
      "`/[locale]/categories`, `/brands`, `/brands/[slug]`, `/search` (D3 minimum behavior)",
      "`/[locale]/signup/particulier`, `/signup/b2b`",
      "`/[locale]/account`, `/account/orders`, `/account/orders/[id]`, `/account/addresses`, `/account/invoices`",
      "`/[locale]/contact`, `/delivery`, `/returns`, `/warranty`, `/track-order`",
      "Returns at launch: `/account/returns` (Odoo portal deep-link), `/account/orders/[id]/return` (handoff), `/right-of-withdrawal`",
      "`/[locale]/payment-options`, `/shipping-policy`, `/imprint`",
      "`/[locale]/orders/[id]` guest lookup (HMAC), `/[locale]/maintenance`",
      "Protected `/api/internal/health` for monitoring",
      "Newsletter double-opt-in + consent-gated analytics layer",
    ],
  },
  {
    id: "P2",
    title: "Commercial growth",
    description: "Editorial, discovery, B2B funnel basics.",
    items: [
      "`/[locale]/rooms` (+[slug] + 9 room pages), `/collections` (+[slug])",
      "`/[locale]/inspiration` (+[slug]), `/new`, `/best-sellers`, `/wishlist`",
      "`/[locale]/guides/*`, `/blog` (+[slug])",
      "`/[locale]/pro`, `/pro/apply`, `/pro/quote`",
      "`/[locale]/account/preferences`, `/account/orders/[id]/tracking`",
    ],
  },
  {
    id: "P3",
    title: "B2B, retention, scale",
    description: "Long-tail features and the search engine decision.",
    items: [
      "`/[locale]/compare`, `/gift-cards`",
      "`/[locale]/pro/projects`, `/pro/bulk-order`, `/pro/spec-sheets`, `/pro/faq`",
      "`/[locale]/account/delete-account`, `/account/orders/[id]/pay`",
      "Own RMA UI (replaces P1 Odoo portal handoff)",
      "`/[locale]/accessibility`",
      "Search engine decision + implementation (D3)",
      "Reviews, back-in-stock alerts, price-drop alerts, loyalty/referral",
    ],
  },
];

/**
 * Cross-cutting concerns — components/flows, not single pages, but launch-relevant.
 */
export const crossCutting = [
  {
    id: "cmp",
    title: "Cookie consent / CMP",
    severity: "launch-blocker",
    body:
      "Banner gates non-essential cookies BEFORE they fire. Categories: essential / analytics / marketing — granular accept/reject. Persistent 'cookie settings' entry, re-prompt on policy change. Analytics and marketing pixels only load post-consent. BE/EU requirement.",
  },
  {
    id: "analytics",
    title: "Analytics / event layer (consent-gated)",
    severity: "launch",
    body:
      "Single event taxonomy: view_item, add_to_cart, begin_checkout, purchase, … Fires only after consent. Server-side `purchase` reads the Odoo-confirmed order, not optimistic client state — avoids over-counting on retries / polling.",
  },
  {
    id: "newsletter",
    title: "Newsletter — double opt-in",
    severity: "launch",
    body:
      "POST /api/newsletter/subscribe creates a pending subscription + confirmation mail. GET /api/newsletter/confirm?token=… activates. Required for compliant EU marketing consent; tie the flag to res.partner / preferences.",
  },
  {
    id: "pool",
    title: "Postgres connection pooling",
    severity: "infra",
    body:
      "PgBouncer sidecar + a connection budget. Next.js serverless + price-sync cron + Payload + Odoo RPC all hit Postgres — guard against exhaustion and concurrent-write contention.",
  },
  {
    id: "health",
    title: "Health endpoint split",
    severity: "infra",
    body:
      "Public `/api/health` returns liveness only (is the app up?) with NO dependency detail — exposing Odoo/Stripe/DB health publicly is an information leak. Deep dependency checks live behind protected `/api/internal/health` for uptime monitoring.",
  },
  {
    id: "guest-boundaries",
    title: "Guest order-lookup boundaries",
    severity: "security",
    body:
      "Single-order HMAC token (?token=…, 1-year TTL, multi-use). Visible: this order only (status, lines, totals, tracking, address on the order). NOT visible: any other order, account data, saved cards, PII beyond this order. No mutations from the token alone — sensitive actions (start a return, change address) require OTP step-up to elevate guest → authenticated. Token scope = exactly one orderId (no enumeration). Rate-limit lookups per token/IP. Odoo record rule still enforces ownership server-side.",
  },
];

export const sitemap: SitemapSection[] = [
  {
    id: "shop",
    title: "Shop",
    description:
      "The commercial heart of the site. Every category, brand, room and curated edit lives here and reuses the same listing template so CMS-driven additions need zero new dev.",
    nodes: [
      { label: "Home", path: "/[locale]/", status: "done", note: "Hybrid: Payload homepage blocks/hero + PIM/Odoo featured product modules." },
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
              "D5 Category = catalog taxonomy. Owners: Payload (hero/SEO copy) + PIM (taxonomy/products/slugs) + Odoo (price/stock). D4 faceted-PLP policy applies: clean PLP canonical+indexable; ?filter/?sort → canonical + noindex,follow.",
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
            children: [
              {
                label: "Brand collection",
                path: "/[locale]/brands/[brand]/[collection]",
                status: "planned",
                note:
                  "D6 (12 Jun) — Collections are CHILD NODES under brands in the existing brand-tree (e.g. /brands/louis-poulsen/ph-series). Standalone /collections/* routes are dropped from the sitemap. Editorial cross-brand edits (Spring edit, etc.) become CMS pages in P2.",
              },
            ],
          },
        ],
      },
      {
        label: "Shop by room",
        path: "/[locale]/rooms",
        status: "skeleton",
        note: "Top e-commerce best practice — convert browsers who think in spaces, not categories.",
        children: [
          { label: "Room template", path: "/[locale]/rooms/[slug]", status: "cms", note: "D5 Room = spatial/use-case intent. Reuses CategoryTemplate over a room-scoped product set." },
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
        note: "D3 minimum: keyword/prefix match over Postgres-synced PIM (name, SKU, category, brand). Typeahead in Header → product + category/brand suggestions. No-results recovery. Engine choice (Typesense/Meilisearch/Algolia) deferred.",
      },
    ],
  },
  {
    id: "product",
    title: "Product & purchase flow",
    description: "The buying funnel. Must support success, failure, pending and retry states — payment is Stripe-via-Odoo (D1), FE polls Odoo for state.",
    nodes: [
      { label: "Product detail (PDP)", path: "/[locale]/products/[slug]", status: "done", note: "Renamed from `/products/[slug]` — now matches the `/api/products/[slug]` endpoint." },
      { label: "Cart", path: "/[locale]/cart", status: "done" },
      { label: "Checkout", path: "/[locale]/checkout", status: "done" },
      { label: "Checkout — shipping step", path: "/[locale]/checkout/shipping", status: "planned", note: "Validate address, Odoo carrier calc." },
      { label: "Checkout — payment step", path: "/[locale]/checkout/payment", status: "planned", note: "Stripe-via-Odoo (D1). 3DS handled by Stripe via Odoo." },
      {
        label: "Checkout — return (Stripe handoff)",
        path: "/[locale]/checkout/return",
        status: "planned",
        note:
          "Stripe return target. Polls Odoo via /api/checkout/status/[orderId] → routes to success / pending / failed. D1 decided: Stripe-via-Odoo.",
      },
      { label: "Checkout — pending", path: "/[locale]/checkout/pending", status: "planned", note: "Webhook still processing; keep polling; safe fallback page." },
      { label: "Checkout — failed", path: "/[locale]/checkout/failed", status: "planned", note: "Retry CTA → /account/orders/[id]/pay; back-to-cart link; Odoo quotation stays alive." },
      { label: "Order confirmation", path: "/[locale]/order-confirmation", status: "done", note: "Order #, payment status, delivery, guest→account claim, track CTA, recommendations." },
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
      { label: "Order tracking", path: "/[locale]/account/orders/[id]/tracking", status: "planned", note: "Owns → Odoo picking/carrier/tracking." },
      { label: "Retry payment", path: "/[locale]/account/orders/[id]/pay", status: "planned", note: "Revalidate stock/price; create new Odoo payment.transaction; back into checkout/return polling." },
      { label: "Return request (order)", path: "/[locale]/account/orders/[id]/return", status: "planned", note: "MVP: Odoo portal handoff. Own RMA UI is P3." },
      { label: "Invoices", path: "/[locale]/account/invoices", status: "planned", note: "Owns → Odoo account.move list." },
      { label: "Invoice detail", path: "/[locale]/account/invoices/[id]", status: "planned" },
      { label: "Addresses", path: "/[locale]/account/addresses", status: "skeleton" },
      { label: "Payment methods (account feature)", path: "/[locale]/account/payment-methods", status: "planned", note: "Saved Stripe-in-Odoo cards + B2B terms display. NOT to be confused with the public info page `/payment-options`." },
      { label: "Returns (link to Odoo portal)", path: "/[locale]/account/returns", status: "skeleton", note: "MVP: deep-link to Odoo portal. Own RMA UI is follow-up." },
      { label: "Preferences", path: "/[locale]/account/preferences", status: "planned", note: "Email prefs, language, marketing consent, comms." },
      { label: "Delete account", path: "/[locale]/account/delete-account", status: "planned", note: "GDPR. Step-up OTP required. Explain retained legal data." },
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
      { label: "Apply for trade account", path: "/[locale]/pro/apply", status: "planned" },
      { label: "Request a quote", path: "/[locale]/pro/quote", status: "planned" },
      { label: "Project orders", path: "/[locale]/pro/projects", status: "planned" },
      { label: "Bulk order upload", path: "/[locale]/pro/bulk-order", status: "planned", note: "CSV/Excel SKU upload → quote or draft sale.order." },
      { label: "Spec sheets", path: "/[locale]/pro/spec-sheets", status: "planned" },
      { label: "Trade FAQ", path: "/[locale]/pro/faq", status: "planned" },
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
      { label: "Right of withdrawal", path: "/[locale]/right-of-withdrawal", status: "planned", note: "EU 14-day legal page. P1 launch surface." },
      { label: "Payment options (info)", path: "/[locale]/payment-options", status: "planned", note: "Accepted methods + trust. RENAMED from `/payment-methods` (301 redirect from old path). Distinct from the account feature `/account/payment-methods`." },
      { label: "Shipping policy", path: "/[locale]/shipping-policy", status: "planned" },
      { label: "Accessibility", path: "/[locale]/accessibility", status: "planned" },
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
          "Root-level, language-neutral. Static routes from this tree; every dynamic `[slug]` (categories, brands, rooms, collections, inspiration, blog, products) enumerated from Payload/PIM at build/request time. Each URL needs hreflang alternates using the LOCALIZED slugs (D2) + x-default → /nl/. Faceted-PLP variants (?filter/?sort) EXCLUDED (D4); clean PLP only.",
      },
      { label: "robots.txt", path: "/robots.txt", status: "done" },
      { label: "Maintenance page", path: "/[locale]/maintenance", status: "planned" },
      { label: "Server error (500)", path: "/[locale]/500", status: "planned" },
      { label: "Health — public liveness", path: "/api/health", status: "planned", note: "Shallow 200/ok; NO dependency detail (don't leak infra)." },
      { label: "Health — internal deep", path: "/api/internal/health", status: "planned", note: "Protected; checks Payload/Postgres/Odoo/Stripe; for monitoring only." },
      { label: "Preview routes (Payload draft)", path: "/api/preview/*", status: "planned", note: "Protected." },
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

/* ---------- Route resolution (sitemap path → real Vite URL) ---------- */

/**
 * Set of route *patterns* that are actually mounted in <App />.
 * Patterns are written in the unprefixed, react-router-dom form
 * (`:slug`, `:id`), without the `/[locale]` segment.
 * Keep in sync with App.tsx.
 */
export const MOUNTED_ROUTES = new Set<string>([
  "/",
  "/categories",
  "/categories/:slug",
  "/products/:slug",
  "/sale",
  "/search",
  "/brands",
  "/brands/:slug",
  "/brands/:slug/:collection",
  "/cart",
  "/checkout",
  "/checkout/shipping",
  "/checkout/payment",
  "/checkout/return",
  "/checkout/pending",
  "/checkout/failed",
  "/order-confirmation",
  "/orders/:id",
  "/sitemap",
  "/rooms",
  "/rooms/:slug",
  "/inspiration",
  "/inspiration/:slug",
  "/blog",
  "/blog/:slug",
  "/new",
  "/best-sellers",
  "/gift-cards",
  "/wishlist",
  "/compare",
  "/login",
  "/login/otp",
  "/signup/particulier",
  "/signup/b2b",
  "/register",
  "/account",
  "/account/orders",
  "/account/orders/:id",
  "/account/orders/:id/tracking",
  "/account/orders/:id/pay",
  "/account/orders/:id/return",
  "/account/invoices",
  "/account/invoices/:id",
  "/account/addresses",
  "/account/payment-methods",
  "/account/returns",
  "/account/preferences",
  "/account/delete-account",
  "/help",
  "/faq",
  "/contact",
  "/delivery",
  "/returns",
  "/warranty",
  "/track-order",
  "/guides/size-spec",
  "/guides/lighting-planner",
  "/pro",
  "/pro/apply",
  "/pro/quote",
  "/pro/projects",
  "/pro/bulk-order",
  "/pro/spec-sheets",
  "/pro/faq",
  "/about",
  "/sustainability",
  "/careers",
  "/press",
  "/stores",
  "/terms",
  "/privacy",
  "/cookies",
  "/imprint",
  "/right-of-withdrawal",
  "/payment-options",
  "/shipping-policy",
  "/accessibility",
  "/maintenance",
  "/500",
]);

/** Sample values used when a sitemap node has a dynamic segment. */
const SAMPLE = {
  slug: "louis-poulsen-ph5-mini-orange",
  id: "demo-order",
  brandSlug: "louis-poulsen",
  categorySlug: "verlichting",
  roomSlug: "living-room",
  collectionSlug: "scandinavian-essentials",
  inspirationSlug: "warm-minimalism",
  blogSlug: "choosing-the-right-pendant",
};

/**
 * Take a sitemap canonical path (e.g. `/[locale]/products/[slug]`)
 * and return a real Vite URL the router can navigate to
 * (e.g. `/products/louis-poulsen-ph5-mini-orange`), or null if no
 * skeleton/page is mounted for that pattern yet.
 */
export const resolveInternalHref = (sitemapPath?: string): string | null => {
  if (!sitemapPath) return null;
  if (sitemapPath.startsWith("/api")) return null;
  if (sitemapPath.endsWith(".xml") || sitemapPath.endsWith(".txt")) return null;
  if (sitemapPath === "*") return null;

  // 1) Strip the `/[locale]` prefix (router does not use locales yet).
  let p = sitemapPath.replace(/^\/\[locale\]/, "");
  if (p === "") p = "/";

  // 2) Translate sitemap plural-nest → currently mounted Vite paths.
  //    Keep this small + explicit so it's easy to audit.
  const pluralToMounted: Record<string, string> = {
    "/categories/[slug]": "/categories/:slug",
    "/products/[slug]": "/products/:slug",
  };
  if (pluralToMounted[p]) p = pluralToMounted[p];

  // 3) Convert `[slug]`/`[id]` to react-router `:slug`/`:id` to look up the
  //    mounted pattern, then build the concrete URL with SAMPLE values.
  const pattern = p.replace(/\[(\w+)\]/g, ":$1");
  if (!MOUNTED_ROUTES.has(pattern)) return null;

  let url = pattern
    .replace(/:slug/g, () => {
      if (pattern.startsWith("/brands/")) return SAMPLE.brandSlug;
      if (pattern.startsWith("/categories/")) return SAMPLE.categorySlug;
      if (pattern.startsWith("/rooms/")) return SAMPLE.roomSlug;
      if (pattern.startsWith("/collections/")) return SAMPLE.collectionSlug;
      if (pattern.startsWith("/inspiration/")) return SAMPLE.inspirationSlug;
      if (pattern.startsWith("/blog/")) return SAMPLE.blogSlug;
      return SAMPLE.slug;
    })
    .replace(/:id/g, SAMPLE.id);

  return url;
};