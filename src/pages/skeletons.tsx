import { Link, useParams } from "react-router-dom";
import { PageSkeleton } from "@/components/PageSkeleton";

/* =========================================================================
   SKELETON PAGES — one component per missing route.
   Every page uses <PageSkeleton> for consistent header, breadcrumbs and
   wireframe blocks. Real implementation can grow inside each component
   without changing the route wiring.
   ========================================================================= */

/* ---------- Shop by room ---------- */

const rooms = [
  { slug: "living-room", name: "Living room" },
  { slug: "dining-room", name: "Dining room" },
  { slug: "kitchen", name: "Kitchen" },
  { slug: "bedroom", name: "Bedroom" },
  { slug: "bathroom", name: "Bathroom" },
  { slug: "home-office", name: "Home office" },
  { slug: "hallway", name: "Hallway" },
  { slug: "kids-room", name: "Kids room" },
  { slug: "outdoor", name: "Outdoor" },
];

export const RoomsIndex = () => (
  <PageSkeleton
    eyebrow="Shop by room"
    title="Find what fits the space, not just the category"
    description="Curated edits per room — lighting, furniture and accessories that work together."
    breadcrumbs={[{ label: "Rooms" }]}
    status="skeleton"
  >
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((r) => (
        <Link
          key={r.slug}
          to={`/rooms/${r.slug}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface transition hover:border-primary hover:shadow-md"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,hsl(var(--border))_47%,hsl(var(--border))_53%,transparent_54%)] bg-[length:14px_14px] opacity-40" />
          <div className="absolute inset-x-4 bottom-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Room</p>
            <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
              {r.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  </PageSkeleton>
);

export const RoomDetail = () => {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug);
  const title = room?.name ?? "Room";
  return (
    <PageSkeleton
      eyebrow="Shop by room"
      title={title}
      description="Reuses the CategoryTemplate (PLP). CMS supplies hero image, intro copy and curated product set."
      breadcrumbs={[{ label: "Rooms", to: "/rooms" }, { label: title }]}
      status="cms"
      blocks={[
        { label: "Hero banner (CMS image + intro)", height: "lg" },
        { label: "Sub-category chips (Lighting · Furniture · Accessories · Textiles)", height: "sm" },
        { label: "Product grid with facet rail", height: "xl" },
        { label: "Shop the look — inspiration scenes", height: "lg" },
        { label: "SEO copy block (CMS rich text)", height: "md" },
      ]}
    />
  );
};

/* ---------- Inspiration ---------- */

export const InspirationIndex = () => (
  <PageSkeleton
    eyebrow="Inspiration"
    title="Real spaces, shoppable scenes"
    description="Designer projects, customer homes and styling stories — every product clickable."
    breadcrumbs={[{ label: "Inspiration" }]}
    blocks={[
      { label: "Filter chips (Room · Style · Brand)", height: "sm" },
      { label: "Editorial masonry grid (mixed sizes, CMS-driven)", height: "xl" },
      { label: "Featured designer / brand spotlight", height: "lg" },
      { label: "Newsletter capture", height: "md" },
    ]}
  />
);

export const InspirationDetail = () => {
  const { slug } = useParams();
  return (
    <PageSkeleton
      eyebrow="Inspiration story"
      title={slug ? slug.replace(/-/g, " ") : "Story"}
      breadcrumbs={[{ label: "Inspiration", to: "/inspiration" }, { label: "Story" }]}
      status="cms"
      blocks={[
        { label: "Hero image (full-bleed)", height: "xl" },
        { label: "Intro paragraph + meta (author, date, room, style)", height: "md" },
        { label: "Rich text + image gallery (CMS)", height: "xl" },
        { label: "Shoppable hotspots — products in this scene", height: "lg" },
        { label: "Related stories", height: "md" },
      ]}
    />
  );
};

/* ---------- Curated edits ---------- */

export const NewArrivals = () => (
  <PageSkeleton
    eyebrow="Just landed"
    title="New arrivals"
    description="Latest products across every category — reuses the PLP template."
    breadcrumbs={[{ label: "New" }]}
    blocks={[
      { label: "Hero banner", height: "md" },
      { label: "PLP grid with facet rail", height: "xl" },
    ]}
  />
);

export const BestSellers = () => (
  <PageSkeleton
    eyebrow="Most loved"
    title="Best sellers"
    description="Top sellers by category. Strong social proof for cold traffic."
    breadcrumbs={[{ label: "Best sellers" }]}
    blocks={[
      { label: "Top 10 carousel", height: "lg" },
      { label: "By category tabs (Lighting · Furniture · Accessories)", height: "sm" },
      { label: "PLP grid", height: "xl" },
    ]}
  />
);

export const GiftCards = () => (
  <PageSkeleton
    eyebrow="The right gift, every time"
    title="Gift cards"
    description="Digital gift cards, instant delivery, any amount."
    breadcrumbs={[{ label: "Gift cards" }]}
    blocks={[
      { label: "Hero with card mock-up", height: "lg" },
      { label: "Amount selector + recipient form", height: "lg" },
      { label: "How it works (3 steps)", height: "md" },
      { label: "FAQ", height: "md" },
    ]}
  />
);

/* ---------- Wishlist ---------- */

export const Wishlist = () => (
  <PageSkeleton
    eyebrow="Saved for later"
    title="My wishlist"
    description="Persists in localStorage when logged out, syncs to account on sign-in."
    breadcrumbs={[{ label: "Wishlist" }]}
    blocks={[
      { label: "Empty state OR product grid", height: "xl" },
      { label: "Share wishlist (link / email)", height: "sm" },
    ]}
  />
);

/* ---------- Auth ---------- */

export const Login = () => (
  <PageSkeleton
    title="Sign in"
    description="Email + password. Social: Google, Apple."
    breadcrumbs={[{ label: "Sign in" }]}
    blocks={[
      { label: "Sign in form", height: "lg" },
      { label: "Social sign-in buttons", height: "sm" },
      { label: "Link to register / forgot password", height: "sm" },
    ]}
  />
);

export const Register = () => (
  <PageSkeleton
    title="Create account"
    breadcrumbs={[{ label: "Create account" }]}
    blocks={[
      { label: "Register form (email, password, consents)", height: "lg" },
      { label: "Why create an account — benefits list", height: "md" },
    ]}
  />
);

export const ForgotPassword = () => (
  <PageSkeleton
    title="Reset password"
    breadcrumbs={[{ label: "Forgot password" }]}
    blocks={[{ label: "Email input → send reset link", height: "md" }]}
  />
);

/* ---------- Account ---------- */

const accountTabs = [
  { to: "/account", label: "Overview" },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/returns", label: "Returns" },
];

const AccountShell = ({ title, blocks }: { title: string; blocks: { label: string; height?: "sm" | "md" | "lg" | "xl" }[] }) => (
  <PageSkeleton
    eyebrow="My account"
    title={title}
    breadcrumbs={[{ label: "Account", to: "/account" }, { label: title }]}
  >
    <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-lg border border-border bg-card p-3">
        <nav className="flex flex-col gap-1 text-sm">
          {accountTabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="rounded px-3 py-2 text-muted-foreground hover:bg-surface hover:text-primary"
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="space-y-4">
        {blocks.map((b, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-lg border border-dashed border-border bg-surface ${
              { sm: "h-24", md: "h-40", lg: "h-64", xl: "h-96" }[b.height ?? "md"]
            }`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,hsl(var(--border))_47%,hsl(var(--border))_53%,transparent_54%)] bg-[length:14px_14px] opacity-40" />
            <div className="absolute left-4 top-4 rounded bg-card px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </PageSkeleton>
);

export const AccountOverview = () => (
  <AccountShell
    title="Account overview"
    blocks={[
      { label: "Welcome + quick stats (orders, returns, wishlist count)", height: "md" },
      { label: "Recent orders (last 3)", height: "lg" },
      { label: "Saved addresses", height: "md" },
    ]}
  />
);
export const AccountOrders = () => (
  <AccountShell
    title="Orders"
    blocks={[
      { label: "Order list with status, tracking, reorder button", height: "xl" },
    ]}
  />
);
export const AccountAddresses = () => (
  <AccountShell
    title="Addresses"
    blocks={[
      { label: "Saved addresses (shipping + billing) + add new", height: "lg" },
    ]}
  />
);
export const AccountReturns = () => (
  <AccountShell
    title="Returns"
    blocks={[
      { label: "Return requests + status timeline", height: "lg" },
      { label: "Start a new return — order picker", height: "md" },
    ]}
  />
);

/* ---------- Customer service ---------- */

export const Help = () => (
  <PageSkeleton
    eyebrow="Help center"
    title="How can we help?"
    breadcrumbs={[{ label: "Help" }]}
    blocks={[
      { label: "Search bar", height: "sm" },
      { label: "Top topics grid (Delivery · Returns · Warranty · Track · Payment · Account)", height: "lg" },
      { label: "Contact options (chat · email · phone)", height: "md" },
    ]}
  />
);

export const FAQ = () => (
  <PageSkeleton
    title="Frequently asked questions"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "FAQ" }]}
    blocks={[
      { label: "Category tabs", height: "sm" },
      { label: "Accordion of Q&A pairs", height: "xl" },
    ]}
  />
);

