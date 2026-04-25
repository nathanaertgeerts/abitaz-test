import { Check, Clock, Download, Headset, Minus, Package, Plus, RotateCcw, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard, formatPrice } from "@/components/product/ProductCard";
import { productBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = productBySlug(slug) ?? products[0];
  const [qty, setQty] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCart();

  /* Build a small gallery from related products in the same category so the
     thumbnails are visually distinct (no extra image assets required). */
  const gallery = useMemo(() => {
    const related = products
      .filter(
        (p) =>
          p.slug !== product.slug &&
          (p.brandSlug === product.brandSlug || p.categorySlug === product.categorySlug),
      )
      .slice(0, 4)
      .map((p) => ({ src: p.image, alt: `${product.name} — view ${p.name}` }));
    return [{ src: product.image, alt: product.name }, ...related];
  }, [product]);

  // Reset selected image when navigating to a different product
  useEffect(() => {
    setActiveImage(0);
  }, [product.slug]);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`Added to cart: ${product.name}`, {
      description: `${qty} × ${formatPrice(product.price)}`,
      action: { label: "View cart", onClick: () => { window.location.href = "/cart"; } },
    });
  };

  useEffect(() => {
    document.title = `${product.name} — Abitaz`;
    const desc = `${product.name} by ${product.brand}. ${product.description.slice(0, 140)}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [product]);

  const accessories = products.filter((p) => p.slug !== product.slug && p.category === "Light bulb").slice(0, 4);

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li aria-hidden>/</li>
            <li><a href={`/category/${product.categorySlug}`} className="hover:text-primary">{product.category}</a></li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* Top section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-surface">
              <img
                key={gallery[activeImage]?.src}
                src={gallery[activeImage]?.src ?? product.image}
                alt={gallery[activeImage]?.alt ?? product.name}
                width={800}
                height={800}
                className="h-full w-full object-contain animate-in fade-in-0 duration-200"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={img.src + i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={`aspect-square overflow-hidden rounded-md border bg-surface transition ${
                      i === activeImage
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <h1 className="font-display text-2xl font-bold md:text-3xl">{product.name}</h1>
              <span className="font-display text-sm font-semibold text-muted-foreground">{product.brand}</span>
            </div>
            <div className="mb-4 text-xs text-muted-foreground">{product.sku}</div>

            <p className="text-sm text-foreground/85">{product.description}</p>
            <a href="#tech" className="mt-2 inline-block text-sm text-primary underline">
              Go to technical details
            </a>

            {product.colors && (
              <div className="mt-6">
                <div className="text-sm font-medium">Color: <span className="text-muted-foreground">Option {activeColor + 1}</span></div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveColor(i)}
                      aria-label={`Color option ${i + 1}`}
                      className={`h-9 w-9 rounded-md border-2 ${
                        activeColor === i ? "border-primary" : "border-border"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <label className="text-sm">
                <span className="block font-medium">Light color</span>
                <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2">
                  <option>Warm white</option>
                  <option>Neutral white</option>
                </select>
              </label>
              <label className="text-sm">
                <span className="block font-medium">Width</span>
                <select className="mt-1 h-10 w-full rounded-md border border-input bg-background px-2">
                  <option>700 mm</option>
                  <option>500 mm</option>
                </select>
              </label>
            </div>

            {/* Price + add to cart */}
            <div className="mt-6 text-3xl font-bold text-primary">{formatPrice(product.price)}</div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border border-input">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 place-items-center hover:bg-muted"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                  className="h-11 w-14 border-x border-input bg-background text-center"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 place-items-center hover:bg-muted"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-11 flex-1 rounded-md bg-cta px-6 text-sm font-semibold text-cta-foreground transition hover:bg-cta-hover"
              >
                Add to cart
              </button>
            </div>

            {/* Stock */}
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1 text-success">
                <Check className="h-4 w-4" /> In stock
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" /> Lead time: {product.leadTime}
              </span>
            </div>

            {/* USPs */}
            <ul className="mt-5 space-y-1 text-sm text-foreground/85">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Up to 30-day returns</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Professional support</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Free delivery via UPS or DPD</li>
            </ul>
          </div>
        </div>

        {/* Product info two-col */}
        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-3 font-display text-xl font-bold">Product information</h2>
            <h3 className="mb-2 font-semibold">Product description</h3>
            <p className="text-sm text-foreground/85">{product.description}</p>
            <button type="button" className="mt-3 text-sm text-primary underline">Show more</button>

            <h3 className="mb-2 mt-6 font-semibold">Available documents</h3>
            <a href="#" className="inline-flex items-center gap-2 text-sm text-primary underline">
              <Download className="h-4 w-4" /> Download technical sheet
            </a>
          </div>
          <div>
            <h2 className="mb-3 font-display text-xl font-bold">Brief specifications</h2>
            <dl className="divide-y divide-border rounded-md border border-border bg-card">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>
            <a href="#tech" className="mt-3 inline-block text-sm text-primary underline">
              Go to technical details
            </a>
          </div>
        </section>

        {/* Technical accordions */}
        <section id="tech" className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold">Technical details</h2>
          <div className="overflow-hidden rounded-md border border-border">
            {["General information", "Dimensions", "Light specifications", "Technical details", "Characteristics"].map(
              (label) => (
                <details key={label} className="border-b border-border last:border-b-0 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between bg-card px-4 py-3 text-sm font-medium hover:bg-surface">
                    {label}
                    <Plus className="h-4 w-4" />
                  </summary>
                  <div className="bg-surface px-4 py-3 text-sm text-muted-foreground">
                    Detailed {label.toLowerCase()} for {product.name}.
                  </div>
                </details>
              ),
            )}
          </div>
        </section>

        {/* Accessories */}
        {accessories.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-4 font-display text-xl font-bold">Accessories</h2>
            <div className="mb-4 flex flex-wrap gap-2 text-sm">
              {[
                ["Essential accessories", accessories.length],
                ["Recommended accessories", 3],
                ["Spare parts", 3],
                ["Bulbs", 3],
              ].map(([label, count], i) => (
                <button
                  key={label as string}
                  type="button"
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 ${
                    i === 0 ? "border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {label}
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1 text-xs text-secondary-foreground">
                    {count}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {accessories.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Service strip */}
        <section className="mt-14 grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-6 md:grid-cols-4">
          {[
            { icon: Truck, t: "Free shipping €50+" },
            { icon: RotateCcw, t: "30-day returns" },
            { icon: Package, t: "In stock now" },
            { icon: Headset, t: "Expert support" },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-2 text-sm">
              <Icon className="text-cta" />
              <span className="font-medium">{t}</span>
            </div>
          ))}
        </section>
      </div>
    </SiteLayout>
  );
};

export default ProductDetail;