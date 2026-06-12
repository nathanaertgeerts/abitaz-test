import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Bath,
  Bed,
  Briefcase,
  Check,
  ChefHat,
  ChevronRight,
  Clock,
  Coffee,
  Download,
  Eye,
  EyeOff,
  Filter,
  Gift,
  Headset,
  Heart,
  Home as HomeIcon,
  Layers,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  Package,
  Palette,
  Phone,
  Plus,
  RotateCcw,
  Search as SearchIcon,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Tag,
  Trees,
  Truck,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  AccountLayout,
  AuthCard,
  Btn,
  Card,
  EmptyState,
  FAQAccordion,
  FeatureGrid,
  Field,
  ImagePlaceholder,
  LegalDoc,
  Page,
  PageHero,
  SampleProductGrid,
  SectionHeading,
  StatusPill,
  StepsList,
  TextArea,
  TextInput,
  Timeline,
} from "@/components/design/primitives";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

/* =========================================================================
   Designed pages — one per route used in src/lib/sitemap.ts (P0–P3).
   Reuses brand tokens (primary blue / cta orange / Manrope display).
   Placeholder copy + existing product data — designers can polish in place.
   ========================================================================= */

/* ============================================================
   SHOP BY ROOM
   ============================================================ */

const rooms = [
  { slug: "living-room", name: "Living room", icon: HomeIcon, blurb: "Ambient layers, statement pendants, warm corners." },
  { slug: "dining-room", name: "Dining room", icon: Coffee, blurb: "Pendants over the table, dimmable, social." },
  { slug: "kitchen", name: "Kitchen", icon: ChefHat, blurb: "Task lighting, under-cabinet, high CRI." },
  { slug: "bedroom", name: "Bedroom", icon: Bed, blurb: "Warm 2700K, bedside reading, soft floor lamps." },
  { slug: "bathroom", name: "Bathroom", icon: Bath, blurb: "IP44+, mirror lighting, moisture safe." },
  { slug: "home-office", name: "Home office", icon: Briefcase, blurb: "Glare-free desk light, 4000K focus." },
  { slug: "hallway", name: "Hallway", icon: Layers, blurb: "Sconces, motion, low-glare ceiling." },
  { slug: "kids-room", name: "Kids room", icon: Star, blurb: "Playful, dimmable, low-voltage safe." },
  { slug: "outdoor", name: "Outdoor", icon: Trees, blurb: "IP65, path lights, façade & garden." },
];

