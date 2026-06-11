import { Link, useParams } from "react-router-dom";
import { PageSkeleton } from "@/components/PageSkeleton";

/* =========================================================================
   EXTRA SKELETONS — every remaining route in src/lib/sitemap.ts that
   needs a clickable placeholder so designers can navigate the full tree.
   Keep this file flat & dumb: one component per route, no business logic.
   ========================================================================= */

/* ---------- Collections (curated merchandising, Payload-driven) ---------- */

export const CollectionsIndex = () => (
  <PageSkeleton
    eyebrow="Curated edits"
    title="Collections"
    description="Editorial collections — campaigns, seasonal stories, designer picks. Distinct from categories (taxonomy) and rooms (spatial)."
    breadcrumbs={[{ label: "Collections" }]}
    blocks={[
      { label: "Hero strip / featured collection", height: "lg" },
      { label: "Collection grid (CMS-curated cards)", height: "xl" },
      { label: "Newsletter capture", height: "md" },
    ]}
  />
);

export const CollectionDetail = () => {
  const { slug } = useParams();
  return (
    <PageSkeleton
      eyebrow="Collection"
      title={slug ? slug.replace(/-/g, " ") : "Collection"}
      breadcrumbs={[{ label: "Collections", to: "/collections" }, { label: "Detail" }]}
      status="cms"
      blocks={[
        { label: "Editorial hero (CMS image + intro)", height: "xl" },
        { label: "Curated product grid (Payload selection over PIM/Odoo)", height: "xl" },
        { label: "Story / shoppable scene", height: "lg" },
      ]}
    />
  );
};

/* ---------- Checkout substates (Stripe-via-Odoo, D1) ---------- */

const CheckoutStep = ({
  step,
  title,
  blocks,
  status = "skeleton" as const,
}: {
  step: string;
  title: string;
  blocks: { label: string; height?: "sm" | "md" | "lg" | "xl"; note?: string }[];
  status?: "skeleton" | "planned";
}) => (
  <PageSkeleton
    eyebrow={`Checkout · ${step}`}
    title={title}
    breadcrumbs={[
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" },
      { label: step },
    ]}
    status={status}
    blocks={blocks}
  />
);

export const CheckoutShipping = () => (
  <CheckoutStep
    step="Shipping"
    title="Where should we deliver?"
    blocks={[
      { label: "Address form (saved + new) + validation", height: "lg" },
      { label: "Carrier options + lead time (Odoo carrier calc)", height: "md" },
      { label: "Order summary (sticky right rail)", height: "lg" },
    ]}
  />
);

export const CheckoutPayment = () => (
  <CheckoutStep
    step="Payment"
    title="Choose how to pay"
    blocks={[
      { label: "Payment methods (Stripe-via-Odoo: card, iDEAL, Bancontact, …)", height: "lg", note: "D1 — Odoo owns payment.transaction" },
      { label: "Saved cards (if logged in)", height: "md" },
      { label: "Billing address + terms checkbox", height: "md" },
      { label: "Pay button → 3DS / redirect handled by Stripe-via-Odoo", height: "sm" },
    ]}
  />
);

export const CheckoutReturn = () => (
  <CheckoutStep
    step="Return"
    title="Confirming your payment…"
    blocks={[
      { label: "Spinner + 'we're confirming with the bank' message", height: "md" },
      { label: "Polls /api/checkout/status/[orderId] → routes to success / pending / failed", height: "sm" },
      { label: "Order summary (read-only)", height: "lg" },
    ]}
    status="planned"
  />
);

export const CheckoutPending = () => (
  <CheckoutStep
    step="Pending"
    title="Your payment is still processing"
    blocks={[
      { label: "Status banner — webhook in flight", height: "md" },
      { label: "What to expect (timeline)", height: "md" },
      { label: "Email-me-when-done CTA + back to account", height: "sm" },
    ]}
    status="planned"
  />
);

export const CheckoutFailed = () => (
  <CheckoutStep
    step="Failed"
    title="Payment didn't go through"
    blocks={[
      { label: "Failure reason + recovery copy", height: "md" },
      { label: "Retry payment CTA → /account/orders/[id]/pay", height: "sm" },
      { label: "Back to cart · contact support", height: "sm" },
    ]}
    status="planned"
  />
);

/* ---------- Compare ---------- */

