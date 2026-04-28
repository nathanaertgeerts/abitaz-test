# Abitaz — design.md

This is the canonical design specification for the Abitaz storefront. It
documents the visual language, component patterns, layout rules and
behavioural conventions that are currently implemented in the codebase.
When developing with AI (or by hand), **build new pages and features so
they match this document exactly**. If a change requires deviating from
this spec, update this file in the same change.

Inspired by Google's "design.md" pattern: a single source of truth that
the AI reads before generating UI.

---

## 1. Brand & voice

- **Name**: Abitaz
- **Tagline**: "The smart shop for buyers who already know what they want."
- **Pillars** (used across USP bar, Trust strip, Footer):
  - Honest prices
  - Real stock (live inventory, ships in 1–2 days)
  - Free shipping €50+
  - 30-day returns
  - Expert support / online lichtadvies
- **Tone**: confident, concise, product-led. No hype words, no
  exclamation marks in marketing copy. Prices and facts before adjectives.
- **Languages**: copy is primarily English with occasional Dutch
  ("lichtadvies"). Keep product names in English.

---

## 2. Tech stack (do not change)

- React 18 + Vite 5 + TypeScript 5
- React Router DOM (SPA, no SSR / no Next.js)
- Tailwind CSS v3 + `tailwindcss-animate`
- shadcn/ui components in `src/components/ui/*` (Radix under the hood)
- `lucide-react` for icons
- `@tanstack/react-query` for data
- `vite-imagetools` for responsive WebP `srcset` generation on hero imagery
- Fonts loaded from Google Fonts in `src/index.css`:
  - Body: **Inter** (400/500/600/700)
  - Display / headings: **Manrope** (500/600/700/800)

No backend libraries, no Next.js, no alternative routers.

---

## 3. Design tokens

All colors are **HSL** and live in `src/index.css` under `:root`. They are
exposed to Tailwind via `tailwind.config.ts`. **Never hard-code colors in
components** (no `text-white`, no `bg-[#...]`, no raw hex). Always use
the semantic token classes below.

### 3.1 Color palette

| Token              | HSL                | Usage                                              |
|--------------------|--------------------|----------------------------------------------------|
| `--background`     | `0 0% 100%`        | Page background, inputs                            |
| `--foreground`     | `0 0% 24%`         | Body text                                          |
| `--surface`        | `210 20% 98%`      | Section backgrounds, USP bar, footer, image bg    |
| `--surface-muted`  | `210 16% 96%`      | Subtle alternate surface                           |
| `--card`           | `0 0% 100%`        | Card surface                                       |
| `--primary`        | `204 90% 43%`      | DM Lights blue — header, links, CTAs (default)    |
| `--primary-hover`  | `204 90% 38%`      | Primary hover                                      |
| `--cta`            | `19 91% 54%`       | Orange — "Add to cart", focus accents in search   |
| `--cta-hover`      | `19 91% 48%`       | CTA hover                                          |
| `--secondary`      | `49 87% 73%`       | Yellow accent (sparingly)                          |
| `--success`        | `142 52% 55%`      | In-stock state, success toasts                     |
| `--sale`           | `204 90% 43%`      | Sale/discount badges (uses brand blue)             |
| `--muted`          | `210 16% 96%`      | Muted surfaces                                     |
| `--muted-foreground` | `0 0% 45%`        | Secondary text, captions, line-through prices     |
| `--accent`         | `49 87% 73%`       | Accent surfaces                                    |
| `--destructive`    | `0 84% 55%`        | Errors, destructive actions                        |
| `--border`         | `220 13% 91%`      | All borders, dividers                              |
| `--input`          | `220 13% 88%`      | Input borders                                      |
| `--ring`           | `204 90% 43%`      | Focus ring                                         |

Tailwind classes to use: `bg-primary`, `text-primary`, `bg-cta`,
`text-cta`, `bg-surface`, `text-foreground`, `text-muted-foreground`,
`border-border`, `bg-sale text-sale-foreground`, etc.

