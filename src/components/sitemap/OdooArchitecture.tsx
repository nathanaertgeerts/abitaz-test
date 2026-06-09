import {
  ArrowRight,
  Database,
  CreditCard,
  KeyRound,
  ShoppingCart,
  Tags,
  Server,
  ShieldCheck,
  UserCog,
} from "lucide-react";

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
          Backend architecture · Odoo + PIM + Stripe · v3
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          OTP-only auth · Cart as Odoo draft · B2B pricelists via 15-min sync
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Self-hosted Odoo is the system of record for customers, orders, invoices, stock and
          accounting. A middleware layer (<code>apps/pim</code>) exposes JSON-RPC to Odoo,
          replicates pricelists on a 15-min cron, and wraps signup. The Next.js storefront
          (<code>apps/frontend</code>) talks to Odoo via PIM and to Jef's <code>xl_otp</code>{" "}
          custom Odoo module for passwordless login. Stripe is configured as a Payment
          Acquirer <strong className="text-foreground">inside Odoo</strong> — that's what gives
          us auto reconciliation in the accounting module.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Source: <em>IPD · Customer auth, cart &amp; pricelists v3</em> · ADR 0005 (Accepted).
        </p>
      </div>

      {/* Topology */}
      <div className="mb-8 grid gap-3 lg:grid-cols-7">
        <div className="rounded-md border border-border bg-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Browser</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Storefront</p>
          <p className="mt-1 text-xs text-muted-foreground">Next.js · Stripe.js</p>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="rounded-md border border-primary/40 bg-primary/5 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-primary">Route handlers</p>
          <p className="mt-1 text-sm font-semibold text-foreground">apps/frontend</p>
          <p className="mt-1 text-xs text-muted-foreground">
            iron-session · Redis cart · OTP relay
          </p>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="rounded-md border border-primary/40 bg-primary/5 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-primary">PIM middleware</p>
          <p className="mt-1 text-sm font-semibold text-foreground">apps/pim</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Prisma · JSON-RPC · price cron · signup wrapper
          </p>
        </div>
        <div className="flex items-center justify-center text-muted-foreground">
          <ArrowRight className="h-5 w-5" />
        </div>
        <div className="rounded-md border border-border bg-card p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Self-hosted</p>
          <p className="mt-1 text-sm font-semibold text-foreground">Odoo + xl_otp + Stripe</p>
          <p className="mt-1 text-xs text-muted-foreground">SoR for $$$, partners, stock</p>
        </div>
      </div>

      {/* Domain blocks */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Block icon={KeyRound} title="Auth · OTP-only (no passwords)">
          <p>
            Login is a 2-step OTP flow against Jef's custom Odoo module{" "}
            <code>xl_otp</code> (a.k.a. <code>OPT_absinthe_module</code>). No passwords
            anywhere — no reset, no pwned-check, no password UI.
          </p>
          <ol className="list-decimal space-y-1 pl-4">
            <li>
              <code>POST /api/auth/otp/request {`{ email }`}</code> → Odoo{" "}
              <code>/auth/code/request</code> → always 200 (anti-enumeration), mail sent in
              the partner's locale.
            </li>
            <li>
              <code>POST /api/auth/otp/verify {`{ email, code }`}</code> → Odoo{" "}
              <code>/auth/code/verify</code> → returns{" "}
              <code>{`{ uid, partnerId, sessionId, pricelistCode }`}</code>, sets the{" "}
              <code>abitaz_session</code> iron-session cookie.
            </li>
          </ol>
          <p className="text-xs">
            Rate-limits: 3 sends/h/email, 5 sends/h/IP, 5 verify attempts per code, 10 min
            TTL, single-active code, 15 min IP lockout after 5 failures.
          </p>
        </Block>

        <Block icon={UserCog} title="Signup · 3 paths from /login">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong className="text-foreground">Inloggen</strong> — existing accounts only;
              unknown email still returns 200.
            </li>
            <li>
              <strong className="text-foreground">Particulier (B2C)</strong> —{" "}
              <code>/signup/particulier</code>. Name + email → OTP. Creates{" "}
              <code>res.partner</code> without VAT, pricelist = <code>public</code>.
            </li>
            <li>
              <strong className="text-foreground">B2B</strong> — <code>/signup/b2b</code>.
              Company + VAT + email → OTP. Pricelist = <code>B2B Pending</code> (a public
              alias); an Odoo employee filters pending partners and upgrades to the correct
              B2B pricelist manually.
            </li>
          </ul>
          <p>
            Signup is wrapped by PIM (<code>POST /api/public/customers</code>): resolves the
            tenant Integration → <code>res.partner.create</code> + <code>res.users.create</code>{" "}
            without a password.
          </p>
        </Block>

        <Block icon={ShoppingCart} title="Cart · Redis when anon, Odoo draft when logged-in">
          <p>
            <strong className="text-foreground">Anonymous:</strong> cart lives in Upstash Redis
            (7-day TTL) keyed by <code>cartToken</code> cookie. Prices come from the PIM
            snapshot on the <code>public</code> pricelist (max 15 min stale). No Odoo{" "}
            <code>sale.order</code> is created — avoids draft explosion.
          </p>
          <p>
            <strong className="text-foreground">Logged-in:</strong> first add-to-cart calls{" "}
            <code>sale.order.create_or_update_draft</code> for the partner. Prices and stock
            are live from Odoo, on the customer's pricelist. Cart follows the user across
            devices.
          </p>
          <p>
            <strong className="text-foreground">Login event:</strong> after OTP verify, the
            Redis cart is migrated into the Odoo draft, Odoo recomputes prices on the
            customer pricelist, and the storefront shows a transparent banner{" "}
            <em>"€X → €Y — pricelist toegepast"</em> if totals shift.
          </p>
        </Block>

        <Block icon={Tags} title="Pricelists · PIM 15-min cron + frontend resolution">
          <p>
            PIM owns a <code>ProductPrice</code> table{" "}
            <code>(tenantId, sku, pricelistCode, price, currency, validFrom, validTo)</code>.
            A 15-min cron (<code>apps/pim/lib/integrations/odoo/pricelist-sync.ts</code>)
            iterates active pricelists per tenant and upserts computed prices.
          </p>
          <p>
            <strong className="text-foreground">Anonymous PDP/PLP</strong> reads{" "}
            <code>?pricelist=public</code> from PIM (snapshot).{" "}
            <strong className="text-foreground">Logged-in PDP/PLP</strong> uses{" "}
            <code>session.pricelistCode</code> stamped at login.{" "}
            <strong className="text-foreground">Cart (logged-in)</strong> always recomputes
            live in Odoo — never trusts the snapshot for the line totals shown at checkout.
          </p>
        </Block>

        <Block icon={CreditCard} title="Checkout · Odoo as backend, polling on return">
          <p>
            <code>POST /api/cart/checkout</code> → if anonymous, migrate Redis cart to a fresh
            Odoo draft for a guest partner →{" "}
            <code>call_kw payment.transaction.create</code> on the Odoo Stripe acquirer →
            return <code>clientSecret</code> to the browser. Stripe.js confirms with{" "}
            <code>return_url = /checkout/return?orderId=…</code>.
          </p>
          <p>
            <strong className="text-foreground">Webhook goes to Odoo, not Lovable.</strong> Odoo
            confirms <code>sale.order</code>, generates the invoice, reconciles the payment
            in accounting. The return page polls{" "}
            <code>GET /api/me/orders/[id]</code> every 1s (max 10s) to render confirmation.
          </p>
          <p className="text-xs">
            Guest orders: confirmation mail contains <code>/orders/[id]?token=…</code> — HMAC,
            1 year TTL, multi-use within TTL. Order claim: a guest who later logs in with the
            same email sees the historical orders.
          </p>
        </Block>

        <Block icon={Database} title="Sessions · iron-session, hybrid read/write pattern">
          <p>
            <code>iron-session</code> encrypted cookie, 30-day TTL (Shopify-style — no
            password means a long session is fine).{" "}
            <code>{`{ odooSessionId, uid, partnerId, email, pricelistCode, customerType }`}</code>.
            Cookie is <code>httpOnly · secure · sameSite=Lax</code>.
          </p>
          <p>
            <strong className="text-foreground">Hybrid pattern</strong> avoids Odoo's short
            session timeout becoming a bug source:
          </p>
          <ul className="list-disc space-y-1 pl-4 text-xs">
            <li>
              <strong>READS</strong> (<code>/api/me</code>, addresses, orders, cart GET) use a
              PIM <strong>service account</strong> filtered by <code>partner_id</code> — they
              cannot expire.
            </li>
            <li>
              <strong>WRITES</strong> (cart mutations, profile PATCH) relay the customer's
              Odoo <code>sessionId</code>. On 401 → respond <code>409 SessionExpired</code>{" "}
              and trigger re-OTP.
            </li>
          </ul>
          <p className="text-xs">
            All RPC moves from XML-RPC to JSON-RPC (<code>POST /jsonrpc</code> →{" "}
            <code>execute_kw</code>); XML-RPC is deprecated in Odoo 19. The existing V3
            product-sync stays on XML-RPC for now (separate migration ticket).
          </p>
        </Block>

        <Block icon={Server} title="Account pages → models">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <code>/account/orders</code> → <code>sale.order</code> +{" "}
              <code>account.move</code> (invoices) via service-account read
            </li>
            <li>
              <code>/account/addresses</code> → child <code>res.partner</code>{" "}
              (<code>parent_id</code>, <code>type = delivery | invoice</code>)
            </li>
            <li>
              <code>/account/returns</code> → <strong>MVP: deep-link to Odoo portal</strong>.
              Own RMA UI is a follow-up.
            </li>
            <li>
              <code>/orders/[id]?token=…</code> → public guest order detail, HMAC-verified in
              the route handler
            </li>
            <li>
              <code>/wishlist</code> → stays out-of-Odoo (PIM-side, future)
            </li>
          </ul>
        </Block>

        <Block icon={ShieldCheck} title="Security boundaries">
          <p>
            Odoo credentials never touch the browser. All Odoo calls go through the frontend
            route handlers or PIM; both validate the iron-session cookie and scope every
            query to <code>session.partnerId</code>.
          </p>
          <p>
            Stripe keys live in Odoo only. The storefront sees a <code>clientSecret</code>{" "}
            and the Stripe publishable key — nothing else.
          </p>
          <p className="text-xs">
            <strong>Impersonation:</strong> super-admin "Login as &lt;customer&gt;" in PIM
            mints an HMAC token (TTL 60s, single-use). The frontend consumes it, sets{" "}
            <code>readOnly: true</code> on the session, routes reads through{" "}
            <code>/api/admin/customers/[partnerId]/*</code> and rejects all mutations with
            403. A banner + 1h countdown is shown. Logged in{" "}
            <code>ImpersonationLog</code>.
          </p>
        </Block>

        <Block icon={Database} title="PIM endpoints + ProductPrice">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <code>POST /api/public/customers</code> — signup wrapper (B2C + B2B), creates{" "}
              <code>res.partner</code> + <code>res.users</code> without password.
            </li>
            <li>
              <code>GET /api/public/prices?pricelistCode=…&amp;skus=…</code> — reads{" "}
              <code>ProductPrice</code> snapshot.
            </li>
            <li>
              <code>POST /api/public/orders/lookup</code> — guest order detail, HMAC-verified.
            </li>
            <li>
              <code>apps/pim/lib/integrations/odoo/pricelist-sync.ts</code> — 15-min cron,
              triggered from <code>apps/pim/app/api/scheduler/route.ts</code>.
            </li>
          </ul>
          <p className="text-xs">
            Prisma model: <code>ProductPrice (tenantId, sku, pricelistCode, price, currency, validFrom, validTo, syncedAt)</code>{" "}
            with <code>@@unique([tenantId, sku, pricelistCode])</code>.
          </p>
        </Block>
      </div>

      {/* Checkout sequence */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
          Checkout sequence (Stripe via Odoo acquirer)
        </h3>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} label="User clicks Pay → POST /api/cart/checkout (anon: migrate Redis cart → Odoo draft for guest partner)." />
          <Step n={2} label="Route handler calls call_kw payment.transaction.create on Odoo Stripe acquirer." />
          <Step n={3} label="Odoo returns clientSecret to the route handler, which returns it to the browser." />
          <Step n={4} label="Stripe.js confirmPayment(clientSecret, return_url) — 3DS handled by Stripe." />
          <Step n={5} label="Stripe → Odoo webhook /payment/stripe/webhook: confirm sale.order, invoice, reconcile." />
          <Step n={6} label="Browser lands on /checkout/return?orderId=… → polls /api/me/orders/[id] (1s, max 10s)." />
        </div>
      </div>

      {/* OTP login sequence */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
          OTP login sequence
        </h3>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          <Step n={1} label="User enters email → POST /api/auth/otp/request → rate-limit check." />
          <Step n={2} label="Route handler → Odoo xl_otp /auth/code/request {email, locale}." />
          <Step n={3} label="Odoo renders mail in partner.lang, returns 200 (always — anti-enumeration)." />
          <Step n={4} label="User enters 6-digit code → POST /api/auth/otp/verify {email, code}." />
          <Step n={5} label="Odoo /auth/code/verify returns {uid, partnerId, sessionId, pricelistCode}." />
          <Step n={6} label="iron-session cookie set (30d). Redis cart merged into Odoo draft. Pricelist banner if totals shift." />
        </div>
      </div>

      {/* Build order */}
      <div className="mt-8 rounded-md border border-border bg-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          Implementation order (per v3 IPD)
        </h3>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Jef (Odoo):</strong> create "B2B Pending"
            pricelist + admin-filter per tenant; extend <code>xl_otp</code> verify response
            to also return <code>uid, partner_id, pricelist_id, pricelist_code</code>.
          </li>
          <li>
            <strong className="text-foreground">Env:</strong> per Railway deploy set{" "}
            <code>SESSION_COOKIE_SECRET</code>, <code>ORDER_LINK_SECRET</code>,{" "}
            <code>UPSTASH_REDIS_*</code>, <code>ODOO_URL</code>, <code>ODOO_DB</code>; verify{" "}
            <code>PIM_API_URL</code> + <code>PIM_API_KEY</code>.
          </li>
          <li>
            <strong className="text-foreground">PIM:</strong> add <code>ProductPrice</code>{" "}
            Prisma model, 15-min pricelist-sync cron,{" "}
            <code>POST /api/public/customers</code> signup wrapper,{" "}
            <code>POST /api/public/orders/lookup</code>.
          </li>
          <li>
            <strong className="text-foreground">Frontend auth:</strong>{" "}
            <code>/login</code> (3 buttons), <code>/login/otp</code>,{" "}
            <code>/signup/particulier</code>, <code>/signup/b2b</code>; route handlers{" "}
            <code>/api/auth/otp/*</code>, <code>/api/auth/logout</code>; iron-session +
            middleware redirect for <code>/account/*</code>.
          </li>
          <li>
            <strong className="text-foreground">Cart:</strong> Redis storage for anon,{" "}
            <code>sale.order</code> draft for logged-in, cart-merge on login + pricelist
            banner.
          </li>
          <li>
            <strong className="text-foreground">Checkout:</strong>{" "}
            <code>POST /api/cart/checkout</code> → Odoo Stripe acquirer →{" "}
            <code>/checkout/return</code> polling page.
          </li>
          <li>
            <strong className="text-foreground">Account:</strong> read-only{" "}
            <code>/account/orders</code>, <code>/account/addresses</code> via service-account;{" "}
            <code>/account/returns</code> deep-links to Odoo portal.
          </li>
          <li>
            <strong className="text-foreground">XML-RPC → JSON-RPC</strong> migration for
            customer client (product-sync stays for now). Impersonation flow last.
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          <strong className="text-foreground">Out of scope (follow-ups):</strong> branded
          transactional mails (Resend/Postmark), own RMA UI, automatic VIES validation, saved
          Stripe cards on <code>res.partner</code>, step-up OTP for sensitive ops, DB-backed
          sessions with "log out everywhere", cross-tenant identity, stock reservation in
          cart, 2FA (OTP-only is already passwordless).
        </p>
      </div>
    </section>
  );
};