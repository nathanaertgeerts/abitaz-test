import { Link } from "react-router-dom";
import promoSummer from "@/assets/promo-summer-gift.jpg";
import promoDesigner from "@/assets/promo-designer-sale.jpg";

type Promo = {
  to: string;
  image: string;
  align: "left" | "right";
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  code?: string;
  badge?: string;
  theme: "light" | "dark";
};

const promos: Promo[] = [
  {
    to: "/sale",
    image: promoSummer,
    align: "left",
    eyebrow: "The gift of summer",
    title: (
      <>
        Score <span className="text-cta">5% off</span>
      </>
    ),
    subtitle: "with this discount code*",
    code: "ABITAZ5",
    theme: "dark",
  },
  {
    to: "/brands/flos",
    image: promoDesigner,
    align: "right",
    eyebrow: "Designer collection",
    title: <>Flos & friends</>,
    subtitle: "Selected designer pieces",
    badge: "-15%",
    theme: "dark",
  },
];

export const PromoBanners = () => {
  return (
    <section aria-label="Current promotions" className="container-abitaz mt-14">
      <div className="grid gap-4 md:grid-cols-2">
        {promos.map((p, i) => (
          <Link
            key={i}
            to={p.to}
            className="group relative block overflow-hidden rounded-lg"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              width={1280}
              height={640}
              className="aspect-[2/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              className={`absolute inset-0 ${
                p.align === "left"
                  ? "bg-gradient-to-r from-black/80 via-black/50 to-black/10"
                  : "bg-gradient-to-l from-black/80 via-black/50 to-black/10"
              }`}
            />

            {p.badge && (
              <span className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cta text-sm font-bold text-cta-foreground shadow-lg md:h-14 md:w-14 md:text-base">
                {p.badge}
              </span>
            )}

            <div
              className={`absolute inset-0 flex flex-col justify-center gap-2 p-6 text-white md:p-10 ${
                p.align === "left" ? "items-start text-left" : "items-end text-right"
              }`}
            >
              {p.eyebrow && (
                <span className="text-sm font-medium opacity-90 md:text-base">
                  {p.eyebrow}
                </span>
              )}
              <h3 className="font-display text-2xl font-bold leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.45)] md:text-4xl">
                {p.title}
              </h3>
              {p.subtitle && (
                <span className="text-sm opacity-90 md:text-base">{p.subtitle}</span>
              )}
              {p.code && (
                <span className="mt-2 inline-flex items-center rounded-md border-2 border-white/80 px-4 py-2 font-display text-base font-bold tracking-wide md:text-lg">
                  {p.code}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