Dark mode tokens exist (`.dark { ... }`) but the site ships in light
mode only. Do not add a dark-mode toggle unless explicitly requested.

### 3.2 Typography

- `--font-sans: 'Inter'` → `font-sans` (body, UI text, prices)
- `--font-display: 'Manrope'` → `font-display` (h1–h5, hero titles,
  section headings)
- All headings use `font-display` automatically via the base layer
  (`@layer base { h1, h2, h3, h4, h5 { font-family: var(--font-display) } }`)
  with `letter-spacing: -0.01em`.
- Never introduce serif fonts.

**Type scale** (Tailwind classes used in the codebase):

| Role                 | Classes                                              |
|----------------------|------------------------------------------------------|
| Page H1 (visible)    | `font-display text-3xl md:text-4xl font-bold`       |
| Section H2           | `font-display text-2xl md:text-3xl font-bold`       |
| Card / hero title    | `font-display text-2xl` (mobile) / `text-3xl` (desktop) `font-bold leading-tight` |
| Product card title   | `text-sm font-medium` + `line-clamp-2`              |
| Price (primary)      | `text-base font-bold text-primary`                  |
| Strikethrough price  | `text-xs text-muted-foreground line-through`        |
| Eyebrow / label      | `text-xs font-medium opacity-90` on dark imagery,    |
|                      | `text-xs font-bold uppercase tracking-wide` on light |
| Body                 | `text-sm` default; `text-xs` for captions            |
| USP bar              | `text-[11px] md:text-xs`                             |

### 3.3 Radius, spacing, shadows

- `--radius: 0.5rem` → `rounded-lg` is the default for cards, hero tiles,
  panels. Buttons/inputs use `rounded-md`. Badges use `rounded-sm`.
  Avatars / icon chips use `rounded-full`.
- Shadow language is restrained:
  - Cards lift on hover with `hover:shadow-md` (or `hover:shadow-sm` for
    category tiles). Avoid heavy shadows.
- Spacing: prefer Tailwind's default scale. Common rhythm:
  - Section vertical: `mt-12` to `mt-14` between homepage sections,
    `py-12` inside the footer, `pt-4` for the hero.
  - Card internal padding: `p-3` (product cards), `p-4` (category tiles),
    `p-5` (hero overlay text), `p-6` (trust strip).
  - Grid gaps: `gap-3` (mobile carousels, tight grids), `gap-4`–`gap-6`
    (cards), `gap-10` (footer columns).

### 3.4 Container

Always wrap page content in `.container-abitaz`:

```css
.container-abitaz { @apply mx-auto w-full max-w-[1400px] px-4 md:px-6; }
```

Do **not** use raw `container` or arbitrary max-widths. Hero, sections,
header inner, footer inner all use `.container-abitaz`.

### 3.5 Breakpoints

Tailwind defaults plus a custom `xs: 375px`:

- `xs` 375px — small phones (used in USP bar to reveal/hide bits of copy)
- `sm` 640px
- `md` 768px — primary mobile/desktop split (homepage swaps mobile-Sale layout for HeroGrid here)
- `lg` 1024px — mega menu nav appears
- `xl` 1280px
- `2xl` 1400px (container max)

Mobile-first. Always design the small viewport first, then add `md:`/`lg:`
overrides.

---

## 4. Layout primitives

### 4.1 SiteLayout

Every page renders inside `<SiteLayout>` from
`src/components/layout/SiteLayout.tsx`:

```
<div class="flex min-h-screen flex-col bg-background">
  <Header />
  <main class="flex-1">{children}</main>
  <Footer />
</div>
```

Never render a page without `SiteLayout` (except 404 if intentionally
chromeless).

### 4.2 Header (`src/components/layout/Header.tsx`)

`sticky top-0 z-40 w-full`. Two stacked bars:

1. **USP bar** — `bg-surface text-foreground border-b border-border`,
   `h-10`, `text-[11px] md:text-xs`. Items use `text-cta` icons (`h-3.5
   w-3.5 md:h-4 md:w-4`). On mobile the bar is **non-scrollable**: items
   `min-w-0` + `truncate`, container has no `overflow-x-auto` below `md`.
   The "Expert support" pillar is `hidden md:flex`. Use `xs:` to gate
   secondary words ("€50+", "returns"). Never let the USP bar overflow.
