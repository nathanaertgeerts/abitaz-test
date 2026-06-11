import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  CloudOff,
  Download,
  Loader2,
  Lock,
  Mail,
  Package,
  Phone,
  Plus,
  RefreshCw,
  RotateCcw,
  Scale,
  ShieldCheck,
  Trash2,
  Truck,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import {
  AccountLayout,
  AuthCard,
  Btn,
  Card,
  FAQAccordion,
  Field,
  ImagePlaceholder,
  LegalDoc,
  Page,
  PageHero,
  SampleProductGrid,
  SectionHeading,
  StatusPill,
  TextArea,
  TextInput,
  Timeline,
} from "@/components/design/primitives";
import { products } from "@/data/products";

/* =========================================================================
   Designed pages for routes added in v3.1: Collections, checkout substates,
   account sub-pages, B2B/Pro, legal extras, guest order lookup, system.
   ========================================================================= */

/* ============================================================
   COLLECTIONS — curated merchandising (Payload)
   ============================================================ */

const collections = [
  { slug: "spring-edit-2026", title: "Spring edit 2026", blurb: "Light shapes & airy tones for the new season." },
  { slug: "scandi-essentials", title: "Scandi essentials", blurb: "The icons that started it all." },
  { slug: "dark-mode-home", title: "Dark mode home", blurb: "Moody finishes, charcoal & brass." },
  { slug: "small-space-lighting", title: "Small-space lighting", blurb: "Big effect, low footprint." },
  { slug: "outdoor-summer", title: "Outdoor summer", blurb: "IP65 fixtures for the garden season." },
  { slug: "studio-picks", title: "Studio picks", blurb: "Hand-picked by Studio Moretti, Milano." },
];

export const CollectionsIndex = () => (
  <Page crumbs={[{ label: "Collections" }]}>
    <PageHero
      eyebrow="Curated edits"
      title="Collections"
      description="Seasonal stories, designer picks and editorial campaigns — refreshed by our team."
    />
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((c, i) => (
        <Link
          key={c.slug}
          to={`/collections/${c.slug}`}
          className={`group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg ${i === 0 ? "sm:col-span-2" : ""}`}
        >
          <ImagePlaceholder aspect={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} label={c.title} tone={i === 0 ? "primary" : "warm"} />
          <div className="p-5">
            <h2 className="font-display text-xl font-bold group-hover:text-primary">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Explore <ArrowRight className="h-4 w-4" /></span>
          </div>
        </Link>
      ))}
    </div>
  </Page>
);

export const CollectionDetail = () => {
  const { slug } = useParams();
  const collection = collections.find((c) => c.slug === slug) ?? collections[0];
  return (
    <Page crumbs={[{ label: "Collections", to: "/collections" }, { label: collection.title }]}>
      <section className="overflow-hidden rounded-2xl bg-foreground text-background">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cta">Collection</p>
            <h1 className="mt-2 font-display text-3xl font-bold md:text-5xl">{collection.title}</h1>
            <p className="mt-4 text-background/80">{collection.blurb}</p>
            <p className="mt-3 text-sm text-background/60">42 products · curated by Lotte De Wit</p>
          </div>
          <ImagePlaceholder aspect="aspect-[4/3]" label="Editorial cover" tone="primary" />
        </div>
      </section>
      <div className="mt-10"><SampleProductGrid count={12} /></div>
      <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-10">
        <SectionHeading kicker="Story" title="Why this collection" />
        <p className="max-w-3xl text-muted-foreground">A short editorial paragraph from the CMS — designer's note, photography credits, links to related rooms or brand pages. Lives in Payload as a rich-text block.</p>
      </div>
    </Page>
  );
};

/* ============================================================
   CHECKOUT SUBSTATES (D1 — Stripe-via-Odoo)
   ============================================================ */

const checkoutStepper = (current: 1 | 2 | 3 | 4) => {
  const labels = ["Address", "Shipping", "Payment", "Confirm"];
  return (
    <ol className="flex items-center gap-2 overflow-x-auto text-sm sm:flex-wrap sm:gap-3">
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={l} className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${done ? "bg-success text-success-foreground" : active ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>
              {done ? <Check className="h-4 w-4" /> : n}
            </span>
            <span className={`whitespace-nowrap font-medium ${active ? "text-foreground inline" : done ? "text-foreground/80 hidden sm:inline" : "text-muted-foreground hidden sm:inline"}`}>{l}</span>
            {n < labels.length && <span className="hidden h-px w-8 bg-border sm:block" />}
          </li>
        );
      })}
    </ol>
  );
};

