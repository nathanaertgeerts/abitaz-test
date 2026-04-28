# Abitaz — Design & Architecture Specification
**Target stack:** Next.js 15 (App Router, RSC) · Payload CMS 3 · next-intl · Tailwind CSS · shadcn/ui · TypeScript
**Locales:** `nl` (default) · `en` · `de` · `fr` · `it` · `es`
**Status:** Canonical spec for the production rebuild. The current Lovable Vite project is the visual reference only — architecture, content modeling, and component boundaries are redefined here.

---

## 1. Goals & non-goals

**Goals**
- Server-rendered, SEO-first storefront. Every public route is statically generated (SSG) or incrementally regenerated (ISR); no client-only pages.
- All editorial content (hero slots, category copy, promo banners, brand bios, product enrichment, navigation, footer, USPs) lives in Payload and is **field-level localized**.
- Six locales as first-class citizens with locale-prefixed URLs: `/nl/...`, `/en/...`, `/de/...`, `/fr/...`, `/it/...`, `/es/...`.
- Visually identical to the current Lovable build (tokens, layout primitives, ProductCard, HeroGrid, etc.).

**Non-goals**
- No SPA fallbacks. Client components only where interactivity demands it (cart drawer, mobile menu, search box, swatches).
- No runtime translation services. All copy is authored in Payload or in `messages/{locale}.json`.

---

## 2. Tech stack & versions

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15**, App Router, React 19, RSC | `app/[locale]/...`, Server Components by default |
| CMS | **Payload CMS 3** (Postgres adapter) | Same Next app, mounted at `/admin` via `@payloadcms/next` |
| i18n | **next-intl** v3 | Locale segment, server + client message access |
| Styling | **Tailwind CSS 3** + shadcn/ui | HSL semantic tokens (see §4) |
| DB | **Postgres** (Neon/Supabase/RDS) | Payload + app share the same DB |
| Media | Payload Media collection → **S3** (or R2) | `next/image` loader for delivery |
| Search | Payload + Postgres FTS for v1; Algolia/Meilisearch optional later | |
| Auth (admin) | Payload built-in | Customer auth not in v1 scope |
| Deploy | Vercel (app) + managed Postgres + S3 | ISR via `revalidateTag` from Payload hooks |
| Testing | Vitest (units) + Playwright (e2e, per locale) | |

---

## 3. Routing & URL structure

App Router tree under `app/[locale]/`:

```
app/
  [locale]/
    layout.tsx                 # SiteLayout: <Header/> <main/> <Footer/>
    page.tsx                   # Home
    categories/page.tsx        # All categories index
    category/[slug]/page.tsx   # Category PLP
    product/[slug]/page.tsx    # PDP
    brands/page.tsx
    brands/[slug]/page.tsx
    sale/page.tsx
    search/page.tsx            # ?q=
    cart/page.tsx              # client-heavy
    checkout/page.tsx
    order-confirmation/page.tsx
    not-found.tsx
  api/
    revalidate/route.ts        # POST from Payload afterChange hooks
  (payload)/
    admin/[[...segments]]/page.tsx
    api/[...slug]/route.ts
middleware.ts                  # next-intl locale negotiation
i18n.ts                        # next-intl config
messages/
  nl.json en.json de.json fr.json it.json es.json
```

**Rules**
- `middleware.ts` uses `createMiddleware` from `next-intl` with `localePrefix: 'always'` and `defaultLocale: 'nl'`. Root `/` redirects to `/nl` (or to negotiated locale via `Accept-Language`).
- Slugs are localized per locale (Payload field-level localization on `slug`). Example: `/nl/categorie/buitenverlichting` and `/en/category/outdoor-lighting` both resolve the same Category document. The segment label (`category` vs `categorie`) is **fixed in English in the URL** for v1 to keep routing simple — we localize only the slug. (Revisit later with route groups per locale if SEO demands native segment labels.)
- `generateStaticParams` enumerates `{locale, slug}` pairs for all published documents.
- Every page exports `generateMetadata` returning localized `title`, `description`, `openGraph`, `alternates.languages` (all six hreflang entries + `x-default` → `nl`), and `canonical`.

---

## 4. Design tokens

All colors are **HSL** and live in `src/styles/globals.css` under `:root` and `.dark`. Tokens are consumed exclusively through Tailwind classes. **Never hard-code colors in components** (no `text-white`, no `bg-[#...]`).

