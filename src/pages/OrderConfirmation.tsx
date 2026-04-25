import { CheckCircle2, Mail, Package } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { formatPrice } from "@/components/product/ProductCard";

type Summary = {
  orderId: string;
  email: string;
  total: number;
  itemCount: number;
  delivery: "standard" | "pickup";
  payment: string;
};

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const state = (useLocation().state as Summary | null) ?? null;

  useEffect(() => {
    document.title = "Order confirmed — Abitaz";
  }, []);

  // If user lands here directly without state, send them home
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  return (
    <SiteLayout>
      <div className="container-abitaz py-12">
        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-center md:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold md:text-4xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your order has been placed and is being processed.
          </p>

          <dl className="mx-auto mt-8 grid max-w-md gap-3 rounded-md border border-border bg-surface p-5 text-left text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Order number</dt>
              <dd className="font-mono font-semibold">{state.orderId}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd>{state.itemCount}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Total paid</dt>
              <dd className="font-display font-bold">{formatPrice(state.total)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>
                {state.delivery === "standard"
                  ? "Standard delivery"
                  : "Pickup in Heist-op-den-Berg"}
              </dd>
            </div>
          </dl>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            A confirmation has been sent to{" "}
            <span className="font-medium text-foreground">{state.email}</span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
            >
              Continue shopping
            </Link>
            <Link
              to="/account"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-input bg-background px-5 text-sm font-medium hover:bg-muted"
            >
              <Package className="h-4 w-4" /> Track my order
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default OrderConfirmation;