2. **Primary blue bar** — `bg-primary text-primary-foreground`, `h-16`.
   Contains: `MobileMenu` (hamburger, `<lg`), `Logo`, `MegaMenu` inline
   (`hidden lg:block`), search input (`hidden md:block`, fills remaining
   space), and the action cluster (account / wishlist / cart with badge).
   Search input has white background and orange focus ring
   (`focus-visible:ring-cta`).

### 4.3 Footer (`src/components/layout/Footer.tsx`)

`mt-16 border-t border-border bg-surface text-foreground`.
- Top: 4-column grid (`md:grid-cols-4`, `gap-10`, `py-12`): brand block
  (Logo dark, tagline, social icons in `rounded-full` outlined chips) +
  three link columns ("Shop", "Service", "Company") with
  `text-sm font-bold uppercase tracking-wide` headings and
  `text-muted-foreground hover:text-primary` links.
- Middle: payment methods row.
- Bottom: copyright + "Prices include VAT.", `text-xs text-muted-foreground`.

---

## 5. Core components

### 5.1 Button (`src/components/ui/button.tsx`)

`cva` variants — use `<Button>`, do not roll your own button styles.

- `variant`: `default` (primary blue), `destructive`, `outline`,
  `secondary`, `ghost`, `link`
- `size`: `default` (h-10), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10)
- For the orange "Add to cart" CTA, use `className="bg-cta text-cta-foreground hover:bg-cta-hover"` on a `<Button>` (there is no dedicated `cta` variant yet — apply tokens, never raw color).
- Buttons always use `rounded-md`, `text-sm font-medium`, focus ring
  (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).

### 5.2 ProductCard (`src/components/product/ProductCard.tsx`)

Canonical product tile used everywhere products are listed.

- Wrapper: `<Link>` to `/product/{slug}`, `flex h-full flex-col rounded-lg bg-card p-3 transition hover:shadow-md`.
- Image well: `aspect-square overflow-hidden rounded-md bg-surface`. Image is `object-contain` (never `cover` for products), `loading="lazy"`, `width={400} height={400}`, with a subtle `group-hover:scale-105` zoom.
- Discount badge (when `originalPrice > price`): top-left,
  `bg-sale text-sale-foreground rounded-sm px-2 py-1 text-xs font-bold`,
  text `-{pct}%`.
- Body: category eyebrow (`text-xs text-muted-foreground`), title
  (`text-sm font-medium line-clamp-2`, hover → `text-primary`), price
  row (`text-base font-bold text-primary` + optional `line-through`
  original).
- **Always reserve a 5-swatch row** (`mt-2 flex h-5 items-center gap-1`)
  even if the product has no colors — keeps card heights consistent.

### 5.3 Category tile (CategoryStrip)

- Grid: `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3`.
- Tile: `rounded-lg border border-transparent bg-surface p-4` with hover
  lift (`hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-sm`).
- Icon chip: `h-12 w-12 rounded-full bg-background text-primary`,
  hover swaps to `bg-cta/10 text-cta`. Icon uses `lucide-react` at
  `h-6 w-6 strokeWidth={1.75}`.
- Label: `text-sm font-medium`, sub-label: `text-xs text-muted-foreground` showing product count.

### 5.4 HeroGrid (`src/components/home/HeroGrid.tsx`)

- Mobile (`<md`): horizontally swipeable, snap carousel with dot
  indicators. Each slide is `w-[88%] h-56 rounded-lg` with a
  `bg-gradient-to-t from-black/60 via-black/15 to-transparent` overlay
  and white text bottom-left (`font-display text-2xl font-bold`).
- Desktop (`md+`): 8-column grid, `auto-rows-[220px]`, `gap-px` over a
  `bg-border` parent so the grid lines act as a single hairline divider.
  Featured tile spans `md:col-span-4 md:row-span-2`; outer-corner tiles
  use `roundClass` (`md:rounded-l-lg`, `md:rounded-tr-lg`,
  `md:rounded-br-lg`) so only the outside of the grid is rounded.