```css
:root {
  /* Brand */
  --primary: 214 88% 27%;          /* Abitaz blue */
  --primary-foreground: 0 0% 100%;
  --cta: 24 95% 53%;               /* Orange CTA */
  --cta-foreground: 0 0% 100%;

  /* Surfaces */
  --background: 0 0% 100%;
  --foreground: 222 22% 12%;
  --surface: 210 20% 97%;          /* page section background */
  --card: 0 0% 100%;
  --card-foreground: 222 22% 12%;
  --muted: 210 16% 93%;
  --muted-foreground: 215 14% 40%;
  --border: 214 15% 88%;
  --input: 214 15% 88%;
  --ring: 214 88% 27%;

  /* Semantics */
  --destructive: 0 72% 45%;
  --success: 142 60% 38%;
  --warning: 38 92% 50%;

  --radius: 0.5rem;
}
```

**Typography**
- `--font-sans`: Inter (body)
- `--font-display`: Manrope (headings, used via `font-display` utility)
- Loaded via `next/font/google` in `app/[locale]/layout.tsx` with `display: 'swap'` and `subsets: ['latin', 'latin-ext']` (covers all six locales).

**Spacing & layout**
- Container utility `.container-abitaz`: `max-w-[1400px] mx-auto px-4 md:px-6`.
- Section vertical rhythm: `mt-14` between top-level home sections.
- Radius scale: `sm 0.25rem`, `md 0.375rem`, `DEFAULT 0.5rem`, `lg 0.75rem`.

---

## 5. Internationalization (next-intl)

**Config (`i18n.ts`)**
```ts
export const locales = ['nl','en','de','fr','it','es'] as const;
export const defaultLocale = 'nl' as const;
export type Locale = typeof locales[number];
```

**Message files** — `messages/{locale}.json`. Namespaces:
- `common` — buttons, generic labels (Add to cart, Loading, Search…)
- `nav` — header/footer links
- `home` — section titles ("Popular products", "Shop by brand")
- `product` — PDP labels (In stock, Free shipping, Specifications)
- `cart`, `checkout`, `errors`, `seo`

**Server components** use `getTranslations({ locale, namespace })`. **Client components** use `useTranslations()` and receive messages via `<NextIntlClientProvider>` in `app/[locale]/layout.tsx`.

**Locale switcher** (in Header) preserves the current path by mapping the current document's localized slug to the target locale's slug (looked up from Payload). For non-document routes it just swaps the locale prefix.

**Number/date/currency** via `next-intl`'s `useFormatter`. Currency is **EUR** for all locales; only formatting differs (`€ 1.299,00` vs `€1,299.00`).

**SEO**
- `<html lang={locale}>` set in `[locale]/layout.tsx`.
- `alternates.languages` includes all six locales + `x-default`.
- Sitemap (`app/sitemap.ts`) emits one entry per `(locale, document)` with `alternates`.
- `robots.ts` allows all; disallows `/admin`, `/api`, `/cart`, `/checkout`.

---

## 6. Payload CMS — collections, globals, blocks

### 6.1 Localization config
```ts
// payload.config.ts (excerpt)
localization: {
  locales: ['nl','en','de','fr','it','es'],
  defaultLocale: 'nl',
  fallback: true,
}
```
Every user-facing text or media field is marked `localized: true`. Slugs are localized. SKUs, prices, IDs, and references are **not** localized.

### 6.2 Collections

#### `media`
- `alt` (text, **localized**, required)
- `caption` (text, localized)
- Storage: S3 plugin. Sizes: `thumb 200`, `card 480`, `hero 1200`, `og 1200x630`.

#### `categories`
| Field | Type | Localized | Notes |
|---|---|---|---|
| `name` | text | ✅ | required |
| `slug` | text (unique per locale) | ✅ | auto from `name`, editable |
| `icon` | select (lucide name) | ❌ | maps to `CategoryStrip` icon |
| `parent` | relationship→categories | ❌ | optional, for sub-cats |
| `description` | richText | ✅ | shown on PLP top |
| `heroImage` | upload→media | ❌ | |
| `seo` | group `{ title, description, ogImage }` | ✅ | |
| `order` | number | ❌ | manual sort |

#### `brands`
| Field | Type | Localized |
|---|---|---|
| `name` | text | ❌ |
| `slug` | text (unique) | ❌ (brand names are global) |
| `logo` | upload→media | ❌ |
| `bio` | richText | ✅ |
| `featured` | checkbox | ❌ |
| `seo` | group | ✅ |