export const Compare = () => (
  <PageSkeleton
    eyebrow="Side-by-side"
    title="Compare products"
    description="High value for technical buyers — drivers, fixtures, smart bulbs."
    breadcrumbs={[{ label: "Compare" }]}
    blocks={[
      { label: "Compare slots (up to 4 products) — add/remove", height: "lg" },
      { label: "Specs table (sticky header row)", height: "xl" },
      { label: "Add-to-cart row", height: "sm" },
    ]}
  />
);

/* ---------- Auth — OTP + dual signup ---------- */

export const LoginOtp = () => (
  <PageSkeleton
    title="Enter your 6-digit code"
    description="We sent it to your email — valid for 10 minutes, 5 attempts."
    breadcrumbs={[{ label: "Sign in", to: "/login" }, { label: "Code" }]}
    blocks={[
      { label: "6-digit OTP input", height: "md" },
      { label: "Resend link + change email", height: "sm" },
      { label: "Trust line — why we use OTP (no passwords)", height: "sm" },
    ]}
  />
);

export const SignupParticulier = () => (
  <PageSkeleton
    eyebrow="Particulier"
    title="Create your account"
    description="Name + email → OTP. Public pricelist."
    breadcrumbs={[{ label: "Sign in", to: "/login" }, { label: "Particulier" }]}
    blocks={[
      { label: "Name + email form + consents", height: "lg" },
      { label: "Why create an account — benefits", height: "md" },
    ]}
  />
);

export const SignupB2B = () => (
  <PageSkeleton
    eyebrow="B2B"
    title="Apply for a trade account"
    description="Company + VAT + email → OTP. 'B2B Pending' pricelist, manual approval in Odoo."
    breadcrumbs={[{ label: "Sign in", to: "/login" }, { label: "B2B" }]}
    blocks={[
      { label: "Company / VAT / contact form", height: "lg" },
      { label: "B2B benefits (pricing, terms, support)", height: "md" },
      { label: "Approval timeline note", height: "sm" },
    ]}
  />
);

/* ---------- Account — detail + sub-pages ---------- */

const accountTabs = [
  { to: "/account", label: "Overview" },
  { to: "/account/orders", label: "Orders" },
  { to: "/account/invoices", label: "Invoices" },
  { to: "/account/addresses", label: "Addresses" },
  { to: "/account/payment-methods", label: "Payment methods" },
  { to: "/account/returns", label: "Returns" },
  { to: "/account/preferences", label: "Preferences" },
];

