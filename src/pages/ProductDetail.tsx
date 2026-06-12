import {
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductCard } from "@/components/product/ProductCard";
import { productBySlug, products, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

/* ---------- helpers ---------- */

/** Dutch euro format: €34,90 — matches PDP blueprint v3 / mockup v8. */
const eur = (n: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(n);

/** Staffel tiers per blueprint §4.1 — applied to every product as a demo
 *  fallback until the Odoo pricelist is wired up. */
const tiersFor = (basePrice: number) => [
  { min: 12, price: +(basePrice * 0.86).toFixed(2) },
  { min: 6, price: +(basePrice * 0.93).toFixed(2) },
  { min: 1, price: basePrice },
];
const tierFor = (qty: number, basePrice: number) =>
  tiersFor(basePrice).find((t) => qty >= t.min) ?? { min: 1, price: basePrice };

/** Group flat specs into the four blueprint groups (§4.7). Falls back to
 *  "Algemeen" when we can't classify a label. */
const SPEC_GROUPS = [
  { key: "dimensions", title: "Afmetingen & inbouw", match: /(dimension|afmeting|cut[- ]?out|diameter|inbouwdiepte|height|width|gewicht|weight|ø|maat)/i },
  { key: "general", title: "Algemeen", match: /(fitting|montage|behuizing|materiaal|kleur|colou?r|finish|toepassing|verstelbaar|track)/i },
  { key: "light", title: "Licht", match: /(lamp|lumen|kelvin|color temperature|cri|beam|stralingshoek|dim|lichtbron|lifespan|levensduur)/i },
  { key: "electrical", title: "Elektrisch & veiligheid", match: /(volt|watt|spanning|vermogen|ip[ -]?rating|beschermings|klasse|class|power)/i },
] as const;

const groupSpecs = (specs: Product["specs"]) => {
  const buckets: Record<string, Product["specs"]> = {
    dimensions: [], general: [], light: [], electrical: [],
  };
  for (const s of specs) {
    const g = SPEC_GROUPS.find((G) => G.match.test(s.label) || G.match.test(s.value));
    buckets[g?.key ?? "general"].push(s);
  }
  return buckets;
};

/* ---------- component ---------- */

const ProductDetail = () => {
  const { slug = "" } = useParams();
  const product = productBySlug(slug) ?? products[0];
  const { addItem } = useCart();

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [staffelOpen, setStaffelOpen] = useState(false);
  const [openSpecKey, setOpenSpecKey] = useState<string>("dimensions");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openDoc, setOpenDoc] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  /* gallery — main image + related thumbs (no extra assets needed) */
  const gallery = useMemo(() => {
    const main = { src: product.image, alt: product.name };
    const extras = (product.gallery ?? []).map((src, i) => ({
      src,
      alt: `${product.name} — beeld ${i + 2}`,
    }));
    return [main, ...extras];
  }, [product]);

  /* compatible bulbs (Odoo cross-sell — blueprint §4.6) */
  const bulbs = useMemo(
    () => (product.compatibleBulbs ?? [])
      .map((s) => products.find((p) => p.slug === s))
      .filter((p): p is Product => !!p),
    [product],
  );

  /* variant siblings — same brand + category (blueprint §4.4) */
  const siblings = useMemo(
    () => products.filter((p) =>
      p.slug !== product.slug &&
      p.brandSlug === product.brandSlug &&
      p.categorySlug === product.categorySlug,
    ).slice(0, 4),
    [product],
  );

  const related = useMemo(
    () => products.filter((p) =>
      p.slug !== product.slug && p.categorySlug === product.categorySlug,
    ).slice(0, 3),
    [product],
  );

  const accessory = useMemo(
    () => products.find((p) => p.category === "Light bulb"),
    [],
  );

  /* sticky on scroll past buy-box */
  const buyBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const el = buyBoxRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setShowSticky(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* reset state on slug change */
  useEffect(() => {
    setActiveImage(0); setQty(1); setStaffelOpen(false);
  }, [product.slug]);

  /* SEO */
  useEffect(() => {
    document.title = `${product.name} — Abitaz`;
    const desc = `${product.name} van ${product.brand}. ${product.description.slice(0, 140)}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [product]);

  /* derived pricing */
  const tier = tierFor(qty, product.price);
  const unitPrice = tier.price;
  const rrp = product.originalPrice ?? +(product.price * 1.15).toFixed(2);
  const discountPct = Math.max(0, Math.round((1 - unitPrice / rrp) * 100));
  const tiers = tiersFor(product.price);

  const nudgeText =
    qty < 6 ? <>Meer nodig? <b className="text-foreground">Vanaf 6 stuks {eur(tiers[1].price)}/stuk</b></>
    : qty < 12 ? <><b className="text-foreground">Staffelkorting actief</b> — vanaf 12 stuks {eur(tiers[0].price)}/stuk</>
    : <><b className="text-foreground">Hoogste staffelkorting actief</b> — {eur(tiers[0].price)}/stuk</>;

  /* pills — first 4 specs */
  const pills = product.specs.slice(0, 4).map((s) => s.value.split(",")[0].trim());

  /* spec groups */
  const grouped = groupSpecs(product.specs);
  const specGroups = SPEC_GROUPS.filter((g) => grouped[g.key].length > 0);

  /* FAQ (generic Dutch defaults — to be sourced from PIM per producttype) */
  const faqs = [
    { q: `Is de ${product.name} dimbaar?`, a: "Zie 'Licht' bij de specificaties. Bij modellen met verwisselbare GU10/E27-fitting bepaalt de gekozen lichtbron en dimmer of dimmen mogelijk is." },
    { q: "Hoe lang is de levertijd?", a: `Standaard ${product.leadTime}. Bestellingen voor 16u worden dezelfde werkdag verzonden.` },
    { q: "Wat is het retourbeleid?", a: "Je hebt 30 dagen bedenktijd. Het product moet ongebruikt en in de originele verpakking zijn." },
    { q: "Krijg ik garantie?", a: "Ja, minstens 2 jaar wettelijke garantie. Sommige merken geven langere fabrieksgarantie — zie de productfiche." },
  ];

  const docs = [
    { t: `Datasheet ${product.name} — PDF`, d: "Volledige productfiche met alle technische gegevens." },
    { t: "Installatiehandleiding — PDF", d: "Stap-voor-stap montage-instructies." },
    { t: "2D-tekening (DWG/CAD)", d: "Voor opname in bouwtekeningen." },
  ];

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`Toegevoegd aan winkelmand: ${product.name}`, {
      description: `${qty} × ${eur(unitPrice)}`,
      action: { label: "Bekijk winkelmand", onClick: () => { window.location.href = "/cart"; } },
    });
  };

  return (
    <SiteLayout>
      <div className="container-abitaz py-8">
        {/* A1 — breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link to={`/categories/${product.categorySlug}`} className="hover:text-primary">{product.category}</Link></li>
            <li aria-hidden>/</li>
            <li className="font-semibold text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* HERO — gallery + buy column */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* A2 — gallery (lifestyle first; no technical drawing here) */}
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
                    aria-label={`Bekijk afbeelding ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={`aspect-square overflow-hidden rounded-md border bg-surface transition ${
                      i === activeImage
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy column */}
          <div>
            {/* brand lockup — above H1, no exit link */}
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="rounded-md border border-border px-2.5 py-1 font-display text-sm font-bold tracking-tight">
                {product.brand}
              </span>
            </div>

            {/* A3 — H1 + lead */}
            <h1 className="mb-2 font-display text-3xl font-bold leading-tight tracking-tight md:text-[32px]">
              {product.name}
            </h1>
            <p className="mb-4 max-w-[44ch] text-base text-muted-foreground">{product.description}</p>

            {/* A4 — at-a-glance pills */}
            {pills.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {pills.map((p) => (
                  <span key={p} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
            )}

            {/* A5–A9 — buy-box */}
            <div ref={buyBoxRef} className="relative rounded-lg border border-border bg-card p-5">
              {/* A5 — energy label, neutral, away from CTA */}
              <button
                type="button"
                aria-label="Energielabel — bekijk label en productfiche"
                title="Energielabel — bekijk label en productfiche"
                className="absolute right-4 top-4 rounded-sm bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground hover:bg-border"
                style={{ clipPath: "polygon(0 0, 76% 0, 100% 50%, 76% 100%, 0 100%)", paddingRight: "0.6rem" }}
              >
                F
              </button>

              {/* A7 — price (real price first, primary blue; then RRP struck) */}
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-primary">{eur(unitPrice)}</span>
                {rrp > unitPrice && (
                  <>
                    <span className="text-base text-muted-foreground line-through">{eur(rrp)}</span>
                    <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                      −{discountPct}%
                    </span>
                  </>
                )}
                <span className="text-sm text-muted-foreground">/ stuk · incl. btw</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">SKU: {product.sku}</div>

              {/* A6 — variant axes (color / size / finish) — only when present in PIM */}
              {product.axes && (
                <div className="mt-5 space-y-4">
                  {product.axes.color && product.axes.color.length > 1 && (
                    <div>
                      <div className="mb-1.5 text-sm">
                        <span className="text-muted-foreground">Kleur: </span>
                        <span className="font-semibold text-foreground">
                          {product.axes.color.find((c) => c.slug === product.slug)?.label ?? product.axes.color[0].label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.axes.color.map((c) => {
                          const active = c.slug === product.slug;
                          return (
                            <Link
                              key={c.label}
                              to={`/products/${c.slug}`}
                              aria-label={c.label}
                              title={c.label}
                              className={`grid h-9 w-9 place-items-center rounded-full border-2 transition ${
                                active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
                              }`}
                            >
                              <span className="h-6 w-6 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {product.axes.size && product.axes.size.length > 1 && (
                    <div>
                      <div className="mb-1.5 text-sm text-muted-foreground">Maat</div>
                      <div className="flex flex-wrap gap-2">
                        {product.axes.size.map((s, i) => (
                          <Link key={s.label} to={`/products/${s.slug}`}
                            className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                              i === 1 ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                            }`}>
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.axes.finish && product.axes.finish.length > 1 && (
                    <div>
                      <div className="mb-1.5 text-sm text-muted-foreground">Afwerking</div>
                      <div className="flex flex-wrap gap-2">
                        {product.axes.finish.map((f, i) => (
                          <Link key={f.label} to={`/products/${f.slug}`}
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                              i === 0 ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50"
                            }`}>
                            {f.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* A8 — qty stepper + CTA */}
              {product.salesMode === "affiliate" && product.affiliateOffers ? (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-foreground">Verkrijgbaar bij</div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Affiliate
                    </span>
                  </div>
                  <ul className="divide-y divide-border rounded-md border border-border">
                    {product.affiliateOffers.map((o) => (
                      <li key={o.retailer} className="flex items-center gap-3 p-3">
                        <div className="grid h-10 w-10 place-items-center rounded-md bg-muted font-display text-xs font-bold text-muted-foreground">
                          {o.retailer.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold">{o.retailer}</div>
                          {o.note && <div className="text-xs text-muted-foreground">{o.note}</div>}
                        </div>
                        <div className="text-right font-display text-base font-extrabold">{eur(o.price)}</div>
                        <a href={o.url} target="_blank" rel="sponsored noopener noreferrer"
                          className="inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-bold text-primary-foreground hover:bg-primary-hover">
                          Bekijk <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Wij verkopen dit product niet zelf — Abitaz toont de beste verkrijgbare optie.
                  </p>
                </div>
              ) : (
              <div className="mt-5 flex gap-2">
                <div className="inline-flex items-center rounded-md border border-foreground/40">
                  <button type="button" aria-label="Minder" onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-[50px] w-[42px] place-items-center bg-card text-foreground hover:bg-muted">
                    <Minus className="h-4 w-4" />
                  </button>
                  <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
                    className="h-[50px] w-12 border-x border-foreground/40 bg-card text-center font-display text-base font-semibold"
                    aria-label="Aantal" inputMode="numeric" />
                  <button type="button" aria-label="Meer" onClick={() => setQty((q) => q + 1)}
                    className="grid h-[50px] w-[42px] place-items-center bg-card text-foreground hover:bg-muted">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button type="button" onClick={handleAddToCart}
                  className="h-[50px] flex-1 rounded-md bg-cta font-display text-base font-bold text-cta-foreground transition hover:bg-cta-hover">
                  In winkelmand
                </button>
              </div>
              )}

              {/* A8 — staffel-nudge (subtle, collapsible per §4.1) — hidden in affiliate mode */}
              {product.salesMode !== "affiliate" && (
              <div className="mt-4">
                <button type="button" onClick={() => setStaffelOpen((o) => !o)} aria-expanded={staffelOpen}
                  className="flex w-full items-center justify-between gap-3 border-b border-border py-2 text-left text-[13px] text-muted-foreground">
                  <span>{nudgeText}</span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary">
                    Bekijk staffel <ChevronDown className={`h-3.5 w-3.5 transition-transform ${staffelOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {staffelOpen && (
                  <div className="mt-2 overflow-hidden rounded-md border border-border text-sm">
                    {tiers.slice().reverse().map((t, i, arr) => {
                      const isActive = t.min === tier.min;
                      const next = arr[i + 1];
                      const range = next ? `${t.min} – ${next.min - 1} stuks` : `${t.min}+ stuks`;
                      const save = Math.round((1 - t.price / product.price) * 100);
                      return (
                        <div key={t.min} className={`flex justify-between border-b border-border px-3 py-2 last:border-b-0 ${isActive ? "bg-surface" : ""}`}>
                          <span className="text-muted-foreground">{range}</span>
                          <span className="font-semibold">
                            {eur(t.price)}
                            {save > 0 && <span className="ml-1 text-xs font-bold text-primary">−{save}%</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              )}

              {/* A9 — reassurance row */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-medium">
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Gratis verzending vanaf €50</span>
                <span className="inline-flex items-center gap-1.5"><Truck className="h-4 w-4 text-success" /> Levertijd {product.leadTime}</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> 30 dagen retour</span>
              </div>

              {/* A9 — in-the-box */}
              <div className="mt-4 border-t border-border pt-3">
                <div className="mb-1.5 text-[13px] font-semibold text-muted-foreground">In de doos</div>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  <li className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Armatuur</li>
                  <li className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> Bevestigingsmateriaal</li>
                  <li className="inline-flex items-center gap-1.5 text-muted-foreground"><X className="h-4 w-4 text-destructive" /> Lichtbron — apart te bestellen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* B1 — key features */}
        {siblings.length > 0 && (
          <section className="mt-12 border-t border-border pt-11">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Andere maten & uitvoeringen</div>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Ook verkrijgbaar als</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {siblings.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Backend: gegroepeerd op <code>x_parent_sku</code> (Odoo PIM) — hier nu op merk + categorie als fallback.
            </p>
          </section>
        )}

        <section className="mt-12 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Waarom dit product</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Drie dingen die het verschil maken</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {(product.specs.slice(0, 3).length === 3 ? product.specs.slice(0, 3) : [
              { label: "Kwaliteit", value: "Architecturale afwerking" },
              { label: "Eenvoudige montage", value: "Plug-and-play" },
              { label: "Lange levensduur", value: "Garantie minstens 2 jaar" },
            ]).map((s) => (
              <div key={s.label}>
                <div className="mb-1.5 text-xs font-bold text-primary">{s.label}</div>
                <div className="mb-1 font-display text-lg font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{product.description.split(".")[0]}.</div>
              </div>
            ))}
          </div>
        </section>

        {/* B3 — toepassing / context */}
        <section className="mt-11 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Toepassing</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Waar dit product thuishoort</h2>
          <p className="max-w-[72ch] text-base text-muted-foreground">{product.description}</p>
        </section>

        {/* B4 — specs accordions (with dims group open by default) */}
        <section id="tech" className="mt-11 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Specificaties</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Technische gegevens</h2>
          <div className="border-t border-border">
            {specGroups.map((g) => {
              const open = openSpecKey === g.key;
              return (
                <div key={g.key} className="border-b border-border">
                  <button type="button" onClick={() => setOpenSpecKey(open ? "" : g.key)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold">
                    {g.title}
                    <span className="text-xl font-bold text-primary">{open ? "–" : "+"}</span>
                  </button>
                  {open && (
                    <div className="pb-5">
                      <div className="grid gap-x-7 md:grid-cols-2">
                        {grouped[g.key].map((s) => (
                          <div key={s.label} className="flex justify-between gap-3 border-b border-border py-2 text-sm">
                            <span className="text-muted-foreground">{s.label}</span>
                            <span className="text-right font-semibold">{s.value}</span>
                          </div>
                        ))}
                      </div>
                      {g.key === "light" && (
                        <p className="mt-3 text-xs italic text-muted-foreground">
                          Bij modellen met geïntegreerde LED vult deze groep met lumen, CRI, kleurtemperatuur, stralingshoek en levensduur.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* B5 — bundle + cross-sell */}
        {accessory && (
          <section className="mt-11 border-t border-border pt-11">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Compleet maken</div>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Vergeet je lichtbron niet</h2>
            <div className="mb-6 flex flex-wrap items-center gap-5 rounded-lg border border-cta bg-cta/5 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-[72px] w-[72px] place-items-center rounded-md border border-border bg-card">
                  <img src={product.image} alt="" className="h-3/4 w-3/4 object-contain" />
                </div>
                <span className="font-display text-2xl text-cta">+</span>
                <div className="grid h-[72px] w-[72px] place-items-center rounded-md border border-border bg-card">
                  <img src={accessory.image} alt="" className="h-3/4 w-3/4 object-contain" />
                </div>
              </div>
              <div className="min-w-[200px] flex-1">
                <div className="font-display text-base font-bold">{product.name} + {accessory.name}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">Set met de aanbevolen lichtbron — klaar om te plaatsen.</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground line-through">{eur(product.price + accessory.price)}</div>
                <div className="font-display text-xl font-extrabold text-cta">{eur((product.price + accessory.price) * 0.9)}</div>
                <div className="text-xs font-semibold text-success">bespaar {eur((product.price + accessory.price) * 0.1)}</div>
              </div>
              <button type="button" className="rounded-md bg-cta px-4 py-3 font-display text-sm font-bold text-cta-foreground hover:bg-cta-hover">
                Set in winkelmand
              </button>
            </div>
            {related.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            )}
          </section>
        )}

        {/* C1 — FAQ */}
        <section className="mt-11 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Veelgestelde vragen</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Wat je wil weten</h2>
          <div className="border-t border-border">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold">
                    {f.q}
                    <span className="text-xl font-bold text-primary">{open ? "–" : "+"}</span>
                  </button>
                  {open && <p className="max-w-[78ch] pb-5 text-sm text-muted-foreground">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* C2 — downloads */}
        <section className="mt-11 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Documenten</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Downloads</h2>
          <div className="border-t border-border">
            {docs.map((d, i) => {
              const open = openDoc === i;
              return (
                <div key={d.t} className="border-b border-border">
                  <button type="button" onClick={() => setOpenDoc(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold">
                    <span className="inline-flex items-center gap-2"><Download className="h-4 w-4 text-primary" />{d.t}</span>
                    <span className="text-xl font-bold text-primary">{open ? "–" : "+"}</span>
                  </button>
                  {open && <p className="max-w-[78ch] pb-5 text-sm text-muted-foreground">{d.d}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* C3 — reviews empty */}
        <section className="mt-11 border-t border-border pt-11">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Beoordelingen</div>
          <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Nog geen reviews</h2>
          <div className="rounded-md border border-dashed border-border p-5 text-sm text-muted-foreground">
            Dit product heeft nog geen beoordelingen. Heb je het geplaatst? Laat als eerste een review achter — echte ervaringen helpen anderen kiezen.
          </div>
        </section>

        {/* C4 — related */}
        {related.length > 0 && (
          <section className="mt-11 border-t border-border pt-11">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Ook bekeken</div>
            <h2 className="mb-5 font-display text-3xl font-bold tracking-tight">Vergelijkbare producten</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </section>
        )}

        {/* C5 — brand block */}
        <section className="mt-11 border-t border-border pt-11">
          <div className="flex flex-wrap items-center gap-5 rounded-lg border border-border bg-card p-5">
            <div className="font-display text-xl font-extrabold tracking-tight">{product.brand}</div>
            <p className="min-w-[220px] flex-1 text-sm text-muted-foreground">
              Ontdek het volledige assortiment van {product.brand}.
            </p>
            <Link to={`/brands/${product.brandSlug}`}
              className="rounded-md border-2 border-primary px-4 py-2 font-display text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground">
              Naar {product.brand} →
            </Link>
          </div>
        </section>
      </div>

      {/* Sticky add-to-cart — top on desktop, bottom on mobile */}
      <div
        className={`fixed left-0 right-0 z-50 border-border bg-card shadow-lg transition-transform md:top-0 md:border-b ${
          showSticky ? "translate-y-0" : "-translate-y-full max-md:translate-y-full"
        } max-md:bottom-0 max-md:top-auto max-md:border-t`}
      >
        <div className="container-abitaz flex h-[70px] items-center gap-4">
          <div className="flex-1 font-display text-base font-bold">
            {product.name}
            <small className="block font-sans text-xs font-normal text-muted-foreground max-md:hidden">
              {product.brand} · {product.sku}
            </small>
          </div>
          <div className="font-display text-xl font-extrabold max-md:hidden">{eur(unitPrice)}</div>
          <button type="button" onClick={handleAddToCart}
            className="h-[46px] rounded-md bg-cta px-5 font-display text-sm font-bold text-cta-foreground hover:bg-cta-hover md:w-[200px]">
            In winkelmand
          </button>
        </div>
      </div>
    </SiteLayout>
  );
};

export default ProductDetail;