#### `products`
| Field | Type | Localized | Notes |
|---|---|---|---|
| `sku` | text (unique) | ❌ | |
| `name` | text | ✅ | |
| `slug` | text (unique per locale) | ✅ | |
| `brand` | relationship→brands | ❌ | |
| `categories` | relationship→categories (hasMany) | ❌ | |
| `shortDescription` | textarea | ✅ | card + meta description |
| `description` | blocks (see §6.4) | ✅ | rich PDP body |
| `specs` | array `{ key, value }` | ✅ | rendered as table |
| `price` | number | ❌ | cents, EUR |
| `compareAtPrice` | number | ❌ | for sale badge |
| `currency` | select (EUR) | ❌ | |
| `stock` | number | ❌ | |
| `images` | array `{ image: media, alt(loc) }` | partial | image is global, alt is localized |
| `swatches` | array `{ label(loc), color }` | partial | drives ProductCard 5-swatch row |
| `badges` | select multi: `new`, `sale`, `bestseller` | ❌ | |
| `seo` | group | ✅ | |
| `_status` | draft/publish | — | Payload built-in |

Indexes: `slug` per locale, `sku`, `brand`, `categories`.

#### `pages`
Generic editorial pages built from blocks. Used for `/sale`, `/about`, legal, etc.
- `title` (loc), `slug` (loc, unique), `layout` (blocks, loc), `seo` (loc).

### 6.3 Globals

- **`navigation`** (localized): array of `{ label, href | categoryRef | pageRef, children[] }`. Drives Header MegaMenu and MobileMenu.
- **`footer`** (localized): columns + payment methods + legal links.
- **`uspBar`** (localized): array of `{ icon, text }` rendered in the top header strip. Must truncate cleanly on mobile (see §8.1).
- **`siteSettings`**: default SEO, social handles, default OG image, contact info.

### 6.4 Blocks (for `pages.layout` and `products.description`)

All blocks are localized as a whole (each block lives inside a localized field). They map 1:1 to React Server Components in `src/components/blocks/`.

| Block slug | Fields | Renders |
|---|---|---|
| `heroGrid` | `slides[] { title, subtitle, image, cta { label, href } }`, `layoutVariant` | `<HeroGrid>` — mobile snap carousel, desktop 8-col grid |
| `categoryStrip` | `categories: relationship[]` (or auto = top N) | `<CategoryStrip>` |
| `promoBanners` | `banners[] { image, headline, subline, href, theme }` | `<PromoBanners>` |
| `brandsBar` | `brands: relationship[]` (or `auto`) | `<BrandsBar>` |
| `productGrid` | `title`, `source: manual|category|sale`, `products?`, `category?`, `limit` | `<ProductGrid>` of `<ProductCard>` |
| `trustStrip` | `items[] { icon, title, text, href? }` | `<TrustStrip>` |
| `richText` | `content` (Lexical) | Prose |
| `mediaText` | `image`, `body`, `align` | 2-col |

### 6.5 Hooks → ISR
Every collection has `afterChange` and `afterDelete` hooks that POST to `/api/revalidate` with a tag list:
- `products` → `product:{slug}:{locale}`, `category:{catSlug}:{locale}`, `home:{locale}`
- `categories` → `category:{slug}:{locale}`, `home:{locale}`, `nav:{locale}`
- `pages` → `page:{slug}:{locale}`
- `globals` (nav/footer/usp) → `nav:{locale}` for every locale

Pages call `unstable_cache` / `fetch(..., { next: { tags: [...] } })` accordingly.

---

## 7. Data access layer

`src/lib/payload.ts` exports a server-only Payload client (`getPayload({ config })`). All page components fetch through small typed query helpers in `src/server/queries/`:

```ts
// src/server/queries/products.ts
export async function getProductBySlug(slug: string, locale: Locale) { … }
export async function listProducts(opts: { locale: Locale; category?: string; limit?: number; sort?: 'new'|'price-asc'|'price-desc' }) { … }
```

Rules:
- Query helpers are **server-only** (`import 'server-only'`).
- They always pass `locale` and `fallbackLocale: 'nl'`.
- They wrap the Payload call in `unstable_cache` with the matching revalidation tag.
- Never call Payload from a client component. Pass serialized data down as props.

---

## 8. Layout primitives & components

### 8.1 `<SiteLayout>` (in `[locale]/layout.tsx`)
```
<div class="flex min-h-screen flex-col bg-background">
  <Header />               // server, localized via getTranslations + nav global
  <main class="flex-1">{children}</main>
  <Footer />               // server, from footer global
</div>
```