- Images: `vite-imagetools` `?w=480;768;1200;1600&format=webp&as=srcset`
  with explicit `sizes`. The first slide is `loading="eager"
  fetchPriority="high"`, others are lazy.
- Respect `prefers-reduced-motion` (no smooth scroll, no transforms).

### 5.5 TrustStrip

- Card panel: `rounded-lg border border-border bg-card p-6 grid grid-cols-2 md:grid-cols-4 gap-4`.
- Each item: `lucide-react` icon in `text-cta`, title `text-sm font-semibold`, body `text-xs text-muted-foreground`.

### 5.6 Toasts, dialogs, popovers, etc.

Use the shadcn primitives in `src/components/ui/*` as-is. Do not restyle
them inline; if a tweak is needed, change the variant/class composition
within the primitive so it stays consistent globally.

---

## 6. Page architecture & routes

Routes are declared in `src/App.tsx`:

| Path                       | Page                              |
|----------------------------|-----------------------------------|
| `/`                        | `Index` (homepage)                |
| `/category/:slug`          | `Category`                        |
| `/categories`              | `Categories` (Amazon-style hub)   |
| `/product/:slug`           | `ProductDetail`                   |
| `/sale`                    | `Sale`                            |
| `/search`                  | `Search`                          |
| `/brands`                  | `Brands`                          |
| `/brands/:slug`            | `Brand`                           |
| `/cart`                    | `Cart`                            |
| `/checkout`                | `Checkout`                        |
| `/order-confirmation`      | `OrderConfirmation`               |
| `*`                        | `NotFound`                        |

New pages must be added **above** the catch-all `*` route.

### 6.1 Homepage (`src/pages/Index.tsx`)

- Mobile (`<md`): renders `<SaleContent />` (Amazon-style sale layout).
- Desktop (`md+`): renders, in order — `HeroGrid`, `TrustStrip`,
  `CategoryStrip`, `PopularProducts`, `PromoBanners`, `BrandsBar`.
- Always sets `<title>` and `<meta name="description">` in a `useEffect`
  (one-page SEO pattern). A visually-hidden `<h1 class="sr-only">` is
  always present for SEO.

### 6.2 SEO conventions (per page)

- Set `document.title` (< 60 chars, includes the primary keyword).
- Set `<meta name="description">` (< 160 chars).
- Exactly one `<h1>` per route (use `sr-only` if the visible hero
  doubles as a marketing tile).
- Use semantic landmarks: `<header>`, `<main>`, `<footer>`, `<section>`
  with `aria-label` for unnamed sections.
- All `<img>` need real `alt` text (decorative imagery uses `alt=""`).
- Lazy-load below-the-fold images; eager + `fetchPriority="high"` only
  for the LCP hero.

---

## 7. Interaction & motion

- Default transition: `transition` / `transition-colors` / `transition-transform`,
  duration 150–300ms. Hero zoom uses `duration-500`.
- Always pair non-essential motion with `motion-safe:` and check
  `prefers-reduced-motion` for JS-driven animation (HeroGrid does this).
- Hover states:
  - Cards: `hover:shadow-md` (or `-translate-y-0.5` for category tiles).
  - Links in nav/footer: color shift to `text-primary`.
  - Product image: `group-hover:scale-105`.