const CheckoutSummary = () => (
  <aside className="lg:sticky lg:top-32 lg:self-start">
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="font-display text-base font-bold">Order summary <span className="text-muted-foreground">(3)</span></h2>
      <ul className="mt-4 space-y-3 max-h-72 overflow-y-auto pr-1">
        {products.slice(0, 3).map((p) => (
          <li key={p.slug} className="flex gap-3">
            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md bg-surface">
              <img src={p.image} alt="" className="h-full w-full object-contain" />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">1</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.brand}</p>
              <p className="mt-1 text-sm font-bold tabular-nums">€{p.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">€1,124.77</dd></div>
        <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-success">Free</dd></div>
        <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3">
          <span className="font-display font-bold">Total</span>
          <span className="font-display text-xl font-bold tabular-nums">€1,124.77</span>
        </div>
      </dl>
    </div>
  </aside>
);

const CheckoutPage = ({
  step,
  title,
  children,
}: {
  step: 1 | 2 | 3 | 4;
  title: string;
  children: React.ReactNode;
}) => (
  <Page crumbs={[{ label: "Cart", to: "/cart" }, { label: "Checkout", to: "/checkout" }, { label: title }]}>
    <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
      <ArrowLeft className="h-4 w-4" /> Back to cart
    </Link>
    <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">Checkout</h1>
    <div className="mt-6">{checkoutStepper(step)}</div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <section className="space-y-6">{children}</section>
      <CheckoutSummary />
    </div>
  </Page>
);

export const CheckoutShipping = () => (
  <CheckoutPage step={2} title="Shipping">
    <Card title="Shipping method">
      <fieldset className="space-y-3">
        {[
          { id: "std", title: "Standard delivery", meta: "Free", desc: "Delivered when all products are in stock — 3–5 days." },
          { id: "exp", title: "Express delivery", meta: "€14.95", desc: "Priority handling, same-day dispatch before 14:00 — 2–3 days." },
          { id: "pickup", title: "Pickup · Heist-op-den-Berg", meta: "Free", desc: "Available from tomorrow, 9:00–17:00." },
        ].map((o, i) => (
          <label key={o.id} className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${i === 0 ? "border-primary bg-primary/5" : "border-border hover:border-input"}`}>
            <input type="radio" name="ship" defaultChecked={i === 0} className="mt-1 h-4 w-4 accent-primary" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{o.title}</span>
                <span className="text-sm font-medium">{o.meta}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{o.desc}</p>
            </div>
          </label>
        ))}
      </fieldset>
    </Card>
    <div className="flex justify-between">
      <Btn to="/checkout" variant="outline"><ArrowLeft className="h-4 w-4" /> Back</Btn>
      <Btn to="/checkout/payment" variant="cta">Continue to payment</Btn>
    </div>
  </CheckoutPage>
);

export const CheckoutPayment = () => (
  <CheckoutPage step={3} title="Payment">
    <Card title="Payment method">
      <p className="text-xs text-muted-foreground">Powered by Stripe-via-Odoo · 3DS / SCA secured</p>
      <fieldset className="mt-4 space-y-3">
        {[
          { id: "card", title: "Credit / debit card", meta: "Visa · Mastercard · Amex" },
          { id: "bcmc", title: "Bancontact", meta: "BE" },
          { id: "ideal", title: "iDEAL", meta: "NL" },
          { id: "paypal", title: "PayPal" },
          { id: "apay", title: "Apple Pay" },
        ].map((m, i) => (
          <label key={m.id} className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 ${i === 0 ? "border-primary bg-primary/5" : "border-border hover:border-input"}`}>
            <input type="radio" name="pay" defaultChecked={i === 0} className="mt-1 h-4 w-4 accent-primary" />
            <div className="flex flex-1 items-center justify-between">
              <span className="font-semibold">{m.title}</span>
              {m.meta && <span className="text-xs text-muted-foreground">{m.meta}</span>}
            </div>
          </label>
        ))}
      </fieldset>
    </Card>
    <Card title="Billing address">
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" /> Same as shipping address</label>
    </Card>
    <Card>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" />
        <span>I accept the <Link to="/terms" className="text-primary underline">terms</Link>, <Link to="/privacy" className="text-primary underline">privacy policy</Link> and the <Link to="/right-of-withdrawal" className="text-primary underline">14-day right of withdrawal</Link>.</span>
      </label>
    </Card>
    <div className="flex justify-between">
      <Btn to="/checkout/shipping" variant="outline"><ArrowLeft className="h-4 w-4" /> Back</Btn>
      <Btn to="/checkout/return" variant="cta" size="lg"><Lock className="h-4 w-4" /> Pay €1,124.77</Btn>
    </div>
  </CheckoutPage>
);

export const CheckoutReturn = () => (
  <Page crumbs={[{ label: "Checkout" }]}>
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-10 text-center">
      <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
      <h1 className="mt-6 font-display text-2xl font-bold">Confirming your payment…</h1>
      <p className="mt-2 text-sm text-muted-foreground">We're checking with your bank. This usually takes a few seconds — keep this tab open.</p>
      <div className="mt-6 rounded-md bg-surface p-4 text-left text-xs text-muted-foreground">
        Polling <code className="rounded bg-card px-1.5 py-0.5">/api/checkout/status/[orderId]</code> every 2s — routes to success / pending / failed.
      </div>
    </div>
  </Page>
);

export const CheckoutPending = () => (
  <Page crumbs={[{ label: "Checkout" }]}>
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-cta/40 bg-cta/10 p-8 text-center">
        <Clock className="mx-auto h-10 w-10 text-cta" />
        <h1 className="mt-4 font-display text-2xl font-bold">Your payment is still processing</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your bank hasn't confirmed yet. You don't need to pay again — we'll email you the moment it's done.</p>
      </div>
      <div className="mt-6 grid gap-3">
        <Btn variant="outline"><Mail className="h-4 w-4" /> Email me when done</Btn>
        <Btn to="/account/orders" variant="ghost">View my orders</Btn>
      </div>
      <Card className="mt-8" title="What to expect">
        <Timeline steps={[
          { label: "Payment submitted", meta: "Just now", state: "done" },
          { label: "Awaiting bank confirmation", meta: "~5 min", state: "current" },
          { label: "Order confirmed by email", state: "todo" },
        ]} />
      </Card>
    </div>
  </Page>
);

export const CheckoutFailed = () => (
  <Page crumbs={[{ label: "Checkout" }]}>
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-8 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
        <h1 className="mt-4 font-display text-2xl font-bold">Payment didn't go through</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your bank declined the payment. Your cart and order details are saved — try another method.</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Btn to="/account/orders/AB-XXXXXX/pay" variant="cta">Retry payment</Btn>
        <Btn to="/cart" variant="outline">Back to cart</Btn>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link></p>
    </div>
  </Page>
);

/* ============================================================
   COMPARE
   ============================================================ */

export const Compare = () => {
  const picked = products.slice(0, 3);
  return (
    <Page crumbs={[{ label: "Compare" }]}>
      <PageHero eyebrow="Side by side" title="Compare products" description="Up to 4 products. Specs side by side, add the winner straight to cart." />
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-40 bg-background p-3 text-left text-sm font-semibold">Product</th>
              {picked.map((p) => (
                <th key={p.slug} className="p-3 align-top">
                  <div className="relative rounded-lg border border-border bg-card p-3">
                    <button className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-surface text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                    <img src={p.image} alt="" className="mx-auto h-32 object-contain" />
                    <p className="mt-2 text-center text-sm font-semibold">{p.name}</p>
                    <p className="text-center text-base font-bold text-primary">€{p.price.toFixed(2)}</p>
                    <Btn variant="cta" size="sm" className="mt-3 w-full">Add to cart</Btn>
                  </div>
                </th>
              ))}
              <th className="p-3 align-top">
                <button className="grid h-full min-h-[220px] w-full place-items-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary">
                  <span className="inline-flex flex-col items-center gap-1"><Plus className="h-5 w-5" />Add product</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {["Brand", "SKU", "Lamp type", "Dimensions", "In stock"].map((label, i) => (
              <tr key={label} className={i % 2 ? "bg-surface" : "bg-background"}>
                <td className={`sticky left-0 p-3 font-semibold ${i % 2 ? "bg-surface" : "bg-background"}`}>{label}</td>
                {picked.map((p) => (
                  <td key={p.slug} className="p-3">
                    {label === "Brand" ? p.brand : label === "SKU" ? p.sku : label === "Lamp type" ? (p.specs[0]?.value ?? "—") : label === "Dimensions" ? (p.specs.find((s) => /dimension/i.test(s.label))?.value ?? "—") : p.inStock ? <span className="text-success">In stock</span> : "—"}
                  </td>
                ))}
                <td className="p-3 text-muted-foreground">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

/* ============================================================
   AUTH — OTP + dual signup
   ============================================================ */

export const LoginOtp = () => (
  <Page crumbs={[{ label: "Sign in", to: "/login" }, { label: "Code" }]}>
    <AuthCard
      eyebrow="One-time code"
      title="Enter your 6-digit code"
      description="Sent to lotte@example.com — valid for 10 minutes, 5 attempts."
      footer={<>Wrong email? <Link to="/login" className="text-primary hover:underline">Change</Link></>}
    >
      <div className="flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <input key={i} maxLength={1} inputMode="numeric" className="h-12 w-full min-w-0 rounded-md border border-input bg-background text-center font-display text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-14 sm:text-2xl" />
        ))}
      </div>
      <Btn variant="cta" size="lg" className="w-full">Verify & sign in</Btn>
      <p className="text-center text-sm text-muted-foreground">Didn't get it? <button className="text-primary hover:underline">Resend in 0:42</button></p>
      <div className="rounded-md bg-surface p-3 text-xs text-muted-foreground"><ShieldCheck className="mr-1.5 inline h-3.5 w-3.5 text-success" /> No passwords stored. We only ever email codes.</div>
    </AuthCard>
  </Page>
);

export const SignupParticulier = () => (
  <Page crumbs={[{ label: "Sign in", to: "/login" }, { label: "Personal account" }]}>
    <AuthCard
      eyebrow="Personal account"
      title="Create your Abitaz account"
      description="Just a name + email. We'll email you a one-time code to confirm."
      footer={<>Buying for a business? <Link to="/signup/b2b" className="text-primary hover:underline">Apply for trade →</Link></>}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required><TextInput autoComplete="given-name" /></Field>
        <Field label="Last name" required><TextInput autoComplete="family-name" /></Field>
      </div>
      <Field label="Email" required><TextInput type="email" autoComplete="email" /></Field>
      <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 accent-primary" /> <span>Send me design tips & new arrivals (you can unsubscribe anytime).</span></label>
      <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1 h-4 w-4 accent-primary" /> <span>I accept the <Link to="/terms" className="text-primary underline">terms</Link> and <Link to="/privacy" className="text-primary underline">privacy policy</Link>.</span></label>
      <Btn variant="cta" size="lg" className="w-full">Create account & send code</Btn>
    </AuthCard>
  </Page>
);

const SignupB2BInner = () => (
  <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
    <AuthCard
      eyebrow="Trade / B2B"
      title="Apply for a trade account"
      description="Company + VAT + contact. We review applications in 1–2 working days."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name" required><TextInput /></Field>
        <Field label="VAT number" required><TextInput placeholder="BE0123.456.789" /></Field>
      </div>
      <Field label="Industry" required>
        <select className="input"><option>Interior design</option><option>Architecture</option><option>Electrical contracting</option><option>Hospitality</option><option>Other</option></select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required><TextInput /></Field>
        <Field label="Email" required><TextInput type="email" /></Field>
      </div>
      <Field label="Anything we should know"><TextArea rows={3} placeholder="Typical project size, brands you specify…" /></Field>
      <Btn variant="cta" size="lg" className="w-full">Submit application</Btn>
    </AuthCard>
    <div className="space-y-4">
      <Card title="What you get">
        <ul className="space-y-2 text-sm">
          {["Trade pricing tier (visible on login)", "Project orders & multi-delivery", "Payment terms Net-15 / Net-30", "Dedicated account manager", "Spec sheets & technical sourcing"].map((x) => (
            <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-success" /> {x}</li>
          ))}
        </ul>
      </Card>
      <Card title="Review timeline">
        <Timeline steps={[
          { label: "Application received", state: "current" },
          { label: "VAT + trade references check", meta: "~1 day", state: "todo" },
          { label: "Account approved + tier assigned", state: "todo" },
        ]} />
      </Card>
    </div>
  </div>
);

export const SignupB2B = () => (
  <Page crumbs={[{ label: "Sign in", to: "/login" }, { label: "Trade account" }]}>
    <SignupB2BInner />
  </Page>
);

/* ============================================================
   ACCOUNT SUB-PAGES
   ============================================================ */

export const AccountOrderDetail = () => {
  const { id } = useParams();
  return (
    <AccountLayout
      active="/account/orders"
      title={`Order ${id ?? ""}`}
      crumbs={[{ label: "Orders", to: "/account/orders" }, { label: id ?? "Detail" }]}
      actions={<>
        <Btn to={`/account/orders/${id}/tracking`} variant="outline" size="sm"><Truck className="h-4 w-4" /> Track</Btn>
        <Btn to={`/account/orders/${id}/return`} variant="outline" size="sm"><RotateCcw className="h-4 w-4" /> Return</Btn>
      </>}
    >
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Placed</p>
            <p className="font-semibold">12 March 2026 · 14:02</p>
          </div>
          <StatusPill tone="success">Delivered</StatusPill>
          <div className="text-right"><p className="text-xs uppercase tracking-wider text-muted-foreground">Total</p><p className="font-display text-xl font-bold tabular-nums">€1,027.74</p></div>
        </div>
      </Card>

      <Card title="Items">
        <ul className="divide-y divide-border">
          {products.slice(0, 3).map((p) => (
            <li key={p.slug} className="flex gap-4 py-4">
              <img src={p.image} alt="" className="h-20 w-20 rounded bg-surface object-contain" />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${p.slug}`} className="font-semibold hover:text-primary">{p.name}</Link>
                <p className="text-xs text-muted-foreground">{p.brand} · SKU {p.sku}</p>
                <p className="mt-1 text-sm">Qty 1 · €{p.price.toFixed(2)}</p>
              </div>
              <Btn variant="ghost" size="sm">Buy again</Btn>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Shipping address"><p className="text-sm whitespace-pre-line">Lotte De Wit{"\n"}Industriepark 13B{"\n"}2220 Heist-op-den-Berg{"\n"}Belgium</p></Card>
        <Card title="Payment"><p className="text-sm">Bancontact · ••••4521</p><Btn variant="ghost" size="sm" className="mt-2"><Download className="h-4 w-4" /> Download invoice</Btn></Card>
      </div>
    </AccountLayout>
  );
};

export const AccountOrderTracking = () => {
  const { id } = useParams();
  return (
    <AccountLayout
      active="/account/orders"
      title="Tracking"
      crumbs={[{ label: "Orders", to: "/account/orders" }, { label: id ?? "Order", to: `/account/orders/${id}` }, { label: "Tracking" }]}
    >
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Carrier</p>
            <p className="font-semibold">Bpost · 323200123456789</p>
          </div>
          <Btn variant="outline" size="sm">Open on Bpost <ArrowRight className="h-4 w-4" /></Btn>
        </div>
      </Card>
      <Card title="Status">
        <Timeline steps={[
          { label: "Order received", meta: "Mon 09:14", state: "done" },
          { label: "Picked & packed", meta: "Mon 14:02", state: "done" },
          { label: "Handed to carrier", meta: "Tue 06:45", state: "done" },
          { label: "Out for delivery", meta: "Wed 08:21", state: "current" },
          { label: "Delivered", state: "todo" },
        ]} />
      </Card>
      <Card title="Parcels">
        <ul className="space-y-2 text-sm">
          <li className="flex items-center justify-between rounded-md border border-border p-3"><span><Package className="mr-2 inline h-4 w-4 text-muted-foreground" /> Parcel 1 of 2 · 2 items</span><StatusPill tone="info">Out for delivery</StatusPill></li>
          <li className="flex items-center justify-between rounded-md border border-border p-3"><span><Package className="mr-2 inline h-4 w-4 text-muted-foreground" /> Parcel 2 of 2 · 1 item</span><StatusPill tone="muted">At depot</StatusPill></li>
        </ul>
      </Card>
    </AccountLayout>
  );
};

export const AccountOrderRetryPay = () => {
  const { id } = useParams();
  return (
    <AccountLayout
      active="/account/orders"
      title="Retry payment"
      crumbs={[{ label: "Orders", to: "/account/orders" }, { label: id ?? "Order", to: `/account/orders/${id}` }, { label: "Pay" }]}
    >
      <Card>
        <div className="flex items-start gap-3 rounded-md border border-cta/40 bg-cta/10 p-3 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 text-cta" />
          <p>We'll re-check stock & pricing before charging. If anything has shifted, we'll show it here first.</p>
        </div>
      </Card>
      <Card title="Choose a payment method">
        <fieldset className="space-y-3">
          {["Bancontact", "Credit / debit card", "iDEAL", "PayPal"].map((m, i) => (
            <label key={m} className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 ${i === 0 ? "border-primary bg-primary/5" : "border-border hover:border-input"}`}>
              <input type="radio" name="pay" defaultChecked={i === 0} className="h-4 w-4 accent-primary" />
              <span className="font-semibold">{m}</span>
            </label>
          ))}
        </fieldset>
      </Card>
      <div className="flex justify-end"><Btn to="/checkout/return" variant="cta" size="lg"><Lock className="h-4 w-4" /> Pay €1,027.74</Btn></div>
    </AccountLayout>
  );
};

export const AccountOrderReturn = () => {
  const { id } = useParams();
  return (
    <AccountLayout
      active="/account/returns"
      title="Request a return"
      crumbs={[{ label: "Orders", to: "/account/orders" }, { label: id ?? "Order", to: `/account/orders/${id}` }, { label: "Return" }]}
    >
      <Card title="Which items?">
        <ul className="space-y-3">
          {products.slice(0, 2).map((p) => (
            <li key={p.slug} className="flex items-center gap-4 rounded-md border border-border p-3">
              <input type="checkbox" className="h-4 w-4 accent-primary" />
              <img src={p.image} alt="" className="h-14 w-14 rounded bg-surface object-contain" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">€{p.price.toFixed(2)}</p>
              </div>
              <select className="input h-9 w-auto"><option>Qty 1</option></select>
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Reason">
        <select className="input"><option>Doesn't match what I expected</option><option>Arrived damaged</option><option>Wrong item received</option><option>No longer needed</option></select>
        <Field label="Notes (optional)" hint="Helps us improve."><TextArea rows={3} /></Field>
      </Card>
      <Card title="Pickup or drop-off">
        <fieldset className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-primary bg-primary/5 p-4"><input type="radio" name="ret" defaultChecked className="h-4 w-4 accent-primary" /> Free pickup from your address</label>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border p-4"><input type="radio" name="ret" className="h-4 w-4 accent-primary" /> Drop off at any Bpost point</label>
        </fieldset>
      </Card>
      <div className="flex justify-end"><Btn variant="cta">Submit return request</Btn></div>
    </AccountLayout>
  );
};

const sampleInvoices = [
  { id: "INV-2026-0421", date: "12 Mar 2026", amount: 1027.74, status: "Paid", tone: "success" as const },
  { id: "INV-2026-0388", date: "04 Mar 2026", amount: 318.0, status: "Paid", tone: "success" as const },
  { id: "INV-2026-0309", date: "18 Feb 2026", amount: 79.0, status: "Refunded", tone: "muted" as const },
];

export const AccountInvoices = () => (
  <AccountLayout active="/account/invoices" title="Invoices" description="All invoices linked to your account (Odoo account.move).">
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="pb-3">Invoice</th><th className="pb-3">Date</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th className="pb-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sampleInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="py-3"><Link to={`/account/invoices/${inv.id}`} className="font-semibold hover:text-primary">{inv.id}</Link></td>
                <td className="py-3 text-muted-foreground">{inv.date}</td>
                <td className="py-3 font-display font-bold tabular-nums">€{inv.amount.toFixed(2)}</td>
                <td className="py-3"><StatusPill tone={inv.tone}>{inv.status}</StatusPill></td>
                <td className="py-3 text-right"><Btn variant="ghost" size="sm"><Download className="h-4 w-4" /> PDF</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </AccountLayout>
);

export const AccountInvoiceDetail = () => {
  const { id } = useParams();
  return (
    <AccountLayout
      active="/account/invoices"
      title={`Invoice ${id ?? ""}`}
      crumbs={[{ label: "Invoices", to: "/account/invoices" }, { label: id ?? "Detail" }]}
      actions={<Btn variant="cta" size="sm"><Download className="h-4 w-4" /> Download PDF</Btn>}
    >
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Issued</p>
            <p className="font-semibold">12 March 2026</p>
            <p className="text-xs text-muted-foreground">Due on receipt</p>
          </div>
          <StatusPill tone="success">Paid</StatusPill>
        </div>
      </Card>
      <Card title="Lines">
        <ul className="divide-y divide-border text-sm">
          {products.slice(0, 3).map((p) => (
            <li key={p.slug} className="flex items-center justify-between py-3">
              <div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">SKU {p.sku} · 21% VAT</p></div>
              <p className="font-display font-bold tabular-nums">€{p.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">€849.96</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">VAT (21%)</dt><dd className="tabular-nums">€178.49</dd></div>
          <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3"><dt className="font-display font-bold">Total</dt><dd className="font-display text-xl font-bold tabular-nums">€1,028.45</dd></div>
        </dl>
      </Card>
    </AccountLayout>
  );
};

export const AccountPaymentMethods = () => (
  <AccountLayout active="/account/payment-methods" title="Payment methods" actions={<Btn variant="cta" size="sm"><Plus className="h-4 w-4" /> Add card</Btn>}>
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { brand: "Visa", last4: "4521", exp: "08 / 28", def: true },
        { brand: "Mastercard", last4: "8033", exp: "11 / 27", def: false },
      ].map((c) => (
        <Card key={c.last4}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-14 place-items-center rounded-md bg-foreground text-xs font-bold text-background">{c.brand}</span>
              <div>
                <p className="font-semibold">•••• {c.last4}</p>
                <p className="text-xs text-muted-foreground">Exp {c.exp}</p>
              </div>
            </div>
            {c.def && <StatusPill tone="info">Default</StatusPill>}
          </div>
          <div className="mt-4 flex gap-2">
            {!c.def && <Btn variant="outline" size="sm">Make default</Btn>}
            <Btn variant="ghost" size="sm"><Trash2 className="h-4 w-4" /> Remove</Btn>
          </div>
        </Card>
      ))}
    </div>
    <Card title="B2B payment terms">
      <p className="text-sm text-muted-foreground">Your account tier is <strong className="text-foreground">Net-30</strong>. Invoices are due 30 days after issue.</p>
    </Card>
  </AccountLayout>
);

export const AccountPreferences = () => (
  <AccountLayout active="/account/preferences" title="Preferences">
    <Card title="Language & region">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Language"><select className="input"><option>Nederlands</option><option>Français</option><option>English</option><option>Deutsch</option><option>Italiano</option><option>Español</option></select></Field>
        <Field label="Currency"><select className="input"><option>EUR €</option><option>CHF</option></select></Field>
      </div>
    </Card>
    <Card title="Communications">
      {["Order updates (always on)", "Product news & launches", "Editorial newsletter", "Trade & pro updates"].map((c, i) => (
        <label key={c} className="flex items-center justify-between border-b border-border py-3 last:border-0">
          <span className="text-sm">{c}</span>
          <input type="checkbox" defaultChecked={i < 2} disabled={i === 0} className="h-5 w-9 accent-primary" />
        </label>
      ))}
      <p className="mt-3 rounded-md bg-surface p-3 text-xs text-muted-foreground"><ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-success" /> Newsletter uses double opt-in — confirm via email after toggling on.</p>
    </Card>
    <Card title="Notification channels">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { l: "Email", v: true },
          { l: "SMS", v: false },
        ].map((c) => (
          <label key={c.l} className="flex items-center justify-between rounded-md border border-border p-3"><span className="text-sm">{c.l}</span><input type="checkbox" defaultChecked={c.v} className="h-5 w-9 accent-primary" /></label>
        ))}
      </div>
    </Card>
    <div className="text-right"><Btn variant="cta">Save changes</Btn></div>
  </AccountLayout>
);

export const AccountDelete = () => (
  <AccountLayout active="/account/preferences" title="Delete my account">
    <Card>
      <div className="flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-3">
        <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
        <p className="text-sm">This permanently deletes your account, addresses, wishlist and preferences. Open returns and invoices are <strong>legally retained</strong> for 7 years.</p>
      </div>
    </Card>
    <Card title="What gets deleted vs kept">
      <div className="grid gap-4 md:grid-cols-2 text-sm">
        <div>
          <p className="font-semibold text-foreground">Deleted</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">{["Account & sign-in", "Saved addresses", "Wishlist", "Saved cards (Stripe)", "Preferences"].map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 text-success" /> {x}</li>)}</ul>
        </div>
        <div>
          <p className="font-semibold text-foreground">Kept (legal)</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">{["Invoices · 7 years", "Order records · 7 years", "Tax documents"].map((x) => <li key={x} className="flex gap-2"><Lock className="h-4 w-4 text-muted-foreground" /> {x}</li>)}</ul>
        </div>
      </div>
    </Card>
    <Card title="Confirm with a one-time code">
      <p className="text-sm text-muted-foreground">We'll email a 6-digit code to your registered address.</p>
      <Btn variant="outline" className="mt-3">Send code</Btn>
      <Field label="Type DELETE to confirm" required><TextInput placeholder="DELETE" /></Field>
      <Btn variant="ghost" className="text-destructive hover:bg-destructive/10">Permanently delete my account</Btn>
    </Card>
  </AccountLayout>
);

/* ============================================================
   GUEST ORDER LOOKUP
   ============================================================ */

export const GuestOrderLookup = () => {
  const { id } = useParams();
  return (
    <Page crumbs={[{ label: "Order lookup" }]}>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Guest order</p>
          <h1 className="mt-2 font-display text-2xl font-bold md:text-3xl">Order {id ?? "AB-XXXXXX"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">No login required — this link is tied to one order and one order only.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusPill tone="info">In transit</StatusPill>
            <span className="text-sm text-muted-foreground">Expected Wed 25 March</span>
          </div>

          <div className="mt-8">
            <Timeline steps={[
              { label: "Order received", meta: "Mon", state: "done" },
              { label: "Picked & packed", meta: "Mon", state: "done" },
              { label: "Handed to carrier", meta: "Tue", state: "done" },
              { label: "Out for delivery", state: "current" },
              { label: "Delivered", state: "todo" },
            ]} />
          </div>
        </div>

        <Card className="mt-6" title="Items">
          <ul className="divide-y divide-border">
            {products.slice(0, 2).map((p) => (
              <li key={p.slug} className="flex gap-4 py-4">
                <img src={p.image} alt="" className="h-16 w-16 rounded bg-surface object-contain" />
                <div className="min-w-0 flex-1"><p className="font-semibold">{p.name}</p><p className="text-xs text-muted-foreground">Qty 1 · €{p.price.toFixed(2)}</p></div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="mt-6" title="Need to start a return?">
          <p className="text-sm text-muted-foreground">For your security we'll email a one-time code before any change.</p>
          <Btn variant="outline" size="sm" className="mt-3"><Mail className="h-4 w-4" /> Email me a code</Btn>
        </Card>
      </div>
    </Page>
  );
};

/* ============================================================
   GUIDES
   ============================================================ */

export const GuideSizeSpec = () => (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Size & spec" }]}>
    <PageHero eyebrow="Buying guide" title="Size & spec guide" description="Pick the right size, lumens and Kelvin for every room." />
    <div className="mt-10 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left"><tr><th className="px-4 py-3">Room</th><th className="px-4 py-3">Lumens</th><th className="px-4 py-3">Kelvin</th><th className="px-4 py-3">Notes</th></tr></thead>
        <tbody className="divide-y divide-border bg-card">
          {[
            ["Living room", "1,500–3,000", "2700K", "Layer ambient + task + accent"],
            ["Kitchen", "3,000–4,000", "3000–4000K", "High CRI for food prep"],
            ["Bedroom", "1,000–2,000", "2700K", "Dimmable highly recommended"],
            ["Bathroom", "2,000–4,000", "3000K", "IP44+ near showers / IP65 in zones"],
            ["Home office", "3,000–6,000", "4000K", "Glare-free task light"],
            ["Outdoor", "—", "3000K warm", "IP65 minimum"],
          ].map((r) => <tr key={r[0]}><td className="px-4 py-3 font-medium">{r[0]}</td><td className="px-4 py-3">{r[1]}</td><td className="px-4 py-3">{r[2]}</td><td className="px-4 py-3 text-muted-foreground">{r[3]}</td></tr>)}
        </tbody>
      </table>
    </div>
    <div className="mt-10">
      <SectionHeading title="Spec glossary" />
      <FAQAccordion items={[
        { q: "Lumens vs Watts", a: "Lumens = brightness. Watts = energy use. With LED, focus on lumens." },
        { q: "Kelvin", a: "Warm (2700K) = cosy. Neutral (3000–4000K) = task. Cool (5000K+) = clinical." },
        { q: "CRI", a: "Colour Rendering Index. CRI 90+ shows colours faithfully — important in kitchens & studios." },
        { q: "IP rating", a: "First digit = solids, second = liquids. IP44 splash-proof, IP65 jet-proof." },
        { q: "Dimming", a: "Most LEDs need a compatible dimmer — check spec sheet before pairing." },
      ]} />
    </div>
    <div className="mt-10"><Btn variant="cta"><Download className="h-4 w-4" /> Download PDF guide</Btn></div>
  </Page>
);

export const GuideLightingPlanner = () => {
  const [step, setStep] = useState(0);
  void step; void setStep;
  return (
  <Page crumbs={[{ label: "Help", to: "/help" }, { label: "Lighting planner" }]}>
    <PageHero eyebrow="Buying guide" title="Lighting planner" description="Answer 3 questions, get a plan for your room." />
    <div className="mt-10 grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        {[
          { n: 1, title: "Which room?", options: ["Living room", "Kitchen", "Bedroom", "Bathroom", "Home office", "Outdoor"] },
          { n: 2, title: "What is the room for?", options: ["Relaxing", "Cooking", "Working", "Sleeping", "Entertaining"] },
          { n: 3, title: "Your style", options: ["Scandi", "Industrial", "Mid-century", "Minimal", "Maximal"] },
        ].map((s) => (
          <Card key={s.n} title={<span className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{s.n}</span> {s.title}</span>}>
            <div className="flex flex-wrap gap-2">
              {s.options.map((o) => <button key={o} className="rounded-full border border-input bg-background px-3 py-1.5 text-sm hover:border-primary hover:text-primary">{o}</button>)}
            </div>
          </Card>
        ))}
        <Btn variant="cta" size="lg">Get my lighting plan</Btn>
      </div>
      <Card title="Your plan (preview)">
        <p className="text-sm text-muted-foreground">After you answer, we recommend:</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex gap-2"><Check className="h-4 w-4 text-success" /> 1 statement pendant</li>
          <li className="flex gap-2"><Check className="h-4 w-4 text-success" /> 2 floor / table lamps for ambient</li>
          <li className="flex gap-2"><Check className="h-4 w-4 text-success" /> Accent: 1 wall or picture light</li>
        </ul>
      </Card>
    </div>
  </Page>
  );
};

/* ============================================================
   PRO sub-pages
   ============================================================ */

export const ProApply = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "Apply" }]}>
    <SignupB2BInner />
  </Page>
);

export const ProQuote = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "Request a quote" }]}>
    <PageHero eyebrow="Abitaz Pro" title="Request a quote" description="Brief us on your project. Account manager replies in 1 working day." />
    <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr]">
      <Card>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project name" required><TextInput /></Field>
            <Field label="Project type" required><select className="input"><option>Residential</option><option>Hospitality</option><option>Retail</option><option>Office</option></select></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Estimated value (EUR)"><TextInput placeholder="€" /></Field>
            <Field label="Desired delivery"><TextInput type="date" /></Field>
          </div>
          <Field label="Brief" required><TextArea rows={5} placeholder="Rooms, square meters, target fixtures, brands…" /></Field>
          <Field label="Attach spec / drawing"><div className="rounded-md border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground"><Upload className="mx-auto h-6 w-6" /><p className="mt-2">Drop PDFs, DWG, images here · or browse</p></div></Field>
          <Btn variant="cta" size="lg">Send brief</Btn>
        </div>
      </Card>
      <Card title="What happens next">
        <Timeline steps={[
          { label: "Brief received", state: "current" },
          { label: "Account manager assigned", meta: "~4h", state: "todo" },
          { label: "Quote draft (Odoo SO)", meta: "1 working day", state: "todo" },
          { label: "Project kickoff", state: "todo" },
        ]} />
      </Card>
    </div>
  </Page>
);