**Header (two-tier, sticky)**
- Tier 1 — **USP bar**: horizontal list from `uspBar` global. On `<sm` it must truncate per-item with `truncate min-w-0` and the row uses `overflow-hidden`; never wraps to a second line. The whole bar is `hidden md:flex` for items 2+; only item 1 is shown on mobile, fully truncated.
- Tier 2 — **Primary bar**: Logo · MegaMenu (desktop) / MobileMenu (mobile) · Search · LocaleSwitcher · Cart.

**Footer**: 4 columns on desktop, accordion on mobile, payment methods strip, legal row.

### 8.2 `<ProductCard>` (server component; interactive parts in a small client child)
- Fixed `aspect-[4/5]` image area; `next/image` with `sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"`.
- Badges (top-left): `New`, `-XX%`, `Bestseller` — mapped from `badges` and `compareAtPrice`.
- Title clamps to 2 lines (`line-clamp-2`).
- Price row: current price; if `compareAtPrice`, show strikethrough + computed `-XX%`.
- **Mandatory 5-swatch placeholder row** under the price for layout consistency: render real swatches if present, otherwise render 5 invisible placeholders (`opacity-0 pointer-events-none`) so all cards in a grid align.
- "Add to cart" is a client child component subscribing to the cart store.

### 8.3 `<HeroGrid>`
- Mobile: horizontal snap carousel (`snap-x snap-mandatory`, `overflow-x-auto`, hidden scrollbar), one slide per viewport, `role="region" aria-roledescription="carousel"`, dot indicators.
- Desktop (`md+`): 8-column grid; main slide spans 5 cols × 2 rows, secondary slides fill remainder.
- Images use `next/image` with `priority` on the first slide only (LCP).

### 8.4 `<CategoryStrip>`
- Scrollable row of category chips with lucide icons (mapped via `icon` field).
- Hover: `bg-surface` → `bg-primary/10`, icon color → `text-primary`.
- Each chip is a `<Link>` to `/{locale}/category/{localizedSlug}`.

### 8.5 `<BrandsBar>`
- Single-row horizontal scroller (never wraps), snap, hidden scrollbar.
- Renders SVG component logos from `src/components/brand-logos/` keyed by `brand.slug`; falls back to brand name in display font.

### 8.6 `<TrustStrip>`
- 2 cols on mobile, 4 on `md+`. Icon (`text-cta`) + title + subtext. Items optionally linkable.

### 8.7 Cart
- `CartProvider` is a client component using Zustand, persisted to `localStorage` per locale-agnostic key (`abitaz.cart.v1`).
- Cart drawer is the only globally mounted client overlay.

---

## 9. Page specs

### 9.1 Home `/[locale]`
Composition (server):
1. `<h1 class="sr-only">` from `home.h1` message.
2. **Mobile (`<md`)**: render `<SaleContent />` (Amazon-style sale layout, sourced from `pages` doc with slug `sale`).
3. **Desktop (`md+`)**: `HeroGrid`, `TrustStrip`, `CategoryStrip`, `ProductGrid` (popular, limit 8), `PromoBanners`, `BrandsBar`.
   All powered by the `pages` doc with slug `home` and its `layout` blocks. The split above is achieved with a `homeMobile` and `homeDesktop` variant or by tagging blocks with `showOn: mobile|desktop|both`.
4. `generateMetadata` from the page's `seo` group; falls back to `siteSettings`.

### 9.2 Category `/[locale]/category/[slug]`
- Resolve category by localized slug. 404 if missing.
- Top: localized name, rich description, optional hero image.
- Filter/sort bar (client island): brand multi-select, price range, sort.
- Grid of `<ProductCard>` with pagination (URL `?page=`).
- ISR tag: `category:{slug}:{locale}`.

### 9.3 Product `/[locale]/product/[slug]`
- Gallery (client island, keyboard accessible), title, brand link, price block, swatches, stock indicator, **Add to cart**.
- Tabs: Description (blocks), Specifications (table from `specs`), Shipping & returns (from a global).
- JSON-LD `Product` with `offers.priceCurrency: EUR`, `availability` from `stock`.
- Related products (same category, exclude self, limit 4).

### 9.4 Brands / Brand
- `/brands`: grid of brand logos.
- `/brands/[slug]`: bio + product grid filtered by brand.

### 9.5 Sale, Search, Cart, Checkout, Order Confirmation
- `/sale`: `pages` doc with slug `sale`.
- `/search?q=`: server-rendered using Postgres FTS over `products.name` + `shortDescription` per locale.
- `/cart`, `/checkout`, `/order-confirmation`: client-heavy; not indexed (`robots: noindex`).

