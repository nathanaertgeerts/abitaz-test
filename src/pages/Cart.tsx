import { ArrowLeft, Check, ChevronDown, Clock, Headset, Minus, Package, Plus, RotateCcw, Trash2, Truck } from "lucide-react";
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
  const [delivery, setDelivery] = useState<"standard" | "pickup">("standard");
  const [discountOpen, setDiscountOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  const shipping = 0; // Free standard delivery in this prototype
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
                        <Clock className="h-3.5 w-3.5" /> Lead time: 1-2 weeks
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
                      delivery === "pickup"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-input"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          Pickup at warehouse in Heist-op-den-Berg
                        </span>
                        <span className="text-sm font-medium text-success">Free</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Industriepark 13B Zone B, 2220 Heist-op-den-Berg
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Available from tomorrow
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
                  <dd className="font-medium text-success">Free</dd>
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

              <button
                type="button"
                onClick={() =>
                  navigate("/checkout", {
                    state: { country, delivery },
                  })
                }
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md bg-success px-6 text-sm font-semibold text-success-foreground transition hover:opacity-90"
              >
                Continue to checkout
              </button>

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