const AccountShell = ({
  title,
  crumbs,
  blocks,
}: {
  title: string;
  crumbs: { label: string; to?: string }[];
  blocks: { label: string; height?: "sm" | "md" | "lg" | "xl" }[];
}) => (
  <PageSkeleton
    eyebrow="My account"
    title={title}
    breadcrumbs={[{ label: "Account", to: "/account" }, ...crumbs]}
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

export const AccountOrderDetail = () => {
  const { id } = useParams();
  return (
    <AccountShell
      title={`Order ${id ?? ""}`}
      crumbs={[{ label: "Orders", to: "/account/orders" }, { label: id ?? "Detail" }]}
      blocks={[
        { label: "Order header (status, date, total, payment)", height: "md" },
        { label: "Line items", height: "lg" },
        { label: "Shipping + billing addresses", height: "md" },
        { label: "Actions: track, return, retry payment, reorder, invoice download", height: "sm" },
      ]}
    />
  );
};

export const AccountOrderTracking = () => {
  const { id } = useParams();
  return (
    <AccountShell
      title="Tracking"
      crumbs={[
        { label: "Orders", to: "/account/orders" },
        { label: id ?? "Order", to: `/account/orders/${id}` },
        { label: "Tracking" },
      ]}
      blocks={[
        { label: "Status timeline (Odoo picking → carrier → delivered)", height: "lg" },
        { label: "Tracking number + carrier link", height: "sm" },
        { label: "Per-parcel breakdown", height: "md" },
      ]}
    />
  );
};

export const AccountOrderRetryPay = () => {
  const { id } = useParams();
  return (
    <AccountShell
      title="Retry payment"
      crumbs={[
        { label: "Orders", to: "/account/orders" },
        { label: id ?? "Order", to: `/account/orders/${id}` },
        { label: "Pay" },
      ]}
      blocks={[
        { label: "Revalidate stock + price (warn on shift)", height: "md" },
        { label: "Payment methods (Stripe-via-Odoo) → new payment.transaction", height: "lg" },
        { label: "Back into /checkout/return polling", height: "sm" },
      ]}
    />
  );
};

export const AccountOrderReturn = () => {
  const { id } = useParams();
  return (
    <AccountShell
      title="Request a return"
      crumbs={[
        { label: "Orders", to: "/account/orders" },
        { label: id ?? "Order", to: `/account/orders/${id}` },
        { label: "Return" },
      ]}
      blocks={[
        { label: "Line picker (which items, qty, reason)", height: "lg" },
        { label: "Return method + label", height: "md" },
        { label: "Submit → MVP: handoff to Odoo portal", height: "sm" },
      ]}
    />
  );
};

export const AccountInvoices = () => (
  <AccountShell
    title="Invoices"
    crumbs={[{ label: "Invoices" }]}
    blocks={[{ label: "Invoice list (Odoo account.move) — download PDF, status, amount", height: "xl" }]}
  />
);

export const AccountInvoiceDetail = () => {
  const { id } = useParams();
  return (
    <AccountShell
      title={`Invoice ${id ?? ""}`}
      crumbs={[{ label: "Invoices", to: "/account/invoices" }, { label: id ?? "Detail" }]}
      blocks={[
        { label: "Invoice header + status", height: "md" },
        { label: "Lines + totals + VAT breakdown", height: "lg" },
        { label: "Download PDF · pay (if open)", height: "sm" },
      ]}
    />
  );
};

export const AccountPaymentMethods = () => (
  <AccountShell
    title="Payment methods"
    crumbs={[{ label: "Payment methods" }]}
    blocks={[
      { label: "Saved Stripe-in-Odoo cards (add / remove / default)", height: "lg" },
      { label: "B2B: payment terms display (read-only)", height: "md" },
    ]}
  />
);

export const AccountPreferences = () => (
  <AccountShell
    title="Preferences"
    crumbs={[{ label: "Preferences" }]}
    blocks={[
      { label: "Language + currency", height: "md" },
      { label: "Marketing consent + newsletter (double-opt-in)", height: "md" },
      { label: "Notification channels (email / sms)", height: "md" },
    ]}
  />
);

export const AccountDelete = () => (
  <AccountShell
    title="Delete my account"
    crumbs={[{ label: "Delete account" }]}
    blocks={[
      { label: "GDPR explainer: what is deleted vs legally retained", height: "lg" },
      { label: "Step-up OTP confirmation", height: "md" },
      { label: "Final delete button", height: "sm" },
    ]}
  />
);

/* ---------- Guest order lookup ---------- */

export const GuestOrderLookup = () => {
  const { id } = useParams();
  return (
    <PageSkeleton
      eyebrow="Guest order"
      title={`Order ${id ?? ""}`}
      description="Resolved via HMAC token (?token=…). No login required, scoped to this single order."
      breadcrumbs={[{ label: "Order lookup" }]}
      blocks={[
        { label: "Order status + ETA", height: "md" },
        { label: "Lines + totals (read-only)", height: "lg" },
        { label: "Tracking", height: "md" },
        { label: "Step-up to start a return → OTP", height: "sm" },
      ]}
    />
  );
};

/* ---------- Guides ---------- */

export const GuideSizeSpec = () => (
  <PageSkeleton
    eyebrow="Buying guide"
    title="Size & spec guide"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Size & spec" }]}
    blocks={[
      { label: "Room-by-room sizing table", height: "lg" },
      { label: "Spec glossary (lumens, kelvin, IP, …)", height: "xl" },
      { label: "Downloadable PDF", height: "sm" },
    ]}
  />
);

export const GuideLightingPlanner = () => (
  <PageSkeleton
    eyebrow="Buying guide"
    title="Lighting planner"
    breadcrumbs={[{ label: "Help", to: "/help" }, { label: "Lighting planner" }]}
    blocks={[
      { label: "Step 1 — room type", height: "md" },
      { label: "Step 2 — task / ambient / accent split", height: "md" },
      { label: "Step 3 — recommended fixtures (linked products)", height: "lg" },
    ]}
  />
);

/* ---------- Pro / B2B sub-pages ---------- */

const ProPage = ({
  title,
  crumb,
  blocks,
}: {
  title: string;
  crumb: string;
  blocks: { label: string; height?: "sm" | "md" | "lg" | "xl" }[];
}) => (
  <PageSkeleton
    eyebrow="Abitaz Pro"
    title={title}
    breadcrumbs={[{ label: "Pro", to: "/pro" }, { label: crumb }]}
    blocks={blocks}
  />
);

export const ProApply = () => (
  <ProPage
    title="Apply for a trade account"
    crumb="Apply"
    blocks={[
      { label: "Application form (company, VAT, trade refs)", height: "xl" },
      { label: "What happens next (review timeline)", height: "md" },
    ]}
  />
);

export const ProQuote = () => (
  <ProPage
    title="Request a quote"
    crumb="Quote"
    blocks={[
      { label: "Project brief form", height: "lg" },
      { label: "Upload spec / drawing", height: "md" },
      { label: "Account manager assignment", height: "sm" },
    ]}
  />
);

export const ProProjects = () => (
  <ProPage
    title="Project orders"
    crumb="Projects"
    blocks={[
      { label: "Project list (status, value, AM)", height: "xl" },
      { label: "Start a new project CTA", height: "sm" },
    ]}
  />
);

export const ProBulkOrder = () => (
  <ProPage
    title="Bulk order upload"
    crumb="Bulk order"
    blocks={[
      { label: "CSV / Excel SKU upload — drag & drop", height: "lg" },
      { label: "Parsed line preview + per-line validation", height: "lg" },
      { label: "Convert to quote or draft sale.order", height: "sm" },
    ]}
  />
);

export const ProSpecSheets = () => (
  <ProPage
    title="Spec sheets"
    crumb="Spec sheets"
    blocks={[
      { label: "Search by SKU / brand / category", height: "sm" },
      { label: "Downloadable PDF list", height: "xl" },
    ]}
  />
);

export const ProFaq = () => (
  <ProPage
    title="Trade FAQ"
    crumb="FAQ"
    blocks={[
      { label: "Category tabs (Pricing · Terms · Logistics · Returns)", height: "sm" },
      { label: "Accordion Q&A", height: "xl" },
    ]}
  />
);

/* ---------- Legal extras ---------- */

const LegalPage = ({ title, crumb }: { title: string; crumb: string }) => (
  <PageSkeleton
    title={title}
    breadcrumbs={[{ label: "Legal" }, { label: crumb }]}
    blocks={[{ label: "Long-form rich text (legal review required)", height: "xl" }]}
  />
);

export const Imprint = () => <LegalPage title="Imprint" crumb="Imprint" />;
export const RightOfWithdrawal = () => (
  <LegalPage title="Right of withdrawal (14 days)" crumb="Right of withdrawal" />
);
export const PaymentOptions = () => (
  <PageSkeleton
    title="Payment options"
    description="Accepted methods + buyer trust. Public info — not to be confused with the in-account 'payment methods' page."
    breadcrumbs={[{ label: "Info" }, { label: "Payment options" }]}
    blocks={[
      { label: "Methods grid (card, iDEAL, Bancontact, …)", height: "lg" },
      { label: "Security / 3DS / Stripe-via-Odoo trust copy", height: "md" },
      { label: "FAQ", height: "md" },
    ]}
  />
);
export const ShippingPolicy = () => (
  <LegalPage title="Shipping policy" crumb="Shipping policy" />
);
export const Accessibility = () => (
  <LegalPage title="Accessibility statement" crumb="Accessibility" />
);

/* ---------- System / utility ---------- */

export const Maintenance = () => (
  <PageSkeleton
    title="We'll be right back"
    description="Scheduled maintenance — the shop is briefly offline."
    breadcrumbs={[{ label: "Maintenance" }]}
    status="planned"
    blocks={[
      { label: "Status message + ETA", height: "md" },
      { label: "Status page link · support email", height: "sm" },
    ]}
  />
);

export const ServerError = () => (
  <PageSkeleton
    title="Something went wrong"
    description="500 — our team has been notified."
    breadcrumbs={[{ label: "Error" }]}
    status="planned"
    blocks={[
      { label: "Friendly error copy + request ID", height: "md" },
      { label: "Back home / retry / contact", height: "sm" },
    ]}
  />
);