---

## 10. SEO

- One `<h1>` per page.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section aria-label>`.
- `generateMetadata` per route returns:
  - `title` (≤60 chars, includes brand "Abitaz")
  - `description` (≤160 chars)
  - `alternates.canonical` = current localized URL
  - `alternates.languages` = map of all 6 locales + `x-default`
  - `openGraph` with localized `images`
- `app/sitemap.ts` lists every published doc × every locale with `<xhtml:link rel="alternate">` equivalents via `alternates`.
- JSON-LD: `Organization` (root layout), `BreadcrumbList` (category/product), `Product` (PDP), `ItemList` (PLP).
- All `<img>`/`next/image` require localized `alt` (from media's localized `alt`).

---

## 11. Accessibility

- WCAG 2.1 AA color contrast verified for all token pairs.
- All interactive elements reachable by keyboard; visible focus ring uses `--ring`.
- Carousels: `role="region" aria-roledescription="carousel"`, slide `aria-label="Slide X of Y"`, prev/next buttons with `aria-controls`.
- MobileMenu uses Radix `<Sheet>`; focus trap + restore.
- Skip-to-content link at top of `<body>`.

---

## 12. Conventions for new code

1. **Tokens only.** Never `text-white`, never `bg-[#hex]`. Use semantic Tailwind classes (`text-foreground`, `bg-primary`, `text-cta`).
2. **Container.** Wrap top-level sections in `.container-abitaz`. Never set `max-w` ad hoc.
3. **Mobile-first.** Author the `<md` styles first, then layer `md:` / `lg:`.
4. **Server by default.** Add `'use client'` only when you need state, effects, or browser APIs. Push the `'use client'` boundary as deep as possible.
5. **No data fetching in client components.** Fetch in the server parent, pass props.
6. **Localization is mandatory.** Any user-visible string is either in `messages/{locale}.json` (UI chrome) or in a Payload `localized: true` field (content). No hard-coded English in JSX.
7. **Slugs are localized.** Always resolve documents by `(slug, locale)`.
8. **Use the primitives.** `SiteLayout`, `Button` (shadcn variants), `ProductCard`, `Container`. Don't re-roll.
9. **Images:** always `next/image`, always `alt` from data, set `sizes`, mark only the LCP image `priority`.
10. **Links:** always `next/link`. Locale-prefixed via a `localeHref(path, locale)` helper.
11. **ISR:** every server fetch sets a `next.tags` array; every Payload `afterChange` hook revalidates those tags.
12. **Type safety:** generate Payload TS types (`payload generate:types`) and import from `@/payload-types`. No `any`.

---

## 13. File/folder layout

```
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      (routes…)
    api/revalidate/route.ts
    sitemap.ts
    robots.ts
  components/
    layout/         # Header, Footer, MegaMenu, MobileMenu, LocaleSwitcher, Logo, PaymentMethods
    blocks/         # HeroGrid, CategoryStrip, PromoBanners, BrandsBar, ProductGrid, TrustStrip, RichText, MediaText
    product/        # ProductCard, Gallery, AddToCartButton (client), SwatchRow
    ui/             # shadcn primitives
    brand-logos/    # SVG components keyed by brand slug
  server/
    queries/        # products.ts, categories.ts, brands.ts, pages.ts, globals.ts
    payload.ts
  lib/
    i18n.ts         # locales, defaultLocale, helpers
    locale-href.ts
    cn.ts
  styles/
    globals.css     # tokens + Tailwind layers
  payload/
    payload.config.ts
    collections/    # Media, Categories, Brands, Products, Pages, Users
    globals/        # Navigation, Footer, UspBar, SiteSettings
    blocks/         # block configs matching §6.4
    hooks/revalidate.ts
messages/
  nl.json en.json de.json fr.json it.json es.json
middleware.ts
i18n.ts
```

---

## 14. Definition of done (per feature)

- [ ] Renders identically on mobile and desktop to the Lovable reference.
- [ ] All copy comes from Payload (localized) or `messages/*.json`.
- [ ] Works in all six locales; `nl` is the fallback.
- [ ] Server-rendered, cacheable, and tagged for ISR.
- [ ] `generateMetadata` complete with `alternates.languages` for all 6 locales + `x-default`.
- [ ] Lighthouse ≥ 95 Perf / 100 SEO / 100 A11y on the route.
- [ ] No hard-coded colors, no hard-coded English.
- [ ] Playwright e2e covers the route in `nl` and `en` at minimum.
