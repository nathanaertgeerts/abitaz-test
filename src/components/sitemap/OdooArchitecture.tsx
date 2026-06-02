import { ArrowRight, Database, CreditCard, Users, Package, Server, ShieldCheck } from "lucide-react";

const Block = ({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Database;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-card p-5">
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </div>
    <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
  </div>
);

const Step = ({ n, label }: { n: number; label: string }) => (
  <div className="flex items-start gap-3 rounded-md border border-border bg-card p-3">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
      {n}
    </span>
    <p className="text-sm text-foreground">{label}</p>
  </div>
);

export const OdooArchitecture = () => {
  return (
    <section className="mt-12 rounded-lg border border-border bg-surface p-6">
      <div className="mb-6 max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          Backend architecture · Odoo + Stripe
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Odoo is the system of record
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Accounting, customers, orders, invoices, stock and payment reconciliation all live in
          self-hosted Odoo. The storefront is a thin commerce UI that reads from Odoo and writes
          back through a small set of edge functions. Stripe is configured as a Payment Acquirer{" "}
          <strong className="text-foreground">inside Odoo</strong> — that's what gives us auto
          reconciliation in the accounting module.
        </p>
      </div>

      {/* Topology */}
      <div className="mb-8 grid gap-3 lg:grid-cols-5">
        <div className="rounded-md border border-border bg-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Browser</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Abitaz storefront</p>
          <p className="mt-1 text-xs text-muted-foreground">React / Stripe.js</p>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="rounded-md border border-primary/40 bg-primary/5 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-primary">Edge functions</p>
          <p className="mt-1 text-sm font-semibold text-foreground">odoo-proxy</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Auth, JSON-RPC, secrets, caching
          </p>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="rounded-md border border-border bg-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Self-hosted</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Odoo + Stripe acquirer</p>
          <p className="mt-1 text-xs text-muted-foreground">SoR for $$$</p>
        </div>
      </div>

      {/* Domain blocks */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Block icon={Users} title="Accounts">
          <p>
            <strong className="text-foreground">Lovable Cloud auth</strong> handles the login UX
            (email + Google). On first signup an edge function creates a <code>res.partner</code>{" "}
            in Odoo and stores <code>odoo_partner_id</code> on the Cloud profile.
          </p>
          <p>
            Addresses are child <code>res.partner</code> records with{" "}
            <code>type = 'delivery' | 'invoice'</code>, linked via <code>parent_id</code>.
          </p>
          <p className="text-xs">
            Why not Odoo-only auth? It works but ties the entire login UX to Odoo uptime and
            limits social providers. Mirroring keeps the storefront fast and Odoo authoritative.
          </p>
        </Block>

        <Block icon={CreditCard} title="Checkout & Stripe">
          <p>
            Cart is local UI state. "Place order" hits an edge function that creates a{" "}
            <code>sale.order</code> in Odoo and triggers Odoo's Stripe acquirer to mint a
            PaymentIntent. We return the <code>client_secret</code> to the browser; Stripe.js
            confirms.
          </p>
          <p>
            <strong className="text-foreground">Webhook goes to Odoo, not Lovable.</strong> Odoo
            confirms the sale, generates the invoice and reconciles the payment automatically.
            The storefront polls (or listens via Cloud relay) to render confirmation.
          </p>
        </Block>

        <Block icon={Package} title="Catalog · pricing · stock">
          <p>
            Products, variants, prices and stock come from <code>product.template</code>,{" "}
            <code>product.product</code>, <code>stock.quant</code> and <code>pricelist</code>.
          </p>
          <p>
            Cache aggressively in Cloud / CDN — Odoo's JSON-RPC is not fast enough for hot PLP
            pages. Invalidate on Odoo webhook or short TTL (5–15 min for price/stock).
          </p>
        </Block>

        <Block icon={Database} title="Account pages → Odoo models">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <code>/account/orders</code> → <code>sale.order</code> +{" "}
              <code>account.move</code> (invoices)
            </li>
            <li>
              <code>/account/addresses</code> → child <code>res.partner</code>
            </li>
            <li>
              <code>/account/returns</code> → <code>stock.return.picking</code> or helpdesk
              ticket
            </li>
            <li>
              <code>/wishlist</code> → stays in Lovable Cloud (Odoo has no clean wishlist
              concept)
            </li>
          </ul>
        </Block>

        <Block icon={Server} title="What we need from Odoo">
          <ul className="list-disc space-y-1 pl-4">
            <li>Dedicated API user with scoped ACLs (no admin)</li>
            <li>Stripe Payment Acquirer configured in Odoo with live keys</li>
            <li>Stripe webhook URL pointing at the Odoo instance</li>
            <li>Reverse proxy / VPN allow-listed for the edge functions</li>
            <li>Webhook from Odoo → Cloud for order status + catalog invalidation</li>
          </ul>
        </Block>

        <Block icon={ShieldCheck} title="Security boundaries">
          <p>
            Odoo credentials never touch the browser. All Odoo calls go through the{" "}
            <code>odoo-proxy</code> edge function which validates the Cloud session, resolves the
            user's <code>odoo_partner_id</code>, and scopes every query to that partner.
          </p>
          <p>
            Stripe keys live in Odoo only. The storefront sees a <code>client_secret</code> and
            the Stripe publishable key — nothing else.
          </p>
        </Block>
      </div>

      {/* Checkout sequence */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
          Checkout sequence
        </h3>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} label="User clicks Pay — frontend POSTs cart to create-order edge fn." />
          <Step n={2} label="Edge fn creates sale.order in Odoo for the user's partner." />
          <Step n={3} label="Odoo Stripe acquirer creates a PaymentIntent, returns client_secret." />
          <Step n={4} label="Frontend confirms with Stripe.js (3DS handled by Stripe)." />
          <Step n={5} label="Stripe → Odoo webhook: confirm sale, invoice, reconcile in accounting." />
          <Step n={6} label="Odoo → Cloud webhook: storefront renders /order-confirmation." />
        </div>
      </div>

      {/* Build order */}
      <div className="mt-8 rounded-md border border-border bg-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          Recommended build order
        </h3>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>Enable Lovable Cloud (auth + edge functions + profile table with odoo_partner_id).</li>
          <li>Ship odoo-proxy edge function (JSON-RPC wrapper, auth, error handling).</li>
          <li>Mirror signup → res.partner. Wire /account/orders + /account/addresses as read-only.</li>
          <li>Catalog read path with caching — swap static product data for Odoo-backed.</li>
          <li>create-order edge function + Stripe.js on /checkout. End-to-end test in Odoo staging.</li>
          <li>Returns, invoices download, B2B pricelists.</li>
        </ol>
      </div>
    </section>
  );
};