export const ProProjects = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "Projects" }]}>
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Abitaz Pro</p>
        <h1 className="mt-1 font-display text-3xl font-bold md:text-4xl">Project orders</h1>
      </div>
      <Btn to="/pro/quote" variant="cta"><Plus className="h-4 w-4" /> New project</Btn>
    </div>
    <Card className="mt-8">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="pb-3">Project</th><th className="pb-3">Value</th><th className="pb-3">AM</th><th className="pb-3">Status</th><th className="pb-3"></th></tr></thead>
          <tbody className="divide-y divide-border">
            {[
              { p: "Brera Hotel · Phase 1", v: "€42,300", am: "Sara B.", s: "In delivery", t: "info" as const },
              { p: "Villa Como retrofit", v: "€18,750", am: "Sara B.", s: "Quote sent", t: "warn" as const },
              { p: "Showroom Antwerpen", v: "€7,420", am: "Marco V.", s: "Completed", t: "success" as const },
            ].map((r) => (
              <tr key={r.p}>
                <td className="py-3 font-semibold">{r.p}</td>
                <td className="py-3 tabular-nums">{r.v}</td>
                <td className="py-3 text-muted-foreground">{r.am}</td>
                <td className="py-3"><StatusPill tone={r.t}>{r.s}</StatusPill></td>
                <td className="py-3 text-right"><Btn variant="ghost" size="sm">Open <ArrowRight className="h-4 w-4" /></Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </Page>
);

export const ProBulkOrder = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "Bulk order" }]}>
    <PageHero eyebrow="Abitaz Pro" title="Bulk order upload" description="Upload an SKU list and we'll turn it into a quote or draft order in seconds." />
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card title="Upload">
        <div className="rounded-md border-2 border-dashed border-border p-8 text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold">Drop a CSV or Excel file</p>
          <p className="text-xs text-muted-foreground">Columns: SKU, qty, notes (optional)</p>
          <Btn variant="outline" size="sm" className="mt-4">Browse files</Btn>
        </div>
        <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Download className="h-3.5 w-3.5" /> Download template</a>
      </Card>
      <Card title="Parsed preview">
        <ul className="divide-y divide-border text-sm">
          {[
            { sku: "LO 5741095104", name: "Louis Poulsen PH5 Mini Orange", qty: 12, ok: true },
            { sku: "AT 20751101", name: "&tradition FlowerPot VP2 Dark Green", qty: 4, ok: true },
            { sku: "SL 9999999", name: "Unknown SKU", qty: 2, ok: false },
          ].map((l) => (
            <li key={l.sku} className="flex items-center gap-3 py-3">
              {l.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-destructive" />}
              <div className="min-w-0 flex-1"><p className="truncate font-medium">{l.name}</p><p className="text-xs text-muted-foreground">{l.sku} · qty {l.qty}</p></div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <Btn variant="cta" size="sm">Convert to quote</Btn>
          <Btn variant="outline" size="sm">Save as draft order</Btn>
        </div>
      </Card>
    </div>
  </Page>
);

export const ProSpecSheets = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "Spec sheets" }]}>
    <PageHero eyebrow="Abitaz Pro" title="Spec sheets" description="Technical PDFs for every product we sell." />
    <Card className="mt-10">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <TextInput placeholder="Search by SKU, brand or product name…" />
        <select className="input"><option>All brands</option><option>Louis Poulsen</option><option>Artemide</option><option>SLV</option></select>
        <select className="input"><option>All categories</option><option>Pendants</option><option>Wall</option><option>Bulbs</option></select>
      </div>
    </Card>
    <Card className="mt-6">
      <ul className="divide-y divide-border">
        {products.slice(0, 8).map((p) => (
          <li key={p.slug} className="flex items-center gap-4 py-3">
            <img src={p.image} alt="" className="h-12 w-12 rounded bg-surface object-contain" />
            <div className="min-w-0 flex-1"><p className="truncate font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.brand} · {p.sku}</p></div>
            <Btn variant="ghost" size="sm"><Download className="h-4 w-4" /> PDF</Btn>
          </li>
        ))}
      </ul>
    </Card>
  </Page>
);