- Focus: every interactive element has a visible ring
  (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
  The header search uses `focus-visible:ring-cta` for orange contrast on
  blue.

---

## 8. Iconography & imagery

- Icons: `lucide-react` only. Default size `h-4 w-4` inline,
  `h-5 w-5` in nav, `h-6 w-6` in feature chips. `strokeWidth={1.75}`
  on category icons. Inline brand SVGs (Instagram/Facebook/etc.) live in
  `Footer.tsx` and use `currentColor`.
- Product images: square, white/neutral background, `object-contain`.
- Hero / category imagery: photographic, `object-cover`, always paired
  with a dark gradient overlay so white text is readable.
- Use `vite-imagetools` `srcset` for any image larger than ~480px wide.

---

## 9. Accessibility checklist

- All form controls have associated `<label>` (use `sr-only` if visually
  hidden, e.g. site search).
- Carousels use `role="region"` + `aria-roledescription="carousel"`,
  slides use `role="group"` + `aria-roledescription="slide"` and
  `aria-label="N of M: Title"`. Dot buttons announce "Go to slide N"
  and reflect `aria-current`.
- Keyboard: arrow-key navigation in carousels; Tab order follows DOM.
- Color contrast: white-on-primary, white-on-cta, foreground-on-surface
  all meet WCAG AA. Never rely on color alone (badges include text).
- Decorative icons get `aria-hidden`.

---

## 10. Data & state

- Product data is currently static in `src/data/products.ts`. Use the
  exported `Product` type and `categories` array — do not duplicate
  product shapes in components.
- Cart state is global via `CartContext` (`src/context/CartContext.tsx`).
  Read with `useCart()`; do not store cart state in component state or
  `localStorage` directly outside the context.
- For any future async data, use `@tanstack/react-query` (already
  provisioned in `App.tsx`).
- If persistent data is required, enable Lovable Cloud and use it
  instead of `localStorage`. Never store roles, prices, or any
  trust-sensitive data on the client.

---

## 11. Conventions for new code

Follow these rules when adding components or pages:

1. **Tokens only** — no hex, no `text-white`/`bg-black`, no arbitrary
   `bg-[#...]`. If a token is missing, add it to `index.css` and
   `tailwind.config.ts` first.
2. **Container** — wrap top-level page sections in `.container-abitaz`.
3. **Mobile-first** — design the `<md` layout, then layer on `md:`/`lg:`.
4. **Use the primitives** — `<SiteLayout>`, `<Button>`, `<ProductCard>`,
   shadcn/ui components. Don't recreate them.
5. **Headings** — use `font-display` (automatic on `h1`–`h5`); section
   titles are `text-2xl md:text-3xl font-bold`.
6. **Icons** — `lucide-react`, sized per §8.
7. **Images** — `alt` text mandatory; `loading="lazy"` by default;
   responsive `srcset` via `vite-imagetools` for hero/section imagery.
8. **SEO** — set `document.title` + meta description; exactly one `<h1>`.
9. **Accessibility** — labels, focus rings, ARIA roles for carousels and
   landmarks.
10. **No framework swap** — do not migrate to Next.js, Remix, Vue, etc.
    The project is React 18 + Vite + React Router by design.
11. **Routes** — register new pages in `src/App.tsx` above the `*` route.
12. **Refactor when needed** — keep components small and focused; extract
    shared UI to `src/components/...` rather than copy-pasting.

---

## 12. Reference: file map

- `src/index.css` — tokens, fonts, base layer, `.container-abitaz`
- `tailwind.config.ts` — token → Tailwind color mapping, `xs` breakpoint
- `src/components/layout/SiteLayout.tsx` — page chrome
- `src/components/layout/Header.tsx` — USP bar + blue bar + nav data
- `src/components/layout/Footer.tsx` — footer columns + payment + legal
- `src/components/layout/MegaMenu.tsx` / `MobileMenu.tsx` — navigation
- `src/components/home/HeroGrid.tsx` — hero (mobile carousel + desktop grid)
- `src/components/home/CategoryStrip.tsx` — category tile grid
- `src/components/home/TrustStrip.tsx` — pillars panel
- `src/components/home/PopularProducts.tsx`, `PromoBanners.tsx`, `BrandsBar.tsx`
- `src/components/product/ProductCard.tsx` — product tile
- `src/components/ui/*` — shadcn primitives
- `src/pages/*` — one file per route, all wrapped in `<SiteLayout>`
- `src/data/products.ts` — static product + category data
- `src/context/CartContext.tsx` — cart state

---

_Last updated: keep this file in sync with the codebase. If a PR changes
visual language, update the relevant section here in the same change._