export const Contact = () => (
  <PageSkeleton
    title="Contact us"
    description="Real humans, fast replies."
    breadcrumbs={[{ label: "Contact" }]}
    blocks={[
      { label: "Contact form", height: "lg" },
      { label: "Phone · email · hours · address", height: "md" },
      { label: "Live chat widget anchor", height: "sm" },
    ]}
  />
);

export const Delivery = () => (
  <PageSkeleton
    title="Delivery & shipping"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Delivery" }]}
    blocks={[
      { label: "Lead times per country (table)", height: "lg" },
      { label: "Shipping costs", height: "md" },
      { label: "Carriers + tracking", height: "md" },
    ]}
  />
);

export const Returns = () => (
  <PageSkeleton
    title="Returns policy"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Returns" }]}
    blocks={[
      { label: "30-day return guarantee — banner", height: "md" },
      { label: "How to return (3 steps)", height: "md" },
      { label: "Conditions + exclusions", height: "md" },
    ]}
  />
);

export const Warranty = () => (
  <PageSkeleton
    title="Warranty"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Warranty" }]}
    blocks={[
      { label: "Standard 2-year warranty overview", height: "md" },
      { label: "Per-brand warranty table", height: "lg" },
      { label: "How to claim", height: "md" },
    ]}
  />
);

