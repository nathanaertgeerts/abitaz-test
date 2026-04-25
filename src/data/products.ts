import pendantOrange from "@/assets/product-pendant-orange.jpg";
import pendantGreen from "@/assets/product-pendant-green.jpg";
import pendantWhite from "@/assets/product-pendant-white.jpg";
import pendantBlack from "@/assets/product-pendant-black.jpg";
import pendantDome from "@/assets/product-pendant-dome.jpg";
import pendantGlobe from "@/assets/product-pendant-globe.jpg";
import bulbEdison from "@/assets/product-bulb-edison.jpg";
import absintheClickfitBlack from "@/assets/product-absinthe-clickfit-black.jpg";
import absintheCylinderWhite from "@/assets/product-absinthe-cylinder-white.jpg";
import absintheChuckDouble from "@/assets/product-absinthe-chuck-double.jpg";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  sku: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  leadTime: string;
  colors?: string[];
  description: string;
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: "louis-poulsen-ph5-mini-orange",
    name: "Louis Poulsen PH5 Mini Orange tones",
    brand: "Louis Poulsen",
    brandSlug: "louis-poulsen",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "LO 5741095104",
    price: 595.79,
    image: pendantOrange,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f3a5f", "#2c8d7a", "#d8423a", "#e8a13a", "#3f5c3a", "#cfa37a", "#e5e1d3", "#1f1f1f"],
    description:
      "All the trumps of the Louis Poulsen PH 5, but in a smaller format. That's exactly what the PH 5 Mini is. The most popular PH lamp from Danish designer Poul Henningsen, reproduced in a different format. The design of the new, handy model is fully aligned with the contemporary creative lifestyle.",
    specs: [
      { label: "Lamp type", value: "1 x E14 max. 20W" },
      { label: "Dimmable", value: "Yes (dimmer not included)" },
      { label: "Water resistance", value: "IP20 No/limited protection" },
      { label: "Dimensions", value: "300 x 163 mm (Ø x H)" },
    ],
  },
  {
    slug: "tradition-flowerpot-vp2-darkgreen",
    name: "&tradition FlowerPot VP2 Dark Green",
    brand: "&tradition",
    brandSlug: "tradition",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "AT 20751101",
    price: 431.98,
    originalPrice: 575.95,
    image: pendantGreen,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#d8423a", "#1f3a5f", "#e8a13a", "#3f5c3a", "#e5e1d3"],
    description:
      "An icon of Danish design. The FlowerPot VP2 by Verner Panton features two semi-circular spheres that face each other, creating a soft, diffused light.",
    specs: [
      { label: "Lamp type", value: "1 x E27 max. 60W" },
      { label: "Dimmable", value: "Yes (dimmer not included)" },
      { label: "Water resistance", value: "IP20" },
      { label: "Dimensions", value: "230 x 245 mm (Ø x H)" },
    ],
  },
  {
    slug: "louis-poulsen-snowball",
    name: "Louis Poulsen Snowball",
    brand: "Louis Poulsen",
    brandSlug: "louis-poulsen",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "LO 5741105100",
    price: 2304.79,
    image: pendantWhite,
    inStock: true,
    leadTime: "5-10 working days",
    description:
      "The Snowball is one of Poul Henningsen's lesser-known classics. Its layered shades distribute light evenly downwards, creating a glare-free atmosphere.",
    specs: [
      { label: "Lamp type", value: "1 x E27 max. 100W" },
      { label: "Dimmable", value: "Yes" },
      { label: "Water resistance", value: "IP20" },
      { label: "Dimensions", value: "400 x 408 mm (Ø x H)" },
    ],
  },
  {
    slug: "louis-poulsen-doo-wop-darkgrey",
    name: "Louis Poulsen Doo-Wop E27 Pendant Dark Grey",
    brand: "Louis Poulsen",
    brandSlug: "louis-poulsen",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "LO 5741098300",
    price: 430.19,
    image: pendantBlack,
    inStock: true,
    leadTime: "3-5 working days",
    description: "A modern take on the iconic layered pendant. Matt black finish for contemporary interiors.",
    specs: [
      { label: "Lamp type", value: "1 x E27 max. 60W" },
      { label: "Dimmable", value: "Yes" },
      { label: "Water resistance", value: "IP20" },
      { label: "Dimensions", value: "280 x 220 mm (Ø x H)" },
    ],
  },
  {
    slug: "nordlux-balance-42-black",
    name: "Nordlux Balance 42 3-step dim Black",
    brand: "Nordlux",
    brandSlug: "nordlux",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "NX 2010693003",
    price: 157.75,
    image: pendantDome,
    inStock: true,
    leadTime: "1-2 working days",
    description: "A minimalist pendant with integrated 3-step dimming. Perfect above a dining table.",
    specs: [
      { label: "Lamp type", value: "Integrated LED 14W" },
      { label: "Dimmable", value: "3-step dim built-in" },
      { label: "Water resistance", value: "IP20" },
      { label: "Dimensions", value: "420 x 200 mm (Ø x H)" },
    ],
  },
  {
    slug: "nordlux-grant-35-opal-brass",
    name: "Nordlux Grant 35 Opal / Brass",
    brand: "Nordlux",
    brandSlug: "nordlux",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "NX 2010753035",
    price: 127.74,
    originalPrice: 695.15,
    image: pendantGlobe,
    inStock: true,
    leadTime: "1-2 working days",
    description: "A classic opal globe pendant with brass detailing. Soft, diffused light for any room.",
    specs: [
      { label: "Lamp type", value: "1 x E27 max. 40W" },
      { label: "Dimmable", value: "Yes" },
      { label: "Water resistance", value: "IP20" },
      { label: "Dimensions", value: "350 x 350 mm (Ø x H)" },
    ],
  },
  {
    slug: "philips-led-e14-43w",
    name: "Philips LED E14 4.3W 2700K Glass",
    brand: "Philips",
    brandSlug: "philips",
    category: "Light bulb",
    categorySlug: "bulbs",
    sku: "PH 8718699763114",
    price: 8.23,
    image: bulbEdison,
    inStock: true,
    leadTime: "1-2 working days",
    description: "Warm white E14 LED bulb with classic glass housing. 470 lumens, 15,000h lifespan.",
    specs: [
      { label: "Lamp type", value: "E14 LED 4.3W" },
      { label: "Color temperature", value: "2700K warm white" },
      { label: "Lumens", value: "470 lm" },
      { label: "Lifespan", value: "15,000 hours" },
    ],
  },
  {
    slug: "philips-led-e14-65w",
    name: "Philips LED E14 6.5W 2700K",
    brand: "Philips",
    brandSlug: "philips",
    category: "Light bulb",
    categorySlug: "bulbs",
    sku: "PH 8718699763121",
    price: 9.09,
    image: bulbEdison,
    inStock: true,
    leadTime: "1-2 working days",
    description: "Warm white E14 LED bulb. 806 lumens, 25,000h lifespan.",
    specs: [
      { label: "Lamp type", value: "E14 LED 6.5W" },
      { label: "Color temperature", value: "2700K warm white" },
      { label: "Lumens", value: "806 lm" },
      { label: "Lifespan", value: "25,000 hours" },
    ],
  },
  /* ---------- Absinthe Lights — Belgian architectural lighting ---------- */
  {
    slug: "absinthe-clickfit-smooth-adjustable-black",
    name: "Clickfit Smooth Adjustable Recessed Spot",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Recessed spot",
    categorySlug: "recessed-spots",
    sku: "AB 02C1SA811B0",
    price: 31.9,
    image: absintheClickfitBlack,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f1f1f", "#ffffff"],
    description:
      "Adjustable recessed downlight from the Clickfit collection. Smooth black trim with a tiltable inner reflector for precise light placement.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 50W" },
      { label: "Beam angle", value: "36° (adjustable ±25°)" },
      { label: "Cut-out", value: "Ø 80 mm" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "absinthe-clickfit-deep-large-black",
    name: "Clickfit Deep Large Recessed Spot",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Recessed spot",
    categorySlug: "recessed-spots",
    sku: "AB 02C1D8011B0",
    price: 31.9,
    image: absintheClickfitBlack,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f1f1f", "#ffffff"],
    description:
      "Deep-set black recessed spot for a flush, glare-free look. Pairs perfectly with concrete and plaster ceilings.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 50W" },
      { label: "Beam angle", value: "36°" },
      { label: "Cut-out", value: "Ø 80 mm" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "absinthe-djup-recessed-black",
    name: "Djup Recessed Spot",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Recessed spot",
    categorySlug: "recessed-spots",
    sku: "AB 01C107611B0T",
    price: 16.95,
    image: absintheClickfitBlack,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f1f1f"],
    description:
      "An entry-level deep recessed spot from Absinthe — minimalist black trim, easy installation, excellent value.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 35W" },
      { label: "Beam angle", value: "36°" },
      { label: "Cut-out", value: "Ø 75 mm" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "absinthe-clickfit-cylinder-large-white",
    name: "Clickfit Cylinder Large White",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Ceiling spot",
    categorySlug: "ceiling-lamps",
    sku: "AB 02C31220201",
    price: 42.9,
    image: absintheCylinderWhite,
    inStock: true,
    leadTime: "3-5 working days",
    colors: ["#ffffff", "#1f1f1f"],
    description:
      "Surface-mounted cylindrical downlight in matt white with a deep black anti-glare reflector. A clean architectural finish for any ceiling.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 50W" },
      { label: "Dimensions", value: "Ø 80 × H 120 mm" },
      { label: "Beam angle", value: "36°" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "absinthe-clickfit-cylinder-medium-white",
    name: "Clickfit Cylinder Medium White",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Ceiling spot",
    categorySlug: "ceiling-lamps",
    sku: "AB 02C31220101",
    price: 33.9,
    image: absintheCylinderWhite,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#ffffff"],
    description:
      "The medium-sized version of Absinthe's Clickfit Cylinder — minimalist surface-mounted spot, ideal above kitchen islands and corridors.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 50W" },
      { label: "Dimensions", value: "Ø 70 × H 100 mm" },
      { label: "Beam angle", value: "36°" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "absinthe-chuck-2-double-black",
    name: "Chuck 2 Double Surface-Mounted Spot Black",
    brand: "Absinthe",
    brandSlug: "absinthe",
    category: "Ceiling spot",
    categorySlug: "ceiling-lamps",
    sku: "AB CHK2-B",
    price: 89.0,
    originalPrice: 119.0,
    image: absintheChuckDouble,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f1f1f", "#ffffff"],
    description:
      "Twin adjustable spot from the Chuck collection. Two tiltable heads on a slim black bar — perfect for highlighting art, kitchens or hallways.",
    specs: [
      { label: "Lamp type", value: "2 x GU10 max. 50W" },
      { label: "Dimensions", value: "L 280 × W 80 × H 130 mm" },
      { label: "Beam angle", value: "36° per head, fully adjustable" },
      { label: "IP rating", value: "IP20" },
    ],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (categorySlug: string) =>
  products.filter((p) => p.categorySlug === categorySlug);

export const categories = [
  { slug: "indoor-lighting", name: "Indoor lighting", count: 1825 },
  { slug: "pendant-lamps", name: "Pendant lamps", count: 485 },
  { slug: "ceiling-lamps", name: "Ceiling lamps", count: 612 },
  { slug: "wall-lamps", name: "Wall lamps", count: 398 },
  { slug: "floor-lamps", name: "Floor lamps", count: 221 },
  { slug: "table-lamps", name: "Table lamps", count: 304 },
  { slug: "outdoor-lighting", name: "Outdoor lighting", count: 712 },
  { slug: "bulbs", name: "Light bulbs", count: 1240 },
];

export const brands = [
  { slug: "louis-poulsen", name: "Louis Poulsen" },
  { slug: "tradition", name: "&tradition" },
  { slug: "nordlux", name: "Nordlux" },
  { slug: "flos", name: "Flos" },
  { slug: "philips", name: "Philips" },
  { slug: "normann-copenhagen", name: "Normann Copenhagen" },
  { slug: "absinthe", name: "Absinthe Lights" },
];