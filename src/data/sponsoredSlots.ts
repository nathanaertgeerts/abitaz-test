import pendantOrange from "@/assets/product-pendant-orange.jpg";
import pendantGreen from "@/assets/product-pendant-green.jpg";
import pendantBlack from "@/assets/product-pendant-black.jpg";

/**
 * Monetized sponsored brand slot per category slug.
 * Shown in the new bottom section beside the buying guide.
 * Will later be CMS / admin-driven, with rotation + tracking.
 */
export type SponsoredSlot = {
  brand: string;
  /** Logo wordmark text (used until a real logo image is wired up). */
  wordmark: string;
  /** Lifestyle / hero image for the sponsor card. */
  image: string;
  /** Short headline under the image. */
  headline: string;
  /** One-paragraph pitch. */
  copy: string;
  /** CTA destination on the abitaz storefront. */
  href: string;
  /** CTA label. */
  cta: string;
};

const slots: Record<string, SponsoredSlot> = {
  "pendant-lamps": {
    brand: "Louis Poulsen",
    wordmark: "LOUIS POULSEN",
    image: pendantOrange,
    headline: "Danish design heritage, glare-free light",
    copy:
      "From the iconic PH 5 to contemporary classics — discover Louis Poulsen pendants engineered for warm, glare-free light in your dining room or kitchen.",
    href: "/brands/louis-poulsen",
    cta: "Shop Louis Poulsen",
  },
  "ceiling-lamps": {
    brand: "Flos",
    wordmark: "FLOS",
    image: pendantBlack,
    headline: "Italian design icons since 1962",
    copy:
      "Discover Flos ceiling lamps — sculptural fixtures from the world's most awarded designers, in stock and shipping in 1–2 days.",
    href: "/brands/flos",
    cta: "Shop Flos",
  },
  "wall-lamps": {
    brand: "&tradition",
    wordmark: "&TRADITION",
    image: pendantGreen,
    headline: "Nordic craft, future heirlooms",
    copy:
      "&tradition wall lamps pair contemporary designers with timeless Scandinavian craft. Curated picks, honest prices, real stock.",
    href: "/brands/and-tradition",
    cta: "Shop &tradition",
  },
};

const fallback: SponsoredSlot = {
  brand: "Designer brands",
  wordmark: "ABITAZ EDIT",
  image: pendantOrange,
  headline: "The Abitaz designer edit",
  copy:
    "Hand-picked pieces from the brands we trust — in stock, with honest prices and shipping straight from our European warehouse.",
  href: "/brands",
  cta: "Browse brands",
};

export const getSponsoredSlot = (slug: string): SponsoredSlot =>
  slots[slug] ?? fallback;
