import { ArrowLeft, Check, ChevronDown, Clock, Headset, Minus, Package, Plus, RotateCcw, Trash2, Truck, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { formatPrice } from "@/components/product/ProductCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart } from "@/context/CartContext";

const COUNTRIES = [
  { code: "BE", name: "Belgium" },
  { code: "NL", name: "Netherlands" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "LU", name: "Luxembourg" },
];

const Cart = () => {
  const navigate = useNavigate();
  const { lines, itemCount, subtotal, totalSavings, setQty, removeItem, clear } = useCart();

  const [country, setCountry] = useState("BE");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const EXPRESS_FEE = 14.95;
  const shipping = delivery === "express" ? EXPRESS_FEE : 0;
  const total = subtotal + shipping;

  /* ---------- Empty state ---------- */
  if (lines.length === 0) {
    return (
      <SiteLayout>
        <div className="container-abitaz py-12">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Continue shopping
          </Link>
          <div className="mx-auto mt-10 max-w-md rounded-lg border border-border bg-card p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface text-muted-foreground">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse our catalogue and add a few products to get started.
            </p>
            <Link
              to="/category/pendant-lamps"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Continue shopping
        </Link>

        <div className="mt-4 flex items-end justify-between">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Shopping cart{" "}
            <span className="text-muted-foreground">({itemCount})</span>
          </h1>
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
          >
            Delete all products
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ---------- Line items ---------- */}
          <section aria-label="Cart items" className="space-y-3">
            {lines.map((line) => {
              const lineTotal = line.price * line.qty;
              const hasDiscount =
                line.originalPrice && line.originalPrice > line.price;
              return (
                <article
                  key={line.slug}
                  className="grid grid-cols-[88px_1fr] gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[120px_1fr]"
                >
                  <Link
                    to={`/product/${line.slug}`}
                    className="aspect-square overflow-hidden rounded-md bg-surface"
                  >
                    <img
                      src={line.image}
                      alt={line.name}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${line.slug}`}
                          className="block truncate font-display text-sm font-bold text-foreground hover:text-primary sm:text-base"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                          {line.description}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          {line.inStock ? (
                            <span className="inline-flex items-center gap-1 text-success">
                              <Check className="h-3.5 w-3.5" /> In stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" /> Lead time: {line.leadTime}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-display text-base font-bold text-foreground sm:text-lg">
                          {formatPrice(lineTotal)}
                        </div>
                        {hasDiscount && (
                          <div className="text-xs text-muted-foreground line-through">
                            {formatPrice((line.originalPrice as number) * line.qty)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-input">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${line.name}`}
                          onClick={() => setQty(line.slug, line.qty - 1)}
                          disabled={line.qty <= 1}
                          className="grid h-9 w-9 place-items-center text-foreground transition hover:bg-muted disabled:opacity-40"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span
                          aria-live="polite"
                          className="grid h-9 min-w-10 place-items-center border-x border-input px-2 text-sm font-medium tabular-nums"
                        >
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${line.name}`}
                          onClick={() => setQty(line.slug, line.qty + 1)}
                          className="grid h-9 w-9 place-items-center text-foreground transition hover:bg-muted"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.slug)}
                        aria-label={`Remove ${line.name}`}
                        className="inline-flex items-center gap-1.5 rounded-md p-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* ---------- Delivery / pickup ---------- */}
            <section
              aria-label="Delivery or pickup"
              className="mt-2 rounded-lg border border-border bg-card p-5"
            >
              <h2 className="font-display text-lg font-bold">Delivery or pickup</h2>

              <label className="mt-4 block text-sm">
                <span className="block font-medium">Country</span>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 h-10 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="mt-5">
                <legend className="text-sm font-medium">Delivery method</legend>
                <div className="mt-3 space-y-3">
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
                      delivery === "standard"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-input"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={delivery === "standard"}
                      onChange={() => setDelivery("standard")}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">Standard delivery</span>
                        <span className="text-sm font-medium text-success">Free</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your products will be delivered when they are in stock.
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Lead time: 3-5 days
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
                      delivery === "express"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-input"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={delivery === "express"}
                      onChange={() => setDelivery("express")}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                          <Zap className="h-4 w-4 text-cta" />
                          Express delivery
                        </span>
                        <span className="text-sm font-medium text-foreground tabular-nums">
                          {formatPrice(EXPRESS_FEE)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Priority handling — shipped the same business day when ordered before 14:00.
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Lead time: 2-3 days
                      </p>
                    </div>
                  </label>

                </div>
              </fieldset>
            </section>
          </section>

          {/* ---------- Sticky summary ---------- */}
          <aside aria-label="Checkout summary" className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-display text-lg font-bold">Checkout summary</h2>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Subtotal (incl. VAT)</dt>
                  <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                {totalSavings > 0 && (
                  <div className="flex items-center justify-between text-success">
                    <dt>You save</dt>
                    <dd className="tabular-nums">−{formatPrice(totalSavings)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">
                    Shipping to{" "}
                    {COUNTRIES.find((c) => c.code === country)?.name ?? "Belgium"}
                  </dt>
                  {shipping === 0 ? (
                    <dd className="font-medium text-success">Free</dd>
                  ) : (
                    <dd className="font-medium tabular-nums">{formatPrice(shipping)}</dd>
                  )}
                </div>
              </dl>

              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-base font-bold">Total price</span>
                  <span className="font-display text-2xl font-bold tabular-nums text-foreground">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-0.5 text-right text-xs text-muted-foreground">incl. VAT</p>
              </div>

              {/* Checkout actions — on mobile we promote the quick wallet
                  buttons above the regular checkout button to speed up
                  one-tap purchases. On desktop the order is reversed
                  (regular checkout first, quick wallets below). */}
              <div className="mt-5 flex flex-col gap-3">
                {/* Quick checkout — Apple Pay / Google Pay
                    order-1 on mobile (first), order-3 on desktop (last) */}
                <div className="order-1 lg:order-3">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    <span className="lg:hidden">Express checkout</span>
                    <span className="hidden lg:inline">Quick checkout</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/checkout", {
                          state: { country, delivery, payment: "applepay", express: true },
                        })
                      }
                      aria-label="Pay with Apple Pay"
                      className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md bg-foreground text-sm font-semibold text-background transition hover:opacity-90"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
                        <path d="M16.365 1.43c0 1.14-.42 2.22-1.13 3.02-.78.86-2.06 1.52-3.06 1.43-.13-1.11.42-2.27 1.1-3.01.77-.84 2.13-1.45 3.09-1.44zM20.5 17.06c-.36.83-.53 1.2-1 2-.66 1.13-1.59 2.54-2.74 2.55-1.02.01-1.28-.66-2.66-.65-1.38.01-1.66.67-2.68.66-1.15-.01-2.04-1.28-2.7-2.4C7.13 16.78 6.84 12.93 8.55 11.1c.95-1.02 2.32-1.65 3.61-1.65 1.32 0 2.15.66 3.24.66 1.05 0 1.69-.66 3.21-.66 1.15 0 2.37.62 3.24 1.69-2.85 1.56-2.39 5.66-1.35 5.92z" />
                      </svg>
                      Pay
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/checkout", {
                          state: { country, delivery, payment: "googlepay", express: true },
                        })
                      }
                      aria-label="Pay with Google Pay"
                      className="inline-flex h-12 items-center justify-center gap-1.5 rounded-md border border-input bg-background text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
                        <path fill="#4285F4" d="M12.24 10.29v3.5h4.84c-.2 1.13-.82 2.08-1.74 2.72v2.26h2.81c1.65-1.52 2.6-3.76 2.6-6.42 0-.62-.06-1.22-.16-1.79H12.24z"/>
                        <path fill="#34A853" d="M12.24 20c2.34 0 4.31-.78 5.74-2.12l-2.81-2.18c-.78.52-1.78.83-2.93.83-2.25 0-4.16-1.52-4.84-3.57H4.5v2.24A8.96 8.96 0 0 0 12.24 20z"/>
                        <path fill="#FBBC05" d="M7.4 12.96a5.4 5.4 0 0 1 0-3.43V7.29H4.5a8.96 8.96 0 0 0 0 8.04l2.9-2.37z"/>
                        <path fill="#EA4335" d="M12.24 5.96c1.27 0 2.41.44 3.31 1.3l2.49-2.49C16.55 3.4 14.58 2.49 12.24 2.49 8.74 2.49 5.7 4.5 4.5 7.29l2.9 2.24c.68-2.05 2.59-3.57 4.84-3.57z"/>
                      </svg>
                      Pay
                    </button>
                  </div>
                </div>

                {/* "or" divider — only visible on mobile, between wallets and standard checkout */}
                <div className="order-2 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground lg:hidden">
                  <span className="h-px flex-1 bg-border" />
                  or
                  <span className="h-px flex-1 bg-border" />
                </div>

                {/* Standard checkout — order-3 on mobile (last), order-1 on desktop (first) */}
                <button
                  type="button"
                  onClick={() =>
                    navigate("/checkout", {
                      state: { country, delivery },
                    })
                  }
                  className="order-3 inline-flex h-12 w-full items-center justify-center rounded-md bg-success px-6 text-sm font-semibold text-success-foreground transition hover:opacity-90 lg:order-1"
                >
                  Continue to checkout
                </button>
              </div>

              {/* Discount accordion */}
              <button
                type="button"
                onClick={() => setDiscountOpen((v) => !v)}
                aria-expanded={discountOpen}
                className="mt-4 flex w-full items-center justify-between text-sm font-medium text-foreground hover:text-primary"
              >
                Enter discount code
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${discountOpen ? "rotate-180" : ""}`}
                />
              </button>
              {discountOpen && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Code"
                    className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                  />
                  <button
                    type="button"
                    className="h-10 rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-muted"
                  >
                    Apply
                  </button>
                </div>
              )}

              <Link
                to="/account"
                className="mt-3 block text-sm font-medium text-primary hover:underline"
              >
                Log in to your account
              </Link>

              {/* Payment methods row */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                {["Bancontact", "Mastercard", "VISA", "Apple Pay", "Google Pay", "PayPal"].map(
                  (m) => (
                    <span
                      key={m}
                      className="rounded-md border border-border bg-background px-2 py-1"
                    >
                      {m}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-4 rounded-lg border border-border bg-card p-5">
              <p className="font-display text-sm font-bold">You're in good hands!</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                <li className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-success" /> Up to 30-day returns
                </li>
                <li className="flex items-center gap-2">
                  <Headset className="h-4 w-4 text-success" /> Professional support
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-success" /> Free delivery via UPS or DPD
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Delete-all confirmation */}
      <AlertDialog open={confirmClear} onOpenChange={setConfirmClear}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete all products</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all the products from your cart?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                clear();
                setConfirmClear(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, delete them
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SiteLayout>
  );
};

export default Cart;