export const ProFaq = () => (
  <Page crumbs={[{ label: "Pro", to: "/pro" }, { label: "FAQ" }]}>
    <PageHero eyebrow="Trade FAQ" title="Pro questions, answered" />
    <div className="mt-8 flex flex-wrap gap-2 text-sm">
      {["All", "Pricing", "Terms", "Logistics", "Returns"].map((c, i) => (
        <button key={c} className={`rounded-full px-3 py-1.5 ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}>{c}</button>
      ))}
    </div>
    <div className="mt-6">
      <FAQAccordion items={[
        { q: "How does pricing tier work?", a: "On approval you're assigned a pricelist (Bronze / Silver / Gold) — visible on every product when logged in." },
        { q: "Can I get Net-30 terms?", a: "Yes, after the first 3 orders we review credit and switch you to Net-15 or Net-30." },
        { q: "Multi-delivery for one PO?", a: "Yes — split deliveries by date or address from a single SO." },
        { q: "Do you handle DOA replacements?", a: "Yes, replacement shipped within 48h on confirmed DOA." },
      ]} />
    </div>
  </Page>
);

/* ============================================================
   LEGAL extras
   ============================================================ */

const placeholderPara = "Placeholder paragraph for legal text. Replace with reviewed copy from counsel. The container width and typography are tuned for long-form reading — designers should not need to touch this layout.";

export const Imprint = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Imprint" }]}>
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-3xl font-bold md:text-4xl">Imprint</h1>
      <p className="mt-2 text-sm text-muted-foreground">Legal information required under EU & DE Telemediengesetz.</p>
      <div className="mt-8 space-y-6 text-sm text-foreground/85">
        <div><h2 className="font-display text-base font-bold">Operator</h2><p className="mt-1">TE.IT srl<br />Via Monte Napoleone 8<br />20121 Milano, Italia</p></div>
        <div><h2 className="font-display text-base font-bold">Contact</h2><p className="mt-1"><Mail className="mr-1 inline h-4 w-4 text-primary" /> hello@abitaz.com<br /><Phone className="mr-1 inline h-4 w-4 text-primary" /> +32 15 67 89 00</p></div>
        <div><h2 className="font-display text-base font-bold">Registration</h2><p className="mt-1">VAT IT12345678901 · Milano chamber of commerce 9876543</p></div>
        <div><h2 className="font-display text-base font-bold">Responsible for content</h2><p className="mt-1">Sara Bianchi · address as above</p></div>
      </div>
    </div>
  </Page>
);

export const RightOfWithdrawal = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Right of withdrawal" }]}>
    <LegalDoc
      title="Right of withdrawal (14 days)"
      lastUpdated="1 June 2026"
      sections={[
        { id: "right", title: "1. Your right", body: <p>You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period expires 14 days after the day on which you acquire physical possession of the last item.</p> },
        { id: "exercise", title: "2. How to exercise", body: <p>{placeholderPara}</p> },
        { id: "effects", title: "3. Effects of withdrawal", body: <p>{placeholderPara}</p> },
        { id: "form", title: "4. Model withdrawal form", body: <p>{placeholderPara}</p> },
        { id: "exclusions", title: "5. Exclusions", body: <p>{placeholderPara}</p> },
      ]}
    />
  </Page>
);

export const PaymentOptions = () => (
  <Page crumbs={[{ label: "Info" }, { label: "Payment options" }]}>
    <PageHero eyebrow="Payment" title="Pay the way that suits you" description="All transactions are secured by Stripe-via-Odoo with 3D Secure / SCA." />
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {["Visa", "Mastercard", "Amex", "Bancontact", "iDEAL", "PayPal", "Apple Pay", "Google Pay", "Klarna", "Wire (B2B)"].map((m) => (
        <Card key={m} className="text-center"><Wallet className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 text-sm font-semibold">{m}</p></Card>
      ))}
    </div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">
      <Card><ShieldCheck className="h-6 w-6 text-success" /><h3 className="mt-2 font-bold">3D Secure</h3><p className="mt-1 text-sm text-muted-foreground">Every card payment is verified by your bank.</p></Card>
      <Card><Lock className="h-6 w-6 text-success" /><h3 className="mt-2 font-bold">PCI DSS</h3><p className="mt-1 text-sm text-muted-foreground">We never see or store your card number.</p></Card>
      <Card><Scale className="h-6 w-6 text-success" /><h3 className="mt-2 font-bold">EU consumer law</h3><p className="mt-1 text-sm text-muted-foreground">Full protection: 14-day withdrawal + 2-year warranty.</p></Card>
    </div>
    <div className="mt-12"><SectionHeading title="Common questions" /><FAQAccordion items={[
      { q: "When is my card charged?", a: "At order confirmation, after 3DS approval." },
      { q: "Can I pay by invoice?", a: "B2B accounts on Net-15 / Net-30 only, after approval." },
      { q: "Refund timing?", a: "Refunds appear in 3–7 business days depending on your bank." },
    ]} /></div>
  </Page>
);

export const ShippingPolicy = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Shipping policy" }]}>
    <LegalDoc
      title="Shipping policy"
      lastUpdated="1 June 2026"
      sections={[
        { id: "scope", title: "1. Where we ship", body: <p>{placeholderPara}</p> },
        { id: "lead", title: "2. Lead times", body: <p>{placeholderPara}</p> },
        { id: "costs", title: "3. Costs", body: <p>{placeholderPara}</p> },
        { id: "carriers", title: "4. Carriers", body: <p>{placeholderPara}</p> },
        { id: "damage", title: "5. Damage in transit", body: <p>{placeholderPara}</p> },
      ]}
    />
  </Page>
);

export const Accessibility = () => (
  <Page crumbs={[{ label: "Legal" }, { label: "Accessibility" }]}>
    <PageHero eyebrow="Accessibility" title="Built for everyone" description="We aim to meet WCAG 2.2 AA across the entire shop." />
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      <Card><h3 className="font-bold">Conformance</h3><p className="mt-1 text-sm text-muted-foreground">WCAG 2.2 AA — last audit June 2026.</p></Card>
      <Card><h3 className="font-bold">Feedback</h3><p className="mt-1 text-sm text-muted-foreground">Found something we can improve? <a href="mailto:accessibility@abitaz.com" className="text-primary underline">accessibility@abitaz.com</a></p></Card>
      <Card><h3 className="font-bold">Assistive tech</h3><p className="mt-1 text-sm text-muted-foreground">Tested with NVDA, VoiceOver and keyboard-only navigation.</p></Card>
    </div>
    <div className="mt-10"><LegalDoc
      title="Accessibility statement"
      lastUpdated="1 June 2026"
      sections={[
        { id: "commit", title: "1. Our commitment", body: <p>{placeholderPara}</p> },
        { id: "standards", title: "2. Standards", body: <p>{placeholderPara}</p> },
        { id: "known", title: "3. Known issues", body: <p>{placeholderPara}</p> },
        { id: "contact", title: "4. Contact", body: <p>{placeholderPara}</p> },
      ]}
    /></div>
  </Page>
);

/* ============================================================
   SYSTEM
   ============================================================ */

export const Maintenance = () => (
  <Page>
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface text-muted-foreground"><CloudOff className="h-7 w-7" /></div>
      <h1 className="mt-6 font-display text-3xl font-bold">We'll be right back</h1>
      <p className="mt-3 text-muted-foreground">We're doing scheduled maintenance. Expected back online in ~30 minutes.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Btn variant="outline"><RefreshCw className="h-4 w-4" /> Try again</Btn>
        <Btn to="/contact" variant="ghost">Contact us</Btn>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Status updates · <a href="#" className="text-primary hover:underline">status.abitaz.com</a></p>
    </div>
  </Page>
);

export const ServerError = () => (
  <Page>
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-display text-6xl font-bold text-cta">500</p>
      <h1 className="mt-2 font-display text-2xl font-bold">Something went wrong on our end</h1>
      <p className="mt-3 text-muted-foreground">Our team has been notified. Try again in a moment, or head back home.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Btn to="/" variant="cta">Back home</Btn>
        <Btn variant="outline"><RefreshCw className="h-4 w-4" /> Retry</Btn>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Request ID: REQ-7K2QXC · share when contacting support</p>
    </div>
  </Page>
);
