import { ArrowLeft, Check, Lock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { formatPrice } from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";

type Step = 1 | 2 | 3;

type Address = {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
};

const COUNTRY_NAMES: Record<string, string> = {
  BE: "Belgium",
  NL: "Netherlands",
  FR: "France",
  DE: "Germany",
  LU: "Luxembourg",
};

const PAYMENT_METHODS = [
  { id: "bancontact", label: "Bancontact" },
  { id: "card", label: "Credit / debit card" },
  { id: "paypal", label: "PayPal" },
  { id: "applepay", label: "Apple Pay" },
  { id: "googlepay", label: "Google Pay" },
];

const stepLabels = ["Address", "Shipping & payment", "Review & pay"];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lines, itemCount, subtotal, clear } = useCart();

  // Redirect to cart if empty
  useEffect(() => {
    if (lines.length === 0) navigate("/cart", { replace: true });
  }, [lines.length, navigate]);

  const initialFromCart =
    (location.state as {
      country?: string;
      delivery?: "standard" | "express" | "pickup";
      payment?: string;
      express?: boolean;
    } | null) ?? {};

  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<Address>({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    country: initialFromCart.country ?? "BE",
    phone: "",
  });
  const [delivery, setDelivery] = useState<"standard" | "express" | "pickup">(
    initialFromCart.delivery ?? "standard",
  );
  const [payment, setPayment] = useState(initialFromCart.payment ?? "bancontact");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const EXPRESS_FEE = 14.95;
  const shipping = delivery === "express" ? EXPRESS_FEE : 0;
  const total = subtotal + shipping;

  const isAddressValid = useMemo(() => {
    const a = address;
    return Boolean(
      a.email &&
        a.firstName &&
        a.lastName &&
        a.street &&
        a.number &&
        a.postalCode &&
        a.city &&
        a.country,
    );
  }, [address]);

  useEffect(() => {
    document.title = "Checkout — Abitaz";
  }, []);

  const onField =
    <K extends keyof Address>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setAddress((prev) => ({ ...prev, [key]: e.target.value }));

  const placeOrder = () => {
    if (!acceptTerms) return;
    const orderId = `AB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const summary = {
      orderId,
      email: address.email,
      total,
      itemCount,
      delivery,
      payment,
    };
    clear();
    navigate("/order-confirmation", { state: summary, replace: true });
  };

  if (lines.length === 0) return null;

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>

        <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">Checkout</h1>

        {/* Stepper */}
        <ol className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          {stepLabels.map((label, i) => {
            const n = (i + 1) as Step;
            const done = step > n;
            const active = step === n;
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-success text-success-foreground"
                      : active
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : n}
                </span>
                <span
                  className={`font-medium ${
                    active ? "text-foreground" : done ? "text-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <span aria-hidden className="hidden h-px w-8 bg-border sm:block" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ---------- Form column ---------- */}
          <section>
            {step === 1 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold">Contact & delivery address</h2>

                <div className="mt-4 space-y-4">
                  <Field label="Email" required>
                    <input
                      type="email"
                      autoComplete="email"
                      value={address.email}
                      onChange={onField("email")}
                      className="input"
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name" required>
                      <input
                        type="text"
                        autoComplete="given-name"
                        value={address.firstName}
                        onChange={onField("firstName")}
                        className="input"
                      />
                    </Field>
                    <Field label="Last name" required>
                      <input
                        type="text"
                        autoComplete="family-name"
                        value={address.lastName}
                        onChange={onField("lastName")}
                        className="input"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                    <Field label="Street" required>
                      <input
                        type="text"
                        autoComplete="address-line1"
                        value={address.street}
                        onChange={onField("street")}
                        className="input"
                      />
                    </Field>
                    <Field label="Nr." required>
                      <input
                        type="text"
                        value={address.number}
                        onChange={onField("number")}
                        className="input"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                    <Field label="Postal code" required>
                      <input
                        type="text"
                        autoComplete="postal-code"
                        value={address.postalCode}
                        onChange={onField("postalCode")}
                        className="input"
                      />
                    </Field>
                    <Field label="City" required>
                      <input
                        type="text"
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={onField("city")}
                        className="input"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Country" required>
                      <select
                        autoComplete="country"
                        value={address.country}
                        onChange={onField("country")}
                        className="input"
                      >
                        {Object.entries(COUNTRY_NAMES).map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Phone (for delivery)">
                      <input
                        type="tel"
                        autoComplete="tel"
                        value={address.phone}
                        onChange={onField("phone")}
                        className="input"
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={!isAddressValid}
                    onClick={() => setStep(2)}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover disabled:opacity-50"
                  >
                    Continue to shipping & payment
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold">Shipping method</h2>
                  <fieldset className="mt-4 space-y-3">
                    <RadioCard
                      checked={delivery === "standard"}
                      onChange={() => setDelivery("standard")}
                      title="Standard delivery"
                      meta="Free"
                      description="Delivered when all products are in stock — usually 3-5 days."
                    />
                    <RadioCard
                      checked={delivery === "express"}
                      onChange={() => setDelivery("express")}
                      title="Express delivery"
                      meta={formatPrice(EXPRESS_FEE)}
                      description="Priority handling, shipped same business day before 14:00 — 2-3 days."
                    />
                    <RadioCard
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                      title="Pickup at warehouse Heist-op-den-Berg"
                      meta="Free"
                      description="Industriepark 13B Zone B, 2220 Heist-op-den-Berg — available from tomorrow."
                    />
                  </fieldset>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold">Payment method</h2>
                  <fieldset className="mt-4 space-y-3">
                    {PAYMENT_METHODS.map((m) => (
                      <RadioCard
                        key={m.id}
                        checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        title={m.label}
                      />
                    ))}
                  </fieldset>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex h-11 items-center gap-1.5 rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-muted"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
                  >
                    Review order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <h2 className="font-display text-lg font-bold">Review your order</h2>

                  <ReviewBlock
                    title="Delivery address"
                    onEdit={() => setStep(1)}
                    body={
                      <p>
                        {address.firstName} {address.lastName}
                        <br />
                        {address.street} {address.number}
                        <br />
                        {address.postalCode} {address.city}
                        <br />
                        {COUNTRY_NAMES[address.country]}
                        <br />
                        <span className="text-muted-foreground">{address.email}</span>
                      </p>
                    }
                  />

                  <ReviewBlock
                    title="Shipping method"
                    onEdit={() => setStep(2)}
                    body={
                      <p>
                        {delivery === "standard" && "Standard delivery (free) — 3-5 days"}
                        {delivery === "express" &&
                          `Express delivery (${formatPrice(EXPRESS_FEE)}) — 2-3 days`}
                        {delivery === "pickup" &&
                          "Pickup at warehouse Heist-op-den-Berg (free)"}
                      </p>
                    }
                  />

                  <ReviewBlock
                    title="Payment method"
                    onEdit={() => setStep(2)}
                    body={
                      <p>{PAYMENT_METHODS.find((m) => m.id === payment)?.label}</p>
                    }
                  />
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="text-foreground/85">
                      I accept the{" "}
                      <a href="#" className="text-primary underline">
                        terms and conditions
                      </a>{" "}
                      and acknowledge the{" "}
                      <a href="#" className="text-primary underline">
                        privacy policy
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex h-11 items-center gap-1.5 rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-muted"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={!acceptTerms}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-success px-8 text-sm font-semibold text-success-foreground transition hover:opacity-90 disabled:opacity-50"
                  >
                    <Lock className="h-4 w-4" /> Pay {formatPrice(total)}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ---------- Order summary ---------- */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-display text-base font-bold">
                Order summary{" "}
                <span className="text-muted-foreground">({itemCount})</span>
              </h2>

              <ul className="mt-4 space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {lines.map((line) => (
                  <li key={line.slug} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-md bg-surface">
                      <img
                        src={line.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                        {line.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{line.name}</p>
                      <p className="text-xs text-muted-foreground">{line.brand}</p>
                    </div>
                    <div className="text-sm font-semibold tabular-nums">
                      {formatPrice(line.price * line.qty)}
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  {shipping === 0 ? (
                    <dd className="font-medium text-success">Free</dd>
                  ) : (
                    <dd className="font-medium tabular-nums">{formatPrice(shipping)}</dd>
                  )}
                </div>
              </dl>

              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="font-display font-bold">Total</span>
                <span className="font-display text-xl font-bold tabular-nums">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-right text-xs text-muted-foreground">incl. VAT</p>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Secure SSL checkout
            </p>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
};

/* ---------- Local helpers (file-private) ---------- */

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="block text-sm">
    <span className="mb-1 block font-medium text-foreground">
      {label}
      {required && <span aria-hidden className="text-destructive"> *</span>}
    </span>
    {children}
  </label>
);

const RadioCard = ({
  checked,
  onChange,
  title,
  meta,
  description,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  meta?: string;
  description?: string;
}) => (
  <label
    className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition ${
      checked ? "border-primary bg-primary/5" : "border-border hover:border-input"
    }`}
  >
    <input
      type="radio"
      checked={checked}
      onChange={onChange}
      className="mt-1 h-4 w-4 accent-primary"
    />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">{title}</span>
        {meta && <span className="text-sm font-medium text-success">{meta}</span>}
      </div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  </label>
);

const ReviewBlock = ({
  title,
  body,
  onEdit,
}: {
  title: string;
  body: React.ReactNode;
  onEdit: () => void;
}) => (
  <div className="mt-4 border-t border-border pt-4 first:mt-0 first:border-t-0 first:pt-0">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <button
        type="button"
        onClick={onEdit}
        className="text-sm font-medium text-primary hover:underline"
      >
        Edit
      </button>
    </div>
    <div className="mt-2 text-sm text-foreground/85">{body}</div>
  </div>
);

export default Checkout;