export const TrackOrder = () => (
  <PageSkeleton
    title="Track your order"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Track order" }]}
    blocks={[
      { label: "Order # + email lookup", height: "md" },
      { label: "Status timeline", height: "md" },
    ]}
  />
);

/* ---------- Trade / Pro ---------- */

export const Pro = () => (
  <PageSkeleton
    eyebrow="For professionals"
    title="Abitaz Pro — for designers, electricians & architects"
    description="Bulk pricing, project orders, dedicated account manager, extended payment terms."
    breadcrumbs={[{ label: "Pro" }]}
    blocks={[
      { label: "Pro hero with apply CTA", height: "lg" },
      { label: "Benefits grid (Pricing · Stock · Support · Terms)", height: "lg" },
      { label: "Testimonials", height: "md" },
      { label: "Application form", height: "lg" },
    ]}
  />
);

/* ---------- Company ---------- */

export const About = () => (
  <PageSkeleton
    eyebrow="About"
    title="The smart shop for lighting & home"
    breadcrumbs={[{ label: "About" }]}
    blocks={[
      { label: "Brand story hero", height: "xl" },
      { label: "Mission + values", height: "lg" },
      { label: "Team + showroom", height: "lg" },
    ]}
  />
);

export const Sustainability = () => (
  <PageSkeleton
    title="Sustainability"
    breadcrumbs={[{ label: "About", to: "/about" }, { label: "Sustainability" }]}
    blocks={[
      { label: "Commitments hero", height: "lg" },
      { label: "Packaging · shipping · brands", height: "lg" },
      { label: "Certifications", height: "md" },
    ]}
  />
);

export const Careers = () => (
  <PageSkeleton
    title="Careers"
    breadcrumbs={[{ label: "Careers" }]}
    blocks={[
      { label: "Why work at Abitaz", height: "lg" },
      { label: "Open roles list", height: "xl" },
    ]}
  />
);

export const Press = () => (
  <PageSkeleton
    title="Press"
    breadcrumbs={[{ label: "Press" }]}
    blocks={[
      { label: "Press kit download", height: "md" },
      { label: "Recent coverage", height: "lg" },
      { label: "Press contact", height: "sm" },
    ]}
  />
);

export const Stores = () => (
  <PageSkeleton
    title="Stores & showroom"
    breadcrumbs={[{ label: "Stores" }]}
    blocks={[
      { label: "Map", height: "lg" },
      { label: "Store list with hours + directions", height: "xl" },
    ]}
  />
);

export const Blog = () => (
  <PageSkeleton
    eyebrow="Blog"
    title="Guides, news & lighting tips"
    breadcrumbs={[{ label: "Blog" }]}
    blocks={[
      { label: "Featured post hero", height: "xl" },
      { label: "Category chips", height: "sm" },
      { label: "Post grid (CMS)", height: "xl" },
    ]}
  />
);

export const BlogPost = () => {
  const { slug } = useParams();
  return (
    <PageSkeleton
      eyebrow="Blog"
      title={slug ? slug.replace(/-/g, " ") : "Post"}
      breadcrumbs={[{ label: "Blog", to: "/blog" }, { label: "Post" }]}
      status="cms"
      blocks={[
        { label: "Cover image", height: "xl" },
        { label: "Author + date + read time", height: "sm" },
        { label: "Rich text body (CMS)", height: "xl" },
        { label: "Related posts + related products", height: "md" },
      ]}
    />
  );
};

/* ---------- Legal ---------- */

export const Terms = () => (
  <PageSkeleton
    title="Terms & conditions"
    breadcrumbs={[{ label: "Legal" }, { label: "Terms" }]}
    blocks={[{ label: "Long-form rich text (legal review required)", height: "xl" }]}
  />
);
export const Privacy = () => (
  <PageSkeleton
    title="Privacy policy"
    breadcrumbs={[{ label: "Legal" }, { label: "Privacy" }]}
    blocks={[{ label: "Long-form rich text — GDPR compliant", height: "xl" }]}
  />
);
export const Cookies = () => (
  <PageSkeleton
    title="Cookie policy"
    breadcrumbs={[{ label: "Legal" }, { label: "Cookies" }]}
    blocks={[
      { label: "Cookie categories + toggles", height: "lg" },
      { label: "Policy text", height: "lg" },
    ]}
  />
);