export const RoomsIndex = () => (
  <Page crumbs={[{ label: "Rooms" }]}>
    <PageHero
      eyebrow="Shop by room"
      title="Find what fits the space, not just the category"
      description="Curated lighting per space — every room scene picked by our in-house design team."
      actions={
        <>
          <Btn to="/inspiration" variant="cta">Browse inspiration <ArrowRight className="h-4 w-4" /></Btn>
          <Btn to="/guides/lighting-planner" variant="outline">Use lighting planner</Btn>
        </>
      }
    />
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((r) => {
        const Icon = r.icon;
        return (
          <Link
            key={r.slug}
            to={`/rooms/${r.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg"
          >
            <ImagePlaceholder aspect="aspect-[5/4]" label={`Scene · ${r.name}`} />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-bold group-hover:text-primary">{r.name}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Shop the room <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  </Page>
);

export const RoomDetail = () => {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug) ?? rooms[0];
  return (
    <Page crumbs={[{ label: "Rooms", to: "/rooms" }, { label: room.name }]}>
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <ImagePlaceholder aspect="aspect-[4/3]" label={`${room.name} scene`} tone="warm" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Shop by room</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{room.name}</h1>
          <p className="mt-3 text-muted-foreground">{room.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {["Pendants", "Floor lamps", "Wall lamps", "Smart bulbs", "Accessories"].map((c) => (
              <span key={c} className="rounded-full border border-border bg-surface px-3 py-1 text-muted-foreground">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading
          kicker="Best for this room"
          title="Designer picks"
          action={<Btn to="/categories" variant="outline" size="sm">All products</Btn>}
        />
        <SampleProductGrid count={8} />
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-10">
        <SectionHeading kicker="Shop the look" title="A complete styled scene" />
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <ImagePlaceholder aspect="aspect-[16/10]" label="Editorial scene" />
          <ul className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <li key={p.slug} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                <img src={p.image} alt="" className="h-16 w-16 rounded bg-surface object-contain" />
                <div className="min-w-0 flex-1">
                  <Link to={`/products/${p.slug}`} className="block truncate font-medium hover:text-primary">{p.name}</Link>
                  <p className="text-xs text-muted-foreground">{p.brand}</p>
                  <p className="mt-1 text-sm font-bold text-primary">€{p.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
};

/* ============================================================
   INSPIRATION
   ============================================================ */

const inspirationStories = [
  { slug: "warm-minimalist-loft", title: "A warm minimalist loft in Antwerp", room: "Living room", tag: "Designer project" },
  { slug: "scandi-kitchen-glow", title: "Scandi kitchen glow with PH5", room: "Kitchen", tag: "Customer home" },
  { slug: "dark-academia-office", title: "Dark academia home office", room: "Home office", tag: "Styling story" },
  { slug: "outdoor-dining-lights", title: "Outdoor dining: festoons & spots", room: "Outdoor", tag: "Designer project" },
  { slug: "kids-room-rainbow", title: "Soft rainbow kids' room", room: "Kids room", tag: "Customer home" },
  { slug: "spa-bathroom-mood", title: "Spa-mood bathroom lighting", room: "Bathroom", tag: "Styling story" },
];

export const InspirationIndex = () => (
  <Page crumbs={[{ label: "Inspiration" }]}>
    <PageHero
      eyebrow="Inspiration"
      title="Real spaces. Shoppable scenes."
      description="Designer projects, customer homes and styling stories — every product clickable."
    />
    <div className="mt-8 flex flex-wrap gap-2 text-xs">
      {["All", "Room", "Style", "Brand", "Designer"].map((c, i) => (
        <button
          key={c}
          className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
        >
          {c}
        </button>
      ))}
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {inspirationStories.map((s, i) => (
        <Link
          key={s.slug}
          to={`/inspiration/${s.slug}`}
          className={`group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
        >
          <ImagePlaceholder
            aspect={i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}
            label={s.room}
            tone={i === 0 ? "primary" : "muted"}
          />
          <div className="p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{s.tag}</span>
            <h3 className="mt-1 font-display text-lg font-bold group-hover:text-primary">{s.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.room}</p>
          </div>
        </Link>
      ))}
    </div>
  </Page>
);

export const InspirationDetail = () => {
  const { slug } = useParams();
  const story = inspirationStories.find((s) => s.slug === slug) ?? inspirationStories[0];
  return (
    <Page crumbs={[{ label: "Inspiration", to: "/inspiration" }, { label: story.title }]}>
      <article className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">{story.tag} · {story.room}</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{story.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface"><User className="h-4 w-4" /></span>
          <span>By Lotte De Wit · 6 min read · March 2026</span>
        </div>
        <div className="mt-8">
          <ImagePlaceholder aspect="aspect-[16/9]" label="Hero photograph" tone="primary" />
        </div>
        <p className="mt-8 text-base leading-relaxed text-foreground/85">
          Set the scene in two paragraphs of editorial intro. The CMS body block goes here —
          rich text, inline images, pull-quotes. Designers can paste real long-form copy in
          and the layout will hold.
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/85">
          A second paragraph that explores the styling choices and how each light fixture
          contributes to the mood. Keep paragraphs short for screen readability.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <ImagePlaceholder aspect="aspect-square" label="Detail · pendant" />
          <ImagePlaceholder aspect="aspect-square" label="Detail · ambient" />
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <SectionHeading kicker="Shop this scene" title="Featured products" />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {products.slice(0, 3).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </article>
    </Page>
  );
};

/* ============================================================
   CURATED EDITS — New, Best sellers, Gift cards
   ============================================================ */

const plpToolbar = (count: number) => (
  <div className="mt-8 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 sm:justify-between">
    <button className="inline-flex shrink-0 items-center gap-2 rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-muted">
      <Filter className="h-4 w-4" /> Filters
    </button>
    <span className="text-sm text-muted-foreground sm:order-none order-3 basis-full sm:basis-auto">{count} products</span>
    <select className="input h-9 w-full max-w-none text-sm sm:ml-auto sm:w-auto sm:max-w-[220px]">
      <option>Sort: Newest</option>
      <option>Sort: Price low → high</option>
      <option>Sort: Price high → low</option>
      <option>Sort: Best sellers</option>
    </select>
  </div>
);

export const NewArrivals = () => (
  <Page crumbs={[{ label: "New arrivals" }]}>
    <PageHero
      eyebrow="Just landed"
      title="New arrivals"
      description="The latest fixtures from our designer brands — refreshed weekly."
    />
    {plpToolbar(124)}
    <div className="mt-6"><SampleProductGrid count={12} /></div>
  </Page>
);

export const BestSellers = () => (
  <Page crumbs={[{ label: "Best sellers" }]}>
    <PageHero
      eyebrow="Most loved"
      title="Best sellers"
      description="The pieces our customers keep coming back to — across every category."
    />
    <div className="mt-10">
      <SectionHeading kicker="Top 10" title="The lights of the moment" />
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {products.slice(0, 10).map((p, i) => (
          <div key={p.slug} className="relative w-[220px] shrink-0 snap-start">
            <span className="absolute -left-1 -top-1 z-10 grid h-8 w-8 place-items-center rounded-full bg-cta text-cta-foreground font-display text-sm font-bold">{i + 1}</span>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-10 flex flex-wrap gap-2 text-sm">
      {["All", "Lighting", "Furniture", "Accessories"].map((c, i) => (
        <button key={c} className={`rounded-md px-3 py-1.5 ${i === 0 ? "bg-foreground text-background" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{c}</button>
      ))}
    </div>
    <div className="mt-6"><SampleProductGrid count={12} /></div>
  </Page>
);

export const GiftCards = () => {
  const [amount, setAmount] = useState(75);
  return (
    <Page crumbs={[{ label: "Gift cards" }]}>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative">
          <div className="aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-primary to-primary-hover p-6 text-primary-foreground shadow-xl">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold tracking-tight">Abitaz</span>
                <Gift className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-primary-foreground/70">Gift card</p>
                <p className="font-display text-4xl font-bold">€ {amount}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">The right gift</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Abitaz gift card</h1>
          <p className="mt-3 text-muted-foreground">Digital, instant delivery, valid 2 years. Any amount between €25 and €500.</p>
          <div className="mt-6">
            <p className="text-sm font-medium">Amount</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[25, 50, 75, 100, 200].map((a) => (
                <button
                  key={a}
                  onClick={() => setAmount(a)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition ${amount === a ? "bg-primary text-primary-foreground" : "border border-input hover:bg-muted"}`}
                >
                  €{a}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Recipient name" required><TextInput placeholder="Anna Janssens" /></Field>
            <Field label="Recipient email" required><TextInput type="email" placeholder="anna@example.com" /></Field>
          </div>
          <Field label="Personal message"><TextArea rows={3} placeholder="Happy housewarming…" /></Field>
          <Btn variant="cta" size="lg" className="mt-5 w-full">Add to cart · €{amount.toFixed(2)}</Btn>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading kicker="How it works" title="Three steps, no paper" />
        <StepsList items={[
          { title: "Pick an amount", body: "From €25 to €500. Add a personal message if you like." },
          { title: "Choose delivery", body: "Send instantly by email or schedule for the perfect day." },
          { title: "Redeem at checkout", body: "One-time code, valid for 2 years on everything we sell." },
        ]} />
      </div>
    </Page>
  );
};

/* ============================================================
   WISHLIST
   ============================================================ */

export const Wishlist = () => (
  <Page crumbs={[{ label: "Wishlist" }]}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Saved for later</p>
        <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">My wishlist</h1>
        <p className="mt-2 text-sm text-muted-foreground">Synced across devices when signed in.</p>
      </div>
      <Btn variant="outline" size="sm"><Mail className="h-4 w-4" /> Share wishlist</Btn>
    </div>
    <div className="mt-8"><SampleProductGrid count={6} /></div>
    <div className="mt-10 rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
      Not signed in? Your wishlist lives in this browser until you sign in — then it syncs to your account.
    </div>
  </Page>
);

/* ============================================================
   AUTH — Login / Register / Forgot
   ============================================================ */

export const Login = () => {
  const [showPw, setShowPw] = useState(false);
  return (
    <Page crumbs={[{ label: "Sign in" }]}>
      <AuthCard
        eyebrow="Welcome back"
        title="Sign in to Abitaz"
        description="Use email + one-time code, or your password. New here? Pick the right account type below."
        footer={
          <>
            New customer?{" "}
            <Link to="/signup/particulier" className="font-semibold text-primary hover:underline">Create a personal account</Link>{" "}or{" "}
            <Link to="/signup/b2b" className="font-semibold text-primary hover:underline">apply for trade</Link>.
          </>
        }
      >
        <Field label="Email" required><TextInput type="email" autoComplete="email" placeholder="you@example.com" /></Field>
        <Field label="Password">
          <div className="relative">
            <TextInput type={showPw ? "text" : "password"} autoComplete="current-password" placeholder="Or skip and use a one-time code" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" /> Remember me</label>
          <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <Btn variant="cta" size="lg" className="w-full">Sign in</Btn>
        <Btn to="/login/otp" variant="outline" className="w-full">Send me a one-time code instead</Btn>
        <div className="relative my-2 text-center text-xs text-muted-foreground">
          <span className="bg-card px-2 relative z-10">or continue with</span>
          <span className="absolute left-0 right-0 top-1/2 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Btn variant="outline">Google</Btn>
          <Btn variant="outline">Apple</Btn>
        </div>
      </AuthCard>
    </Page>
  );
};

export const Register = () => (
  <Page crumbs={[{ label: "Create account" }]}>
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      <Link to="/signup/particulier" className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-md">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary"><User className="h-5 w-5" /></div>
        <h2 className="mt-4 font-display text-xl font-bold">Personal account</h2>
        <p className="mt-2 text-sm text-muted-foreground">Quick checkout, order history, wishlist sync. For households and home renovators.</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Continue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
      </Link>
      <Link to="/signup/b2b" className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-md">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-cta/10 text-cta"><Briefcase className="h-5 w-5" /></div>
        <h2 className="mt-4 font-display text-xl font-bold">Trade / Pro account</h2>
        <p className="mt-2 text-sm text-muted-foreground">Bulk pricing, project orders, payment terms. Designers, electricians, architects.</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Apply <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
      </Link>
    </div>
  </Page>
);

export const ForgotPassword = () => (
  <Page crumbs={[{ label: "Forgot password" }]}>
    <AuthCard title="Reset your password" description="Enter your email and we'll send you a reset link. The link is valid for 30 minutes.">
      <Field label="Email" required><TextInput type="email" placeholder="you@example.com" /></Field>
      <Btn variant="cta" size="lg" className="w-full">Send reset link</Btn>
      <p className="text-center text-sm text-muted-foreground">
        Remembered it? <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
      </p>
    </AuthCard>
  </Page>
);

/* ============================================================
   ACCOUNT — Overview / Orders / Addresses / Returns
   ============================================================ */

const sampleOrders = [
  { id: "AB-7K2QXC", date: "12 Mar 2026", total: 1027.74, status: "Delivered", state: "success" as const, items: 3 },
  { id: "AB-7H9PB1", date: "04 Mar 2026", total: 318.0, status: "In transit", state: "info" as const, items: 1 },
  { id: "AB-7G2KE4", date: "18 Feb 2026", total: 79.0, status: "Returned", state: "muted" as const, items: 1 },
];

export const AccountOverview = () => (
  <AccountLayout active="/account" title="Hi, Lotte 👋" description="A quick look at your account." crumbs={[{ label: "Account" }]}>
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { icon: Package, label: "Orders", value: "12" },
        { icon: RotateCcw, label: "Open returns", value: "1" },
        { icon: Heart, label: "Wishlist", value: "8" },
      ].map((s) => {
        const Icon = s.icon;
        return (
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold">{s.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>

    <Card title="Recent orders" action={<Link to="/account/orders" className="text-sm font-semibold text-primary hover:underline">View all</Link>}>
      <ul className="divide-y divide-border">
        {sampleOrders.slice(0, 3).map((o) => (
          <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <Link to={`/account/orders/${o.id}`} className="font-semibold hover:text-primary">{o.id}</Link>
              <p className="text-xs text-muted-foreground">{o.date} · {o.items} item{o.items > 1 ? "s" : ""}</p>
            </div>
            <StatusPill tone={o.state}>{o.status}</StatusPill>
            <span className="font-display font-bold tabular-nums">€{o.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </Card>

    <Card title="Default address">
      <p className="text-sm">Lotte De Wit<br />Industriepark 13B, 2220 Heist-op-den-Berg<br />Belgium</p>
      <Btn to="/account/addresses" variant="outline" size="sm" className="mt-4">Manage addresses</Btn>
    </Card>
  </AccountLayout>
);

export const AccountOrders = () => (
  <AccountLayout active="/account/orders" title="Orders" description="Every order you've placed with Abitaz.">
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full flex-1 sm:min-w-[200px]">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input className="input pl-9" placeholder="Search by order #, product, SKU…" />
        </div>
        <select className="input h-10 w-full sm:w-auto"><option>All statuses</option><option>Delivered</option><option>In transit</option><option>Returned</option></select>
      </div>
    </Card>
    <Card>
      <ul className="divide-y divide-border">
        {sampleOrders.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-3 py-4 md:grid md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-center md:gap-4">
            <div className="min-w-0 flex-1 md:flex-none">
              <Link to={`/account/orders/${o.id}`} className="font-semibold hover:text-primary">{o.id}</Link>
              <p className="text-xs text-muted-foreground">{o.date}</p>
            </div>
            <div className="text-sm text-muted-foreground md:order-none order-3 basis-full md:basis-auto">{o.items} item{o.items > 1 ? "s" : ""}</div>
            <div className="order-2 md:order-none"><StatusPill tone={o.state}>{o.status}</StatusPill></div>
            <div className="ml-auto flex items-center justify-end gap-2 md:ml-0">
              <span className="font-display font-bold tabular-nums">€{o.total.toFixed(2)}</span>
              <Btn to={`/account/orders/${o.id}`} variant="outline" size="sm">View</Btn>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  </AccountLayout>
);

export const AccountAddresses = () => (
  <AccountLayout active="/account/addresses" title="Addresses" actions={<Btn variant="cta" size="sm"><Plus className="h-4 w-4" /> Add address</Btn>}>
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { tag: "Default · Shipping", name: "Lotte De Wit", body: "Industriepark 13B\n2220 Heist-op-den-Berg\nBelgium\n+32 470 12 34 56" },
        { tag: "Billing", name: "TE.IT srl", body: "Via Monte Napoleone 8\n20121 Milano\nItalia\nVAT IT12345678901" },
      ].map((a, i) => (
        <Card key={i}>
          <StatusPill tone={i === 0 ? "info" : "muted"}>{a.tag}</StatusPill>
          <p className="mt-3 font-semibold">{a.name}</p>
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{a.body}</p>
          <div className="mt-4 flex gap-2">
            <Btn variant="outline" size="sm">Edit</Btn>
            <Btn variant="ghost" size="sm">Delete</Btn>
          </div>
        </Card>
      ))}
    </div>
  </AccountLayout>
);

export const AccountReturns = () => (
  <AccountLayout active="/account/returns" title="Returns" description="Track in-progress returns and start a new one.">
    <Card title="Open returns">
      <div className="rounded-lg border border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">Return #RMA-22418</p>
            <p className="text-xs text-muted-foreground">For order AB-7G2KE4 · opened 19 Feb 2026</p>
          </div>
          <StatusPill tone="warn">Awaiting pickup</StatusPill>
        </div>
        <div className="mt-4">
          <Timeline steps={[
            { label: "Return requested", meta: "19 Feb 2026", state: "done" },
            { label: "Label sent", meta: "20 Feb 2026", state: "done" },
            { label: "Pickup scheduled", meta: "23 Feb 2026", state: "current" },
            { label: "Refund issued", state: "todo" },
          ]} />
        </div>
      </div>
    </Card>
    <Card title="Start a new return" action={<Btn variant="cta" size="sm">Pick an order</Btn>}>
      <p className="text-sm text-muted-foreground">EU 14-day right of withdrawal applies. We handle pickup or you drop off at any Bpost point.</p>
    </Card>
  </AccountLayout>
);

/* ============================================================
   CUSTOMER SERVICE
   ============================================================ */

const helpTopics = [
  { icon: Truck, label: "Delivery", to: "/delivery" },
  { icon: RotateCcw, label: "Returns", to: "/returns" },
  { icon: ShieldCheck, label: "Warranty", to: "/warranty" },
  { icon: Package, label: "Track order", to: "/track-order" },
  { icon: Wallet, label: "Payment", to: "/payment-options" },
  { icon: User, label: "Account", to: "/account" },
];

export const Help = () => (
  <Page crumbs={[{ label: "Help" }]}>
    <section className="rounded-2xl bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">Help center</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">How can we help?</h1>
        <div className="relative mt-6">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input className="h-12 w-full rounded-md border border-input bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground" placeholder="Search articles — e.g. 'change address'" />
        </div>
      </div>
    </section>
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {helpTopics.map((t) => {
        const Icon = t.icon;
        return (
          <Link key={t.label} to={t.to} className="group rounded-lg border border-border bg-card p-4 text-center transition hover:border-primary hover:shadow-md">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
            <p className="mt-3 text-sm font-semibold">{t.label}</p>
          </Link>
        );
      })}
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      <Card title="Live chat"><p className="text-sm text-muted-foreground">Mon–Fri · 9:00–17:00 CET</p><Btn variant="cta" size="sm" className="mt-3"><MessageCircle className="h-4 w-4" /> Start chat</Btn></Card>
      <Card title="Email"><p className="text-sm text-muted-foreground">Reply within 1 working day.</p><a href="mailto:hello@abitaz.com" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">hello@abitaz.com <ArrowRight className="h-4 w-4" /></a></Card>
      <Card title="Phone"><p className="text-sm text-muted-foreground">Mon–Fri · 9:00–17:00</p><p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold"><Phone className="h-4 w-4 text-primary" /> +32 15 67 89 00</p></Card>
    </div>
  </Page>
);

const faqItems = [
  { q: "How long does delivery take?", a: "Standard delivery is free across Belgium and the Netherlands in 3–5 working days. Express is 2–3 days for €14.95." },
  { q: "Can I return a product?", a: "Yes. EU 14-day right of withdrawal applies; some categories (custom-made, opened bulbs) are excluded." },
  { q: "Do you ship to Italy?", a: "Yes. We ship to all EU countries from our Heist-op-den-Berg warehouse." },
  { q: "How do I track my order?", a: "Use /track-order with your order number and email, or sign in to your account." },
  { q: "Do you offer trade pricing?", a: "Apply at /pro — approval typically within 2 working days." },
];

export const FAQ = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "FAQ" }]}>
    <PageHero eyebrow="FAQ" title="Frequently asked questions" />
    <div className="mt-8 flex flex-wrap gap-2 text-sm">
      {["All", "Orders", "Delivery", "Returns", "Payment", "Account"].map((c, i) => (
        <button key={c} className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{c}</button>
      ))}
    </div>
    <div className="mt-6"><FAQAccordion items={faqItems} /></div>
  </Page>
);

export const Contact = () => (
  <Page crumbs={[{ label: "Contact" }]}>
    <PageHero eyebrow="Get in touch" title="We're real humans" description="Pick the channel that suits you — our team replies fast." />
    <div className="mt-10 grid gap-8 md:grid-cols-[1fr_360px]">
      <Card title="Send us a message">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" required><TextInput /></Field>
            <Field label="Email" required><TextInput type="email" /></Field>
          </div>
          <Field label="Order # (optional)" hint="Helps us reply faster"><TextInput placeholder="AB-XXXXXX" /></Field>
          <Field label="Subject" required><TextInput /></Field>
          <Field label="Message" required><TextArea rows={6} /></Field>
          <Btn variant="cta" size="lg">Send message</Btn>
        </div>
      </Card>
      <div className="space-y-4">
        <Card>
          <h3 className="font-display font-bold">Headquarters</h3>
          <p className="mt-2 inline-flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Industriepark 13B Zone B<br />2220 Heist-op-den-Berg<br />Belgium
          </p>
        </Card>
        <Card>
          <h3 className="font-display font-bold">Direct</h3>
          <p className="mt-3 inline-flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary" /> +32 15 67 89 00</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary" /> hello@abitaz.com</p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> Mon–Fri 9:00–17:00 CET</p>
        </Card>
      </div>
    </div>
  </Page>
);

export const Delivery = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Delivery" }]}>
    <PageHero eyebrow="Delivery & shipping" title="Free across the Benelux" description="Standard delivery to BE, NL & LU is free above €50. Express available on request." />
    <div className="mt-10 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left">
          <tr><th className="px-4 py-3">Country</th><th className="px-4 py-3">Standard</th><th className="px-4 py-3">Express</th><th className="px-4 py-3">Lead time</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            ["Belgium", "Free > €50", "€14.95", "3–5 days"],
            ["Netherlands", "Free > €50", "€14.95", "3–5 days"],
            ["Luxembourg", "Free > €75", "€19.95", "4–6 days"],
            ["France", "€9.95", "€24.95", "4–7 days"],
            ["Germany", "€9.95", "€24.95", "4–7 days"],
            ["Italy", "€14.95", "€29.95", "5–8 days"],
          ].map((r) => (
            <tr key={r[0]} className="bg-card"><td className="px-4 py-3 font-medium">{r[0]}</td><td className="px-4 py-3">{r[1]}</td><td className="px-4 py-3">{r[2]}</td><td className="px-4 py-3 text-muted-foreground">{r[3]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <Card><Truck className="h-6 w-6 text-primary" /><h3 className="mt-2 font-bold">Carriers</h3><p className="mt-1 text-sm text-muted-foreground">Bpost, PostNL, DPD — auto-selected by parcel size & destination.</p></Card>
      <Card><Package className="h-6 w-6 text-primary" /><h3 className="mt-2 font-bold">Bulky items</h3><p className="mt-1 text-sm text-muted-foreground">Large fixtures ship two-person service with a 2-hour delivery window.</p></Card>
      <Card><HomeIcon className="h-6 w-6 text-primary" /><h3 className="mt-2 font-bold">Pickup</h3><p className="mt-1 text-sm text-muted-foreground">Free pickup at our Heist-op-den-Berg warehouse, next business day.</p></Card>
    </div>
  </Page>
);

export const Returns = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Returns" }]}>
    <section className="rounded-2xl bg-success/10 p-8 md:p-12">
      <p className="text-xs font-semibold uppercase tracking-wider text-success">30-day guarantee</p>
      <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Changed your mind? No problem.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Return any unused product within 30 days for a full refund — that's 16 days on top of the EU minimum.</p>
      <Btn to="/account/returns" variant="cta" size="lg" className="mt-5">Start a return</Btn>
    </section>
    <div className="mt-12">
      <SectionHeading title="Three simple steps" />
      <StepsList items={[
        { title: "Start in your account", body: "Pick the order, choose which items and the reason." },
        { title: "Print or scan the label", body: "We email a free return label within minutes." },
        { title: "Drop off or schedule pickup", body: "Any Bpost point in BE, PostNL in NL, or book a pickup." },
      ]} />
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-2">
      <Card title="What can be returned"><ul className="space-y-2 text-sm text-foreground/85">{["Unused & in original packaging", "All standard catalogue items", "Sale & discounted items"].map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-success" /> {x}</li>)}</ul></Card>
      <Card title="Exclusions"><ul className="space-y-2 text-sm text-muted-foreground">{["Custom-made / made-to-order fixtures", "Opened or installed bulbs", "Hygiene-sealed accessories"].map((x) => <li key={x} className="flex gap-2"><span className="h-4 w-4 rounded-full border border-muted-foreground/40" /> {x}</li>)}</ul></Card>
    </div>
  </Page>
);

export const Warranty = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Warranty" }]}>
    <PageHero eyebrow="Warranty" title="2-year warranty on everything" description="Standard EU legal warranty plus extended cover from select brands." />
    <div className="mt-10 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left"><tr><th className="px-4 py-3">Brand</th><th className="px-4 py-3">Standard</th><th className="px-4 py-3">Extended</th></tr></thead>
        <tbody className="divide-y divide-border bg-card">
          {[["Louis Poulsen", "2 years", "5 years (LED driver)"], ["&tradition", "2 years", "—"], ["Artemide", "2 years", "5 years (LED modules)"], ["SLV", "2 years", "5 years (registered)"], ["VYSN", "5 years", "—"]].map((r) => (
            <tr key={r[0]}><td className="px-4 py-3 font-medium">{r[0]}</td><td className="px-4 py-3">{r[1]}</td><td className="px-4 py-3 text-muted-foreground">{r[2]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-10">
      <SectionHeading title="How to claim" />
      <StepsList items={[
        { title: "Find your order", body: "Sign in or use the guest lookup with your order #." },
        { title: "Open a claim", body: "Describe the issue, add photos. Takes 2 minutes." },
        { title: "Repair, replace, refund", body: "We pick the fastest fix — usually a replacement in 5 days." },
      ]} />
    </div>
  </Page>
);

export const TrackOrder = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Track order" }]}>
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Track your order</p>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">Where is my parcel?</h1>
        <p className="mt-3 text-muted-foreground">Enter your order number and the email used at checkout — no account required.</p>
        <Card className="mt-6">
          <div className="space-y-4">
            <Field label="Order number" required><TextInput placeholder="AB-XXXXXX" /></Field>
            <Field label="Email" required><TextInput type="email" placeholder="you@example.com" /></Field>
            <Btn variant="cta" size="lg" className="w-full">Track order</Btn>
            <p className="text-xs text-muted-foreground">Have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link> for full history.</p>
          </div>
        </Card>
      </div>
      <Card title="Example status">
        <Timeline steps={[
          { label: "Order received", meta: "Mon 09:14", state: "done" },
          { label: "Picked & packed", meta: "Mon 14:02", state: "done" },
          { label: "Handed to carrier", meta: "Tue 06:45", state: "done" },
          { label: "Out for delivery", meta: "Wed", state: "current" },
          { label: "Delivered", state: "todo" },
        ]} />
      </Card>
    </div>
  </Page>
);

/* ============================================================
   PRO
   ============================================================ */

export const Pro = () => (
  <Page crumbs={[{ label: "Pro" }]}>
    <section className="overflow-hidden rounded-2xl border border-border bg-foreground text-background">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta">Abitaz Pro</p>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">Built for designers, electricians & architects.</h1>
          <p className="mt-4 text-background/80">Trade pricing, project orders, payment terms up to 30 days and a dedicated account manager.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn to="/pro/apply" variant="cta">Apply now</Btn>
            <Btn to="/pro/quote" variant="outline" className="border-background/20 bg-transparent text-background hover:bg-background/10">Request a quote</Btn>
          </div>
        </div>
        <div className="bg-primary/20 p-8 md:p-12">
          <ImagePlaceholder aspect="aspect-[4/3]" label="Project photography" tone="primary" />
        </div>
      </div>
    </section>
    <div className="mt-12">
      <SectionHeading title="Why pros choose Abitaz" />
      <FeatureGrid cols={4} items={[
        { icon: Tag, title: "Trade pricing", body: "Pricelist scaled to your account tier — visible after login." },
        { icon: Layers, title: "Project orders", body: "Multi-delivery, partial invoicing, change orders." },
        { icon: Wallet, title: "Payment terms", body: "Net-15 or Net-30 after approval. Stripe-via-Odoo invoicing." },
        { icon: Headset, title: "Account manager", body: "Direct line, project briefs, technical sourcing." },
      ]} />
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <p className="font-display text-base italic">"Their bulk quoting saved us a week on the Brera relighting project."</p>
          <p className="mt-3 text-sm font-semibold">Studio Moretti · Milano</p>
        </Card>
      ))}
    </div>
  </Page>
);

/* ============================================================
   COMPANY
   ============================================================ */

export const About = () => (
  <Page crumbs={[{ label: "About" }]}>
    <PageHero eyebrow="About Abitaz" title="The smart shop for lighting & home." description="Operated by TE.IT srl, Milano — building a careful, curated home-lighting destination for Europe." />
    <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
      <ImagePlaceholder aspect="aspect-[4/3]" label="Founders + showroom" tone="warm" />
      <div>
        <SectionHeading kicker="Our story" title="Lighting that earns its place" />
        <p className="text-muted-foreground">We started Abitaz because buying good lighting online was still painful — confusing specs, dead stockists, and the same ten products on every site. We carry brands we love, write specs we'd want to read, and ship from one warehouse in Heist-op-den-Berg.</p>
      </div>
    </div>
    <div className="mt-16">
      <SectionHeading title="Values" />
      <FeatureGrid cols={3} items={[
        { icon: Award, title: "Curated, not endless", body: "Every brand vetted; every product specced by a human." },
        { icon: Leaf, title: "Built to last", body: "Replaceable LED modules, repairable fixtures, long warranties." },
        { icon: Users, title: "Real customer service", body: "Real people in Heist-op-den-Berg. Mon–Fri 9–17." },
      ]} />
    </div>
  </Page>
);

export const Sustainability = () => (
  <Page crumbs={[{ label: "About", to: "/about" }, { label: "Sustainability" }]}>
    <PageHero eyebrow="Sustainability" title="Lighting with a longer life" description="The greenest fixture is the one you don't have to replace." tone="muted" />
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {[
        { icon: Leaf, title: "Recyclable packaging", body: "FSC paperboard, no plastic foam, ink-free labels." },
        { icon: Truck, title: "Consolidated shipping", body: "One warehouse, one parcel — fewer miles per fixture." },
        { icon: Lightbulb, title: "Repair-first", body: "Spare parts catalogue for every brand we sell." },
      ].map((b) => {
        const I = b.icon;
        return <Card key={b.title}><span className="grid h-10 w-10 place-items-center rounded-md bg-success/15 text-success"><I className="h-5 w-5" /></span><h3 className="mt-3 font-display font-bold">{b.title}</h3><p className="mt-1 text-sm text-muted-foreground">{b.body}</p></Card>;
      })}
    </div>
    <div className="mt-12">
      <SectionHeading title="Certifications" />
      <div className="flex flex-wrap gap-3">
        {["B Corp (pending)", "FSC packaging", "ISO 14001 (warehouse)", "EU energy label compliant"].map((c) => (
          <span key={c} className="rounded-md border border-border bg-card px-3 py-2 text-sm">{c}</span>
        ))}
      </div>
    </div>
  </Page>
);

export const Careers = () => (
  <Page crumbs={[{ label: "Careers" }]}>
    <PageHero eyebrow="Careers" title="Help us light the next million homes" description="Small team, real ownership, warehouse in Heist-op-den-Berg + HQ in Milano." />
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      {[
        { icon: Sparkles, title: "Ownership", body: "Real scope. Nobody is here to push tickets." },
        { icon: HomeIcon, title: "Hybrid", body: "2 days/week on-site, the rest remote." },
        { icon: Users, title: "Small team", body: "Under 30 people. We hire carefully." },
      ].map((b) => { const I = b.icon; return <Card key={b.title}><I className="h-6 w-6 text-primary" /><h3 className="mt-2 font-bold">{b.title}</h3><p className="mt-1 text-sm text-muted-foreground">{b.body}</p></Card>; })}
    </div>
    <div className="mt-12">
      <SectionHeading title="Open roles" />
      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {[
          { role: "Frontend engineer", loc: "Milano · Hybrid", type: "Full-time" },
          { role: "Warehouse lead", loc: "Heist-op-den-Berg", type: "Full-time" },
          { role: "Customer service (NL/FR)", loc: "Remote · BE", type: "Full-time" },
          { role: "Product photographer", loc: "Heist-op-den-Berg", type: "Freelance" },
        ].map((r) => (
          <a key={r.role} href="#" className="flex flex-wrap items-center justify-between gap-3 p-5 hover:bg-surface">
            <div>
              <p className="font-display font-bold">{r.role}</p>
              <p className="text-sm text-muted-foreground">{r.loc} · {r.type}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Apply <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </div>
  </Page>
);

export const Press = () => (
  <Page crumbs={[{ label: "Press" }]}>
    <PageHero eyebrow="Press" title="Abitaz in the press" />
    <div className="mt-10 grid gap-4 md:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {["De Tijd", "Knack Weekend", "Dezeen", "Wallpaper*", "Het Nieuwsblad"].map((p, i) => (
          <Card key={p}>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{p} · 202{6 - (i % 3)}</p>
            <h3 className="mt-1 font-display text-lg font-bold">A placeholder headline for the {p} article →</h3>
            <a href="#" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">Read article <ArrowRight className="h-4 w-4" /></a>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <Card title="Press kit"><p className="text-sm text-muted-foreground">Logo files, product imagery, founder bios.</p><Btn variant="cta" size="sm" className="mt-3"><Download className="h-4 w-4" /> Download (ZIP, 38 MB)</Btn></Card>
        <Card title="Press contact"><p className="text-sm">Sara Bianchi<br /><a href="mailto:press@abitaz.com" className="text-primary hover:underline">press@abitaz.com</a></p></Card>
      </div>
    </div>
  </Page>
);

export const Stores = () => (
  <Page crumbs={[{ label: "Stores" }]}>
    <PageHero eyebrow="Visit us" title="Showroom & warehouse" description="Come see the fixtures in person, or pick up your order tomorrow." />
    <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <ImagePlaceholder aspect="aspect-[16/10]" label="Interactive map" />
      <div className="space-y-4">
        {[
          { name: "Heist-op-den-Berg · Warehouse + showroom", addr: "Industriepark 13B Zone B, 2220", hours: "Mon–Fri 9:00–17:00 · Sat 10:00–16:00" },
          { name: "Milano · HQ (by appointment)", addr: "Via Monte Napoleone 8, 20121", hours: "Mon–Fri 10:00–18:00" },
        ].map((s) => (
          <Card key={s.name}>
            <h3 className="font-display font-bold">{s.name}</h3>
            <p className="mt-2 inline-flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {s.addr}</p>
            <p className="mt-1 inline-flex items-start gap-2 text-sm text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 text-primary" /> {s.hours}</p>
            <Btn variant="outline" size="sm" className="mt-3">Get directions</Btn>
          </Card>
        ))}
      </div>
    </div>
  </Page>
);

/* ============================================================
   BLOG
   ============================================================ */

const blogPosts = [
  { slug: "choose-pendant-over-table", title: "How to choose a pendant for your dining table", cat: "Buying guide", read: "5 min" },
  { slug: "kelvin-explained", title: "Kelvin, lumens & CRI — explained in plain language", cat: "Buying guide", read: "8 min" },
  { slug: "ph5-50-years", title: "Why the PH5 still sells, 50 years on", cat: "Design story", read: "6 min" },
  { slug: "smart-bulb-shootout", title: "Smart bulbs 2026 — the honest shootout", cat: "Review", read: "12 min" },
  { slug: "outdoor-festoon", title: "Festoon lights that actually survive winter", cat: "Buying guide", read: "4 min" },
];

export const Blog = () => (
  <Page crumbs={[{ label: "Blog" }]}>
    <PageHero eyebrow="Journal" title="Guides, news & lighting tips" />
    <Link to={`/blog/${blogPosts[0].slug}`} className="mt-10 block group">
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <ImagePlaceholder aspect="aspect-[16/10]" label="Featured cover" tone="primary" />
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{blogPosts[0].cat} · {blogPosts[0].read}</span>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl group-hover:text-primary">{blogPosts[0].title}</h2>
          <p className="mt-3 text-muted-foreground">A short standfirst introducing the article. Two lines max so the layout stays clean across breakpoints.</p>
        </div>
      </div>
    </Link>
    <div className="mt-10 flex flex-wrap gap-2 text-sm">
      {["All", "Buying guide", "Design story", "Review", "News"].map((c, i) => (
        <button key={c} className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{c}</button>
      ))}
    </div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.slice(1).map((p) => (
        <Link key={p.slug} to={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-md">
          <ImagePlaceholder aspect="aspect-[4/3]" label={p.cat} />
          <div className="p-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.cat} · {p.read}</span>
            <h3 className="mt-1 font-display text-base font-bold group-hover:text-primary">{p.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  </Page>
);

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0];
  return (
    <Page crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]}>
      <article className="mx-auto max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">{post.cat} · {post.read}</span>
        <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{post.title}</h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-surface"><User className="h-4 w-4" /></span>
          <span>By Lotte De Wit · 12 March 2026</span>
        </div>
        <div className="mt-8"><ImagePlaceholder aspect="aspect-[16/9]" label="Cover" /></div>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Lead paragraph that sets up the question the article answers. Keep it under 50 words so it works as the social preview snippet too.</p>
          <p>Second paragraph with the first concrete answer. We use a mix of explainer copy, product callouts and embedded images. The CMS body block will replace this prose at build time.</p>
          <h2 className="font-display text-2xl font-bold mt-8">A subheading appears here</h2>
          <p>Followed by another block of body copy. Designers can adjust line-height, max-width, and the rhythm between paragraphs without touching the route.</p>
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6">
          <SectionHeading kicker="Related" title="Products in this article" />
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">{products.slice(0, 3).map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        </div>
      </article>
    </Page>
  );
};

/* ============================================================
   LEGAL — Terms / Privacy / Cookies
   ============================================================ */

const placeholderPara = "Placeholder paragraph for legal text. Replace with reviewed copy from counsel. The container width and typography are tuned for long-form reading — designers should not need to touch this layout.";

export const Terms = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Terms" }]}>
    <LegalDoc
      title="Terms & conditions"
      lastUpdated="1 June 2026"
      sections={[
        { id: "intro", title: "1. Introduction", body: <p>{placeholderPara}</p> },
        { id: "orders", title: "2. Orders & contracts", body: <p>{placeholderPara}</p> },
        { id: "payment", title: "3. Pricing & payment", body: <p>{placeholderPara}</p> },
        { id: "delivery", title: "4. Delivery", body: <p>{placeholderPara}</p> },
        { id: "withdrawal", title: "5. Right of withdrawal", body: <p>{placeholderPara}</p> },
        { id: "warranty", title: "6. Warranty & liability", body: <p>{placeholderPara}</p> },
        { id: "law", title: "7. Governing law", body: <p>{placeholderPara}</p> },
      ]}
    />
  </Page>
);

export const Privacy = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Privacy" }]}>
    <LegalDoc
      title="Privacy policy"
      lastUpdated="1 June 2026"
      sections={[
        { id: "controller", title: "1. Who we are", body: <p>{placeholderPara}</p> },
        { id: "data", title: "2. Data we collect", body: <p>{placeholderPara}</p> },
        { id: "purposes", title: "3. Why we use it", body: <p>{placeholderPara}</p> },
        { id: "sharing", title: "4. Sharing with third parties", body: <p>{placeholderPara}</p> },
        { id: "rights", title: "5. Your rights (GDPR)", body: <p>{placeholderPara}</p> },
        { id: "contact", title: "6. Contact", body: <p>Email <a href="mailto:privacy@abitaz.com" className="text-primary">privacy@abitaz.com</a>.</p> },
      ]}
    />
  </Page>
);

export const Cookies = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Cookies" }]}>
    <PageHero eyebrow="Cookies & tracking" title="Cookie settings" description="Pick which cookies we may use. Essentials are required for the shop to work." tone="muted" />
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {[
        { name: "Essential", body: "Cart, login, security. Always on.", on: true, locked: true },
        { name: "Analytics", body: "Aggregate metrics — never personal.", on: true, locked: false },
        { name: "Marketing", body: "Personalised ads & retargeting.", on: false, locked: false },
      ].map((c) => (
        <Card key={c.name}>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold">{c.name}</h3>
            <input type="checkbox" defaultChecked={c.on} disabled={c.locked} className="h-5 w-9 accent-primary" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
        </Card>
      ))}
    </div>
    <div className="mt-6 flex flex-wrap gap-3">
      <Btn variant="cta">Save preferences</Btn>
      <Btn variant="outline">Accept all</Btn>
      <Btn variant="ghost">Reject non-essential</Btn>
    </div>
    <div className="mt-10">
      <LegalDoc
        title="Cookie policy"
        lastUpdated="1 June 2026"
        sections={[
          { id: "what", title: "1. What are cookies?", body: <p>{placeholderPara}</p> },
          { id: "categories", title: "2. Categories we use", body: <p>{placeholderPara}</p> },
          { id: "third", title: "3. Third-party cookies", body: <p>{placeholderPara}</p> },
          { id: "change", title: "4. Change your settings", body: <p>{placeholderPara}</p> },
        ]}
      />
    </div>
  </Page>
);

/* re-export Newspaper to silence unused-import warning if ever needed */
void Newspaper; void Sun; void Palette; void Lightbulb;