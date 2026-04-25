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
import vysnTevoMiniPendant from "@/assets/product-vysn-tevo-mini-pendant.jpg";
import vysnTevo360Downlight from "@/assets/product-vysn-tevo-360-downlight.jpg";
import vysnVelythFloor from "@/assets/product-vysn-velyth-floor.jpg";
import artemideTolomeo from "@/assets/product-artemide-tolomeo.jpg";
import artemideNesso from "@/assets/product-artemide-nesso.jpg";
import artemidePirce from "@/assets/product-artemide-pirce.jpg";
import artemideTizio from "@/assets/product-artemide-tizio.jpg";

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
  /* ---------- VYSN — German technical / professional lighting ---------- */
  {
    slug: "vysn-tevo-mini-pendant-white",
    name: "Tevo Mini Pendant White",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "VY V107013N9W",
    price: 49.9,
    image: vysnTevoMiniPendant,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#ffffff", "#1f1f1f", "#9b8b6a"],
    description:
      "Compact GU10 pendant from the Tevo Mini series. Modular, elegant and ready to install — perfect above kitchen islands, dining tables and counters.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 35W" },
      { label: "Dimensions", value: "Ø 60 × H 110 mm" },
      { label: "Cable length", value: "1.8 m (shortenable)" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "vysn-tevo-mini-pendant-black",
    name: "Tevo Mini Pendant Black",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "VY V107013N9B",
    price: 49.9,
    image: vysnTevoMiniPendant,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#1f1f1f", "#ffffff"],
    description:
      "The matte black version of the Tevo Mini Pendant. A discreet architectural pendant with directed GU10 light — ideal for modern hospitality and residential interiors.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 35W" },
      { label: "Dimensions", value: "Ø 60 × H 110 mm" },
      { label: "Cable length", value: "1.8 m (shortenable)" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "vysn-tevo-360-downlight-white",
    name: "Tevo 360 Downlight White",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Recessed spot",
    categorySlug: "recessed-spots",
    sku: "VY V104100T2W",
    price: 49.9,
    image: vysnTevo360Downlight,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#ffffff", "#1f1f1f"],
    description:
      "Integrated LED downlight with a fully rotating and tiltable inner module — set the beam exactly where you need it, then leave the trim flush to the ceiling.",
    specs: [
      { label: "Lamp type", value: "Integrated LED 7W" },
      { label: "Color temperature", value: "3000K warm white" },
      { label: "Lumens", value: "560 lm" },
      { label: "Cut-out", value: "Ø 75 mm" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "vysn-onis-1-w",
    name: "Onis 1 W Surface Spot",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Ceiling spot",
    categorySlug: "ceiling-lamps",
    sku: "VY V101101N9W",
    price: 49.9,
    image: vysnTevo360Downlight,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#ffffff", "#1f1f1f", "#9b8b6a"],
    description:
      "Single surface-mounted GU10 spot with a tiltable head. Minimal, plaster-friendly cylinder for ceilings where recessing is not possible.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 50W" },
      { label: "Dimensions", value: "Ø 80 × H 100 mm" },
      { label: "Beam angle", value: "36° (adjustable ±30°)" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "vysn-tevo-1phase-gu10-white",
    name: "Tevo 1-Phase Track Spot GU10",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Ceiling spot",
    categorySlug: "ceiling-lamps",
    sku: "VY V114100N9W",
    price: 29.9,
    image: vysnTevo360Downlight,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#ffffff", "#1f1f1f"],
    description:
      "GU10 spot for the VYSN 1-phase track system. Pair with the Tevo Mini Wing or 1-Phase Set for a complete modular ceiling solution.",
    specs: [
      { label: "Lamp type", value: "1 x GU10 max. 35W" },
      { label: "Track", value: "1-phase, 230V" },
      { label: "Beam angle", value: "36° (adjustable)" },
      { label: "IP rating", value: "IP20" },
    ],
  },
  {
    slug: "vysn-velyth-floor-4000k",
    name: "Velyth Floor 4000K Office Lamp",
    brand: "VYSN",
    brandSlug: "vysn",
    category: "Floor lamp",
    categorySlug: "floor-lamps",
    sku: "VY V108120B4W",
    price: 729.0,
    originalPrice: 799.0,
    image: vysnVelythFloor,
    inStock: true,
    leadTime: "3-5 working days",
    colors: ["#1f1f1f", "#ffffff"],
    description:
      "Professional LED office floor lamp with up- and down-light distribution. Touch-dimmable with integrated motion and daylight sensors — UGR < 13 for glare-free workspace lighting.",
    specs: [
      { label: "Power", value: "120W LED, integrated" },
      { label: "Color temperature", value: "4000K neutral white" },
      { label: "Color rendering", value: "CRI 90+" },
      { label: "Glare rating", value: "UGR < 13" },
      { label: "Height", value: "1950 mm" },
    ],
  },
  /* ---------- Artemide — iconic Italian designer lighting ---------- */
  {
    slug: "artemide-tolomeo-tavolo",
    name: "Artemide Tolomeo Tavolo Desk Lamp",
    brand: "Artemide",
    brandSlug: "artemide",
    category: "Table lamp",
    categorySlug: "table-lamps",
    sku: "AR A004800",
    price: 379.0,
    image: artemideTolomeo,
    inStock: true,
    leadTime: "3-5 working days",
    colors: ["#c9c9c9", "#1f1f1f"],
    description:
      "Designed in 1987 by Michele De Lucchi and Giancarlo Fassina, Tolomeo is one of the most recognised desk lamps in the world. Polished aluminium body with a fully articulated arm and rotating diffuser — a true icon of Italian industrial design.",
    specs: [
      { label: "Lamp type", value: "1 x E27 max. 60W" },
      { label: "Dimmable", value: "Yes (dimmer not included)" },
      { label: "Arm reach", value: "780 mm (max)" },
      { label: "Base", value: "Ø 230 mm" },
    ],
  },
  {
    slug: "artemide-nesso-orange",
    name: "Artemide Nesso Table Lamp Orange",
    brand: "Artemide",
    brandSlug: "artemide",
    category: "Table lamp",
    categorySlug: "table-lamps",
    sku: "AR 0056010A",
    price: 295.0,
    image: artemideNesso,
    inStock: true,
    leadTime: "1-2 working days",
    colors: ["#e8662a", "#ffffff", "#1f1f1f"],
    description:
      "Giancarlo Mattioli's mushroom-shaped Nesso, designed in 1967, is part of MoMA's permanent collection. Its sculptural ABS shade diffuses warm, even light — a pop-design classic that still feels contemporary.",
    specs: [
      { label: "Lamp type", value: "4 x E14 max. 25W" },
      { label: "Dimmable", value: "Yes" },
      { label: "Dimensions", value: "Ø 540 × H 340 mm" },
      { label: "Material", value: "Injection-moulded ABS" },
    ],
  },
  {
    slug: "artemide-pirce-mini-suspension",
    name: "Artemide Pirce Mini Suspension Aluminium",
    brand: "Artemide",
    brandSlug: "artemide",
    category: "Pendant lamp",
    categorySlug: "pendant-lamps",
    sku: "AR 1255010A",
    price: 1089.0,
    originalPrice: 1289.0,
    image: artemidePirce,
    inStock: true,
    leadTime: "5-10 working days",
    colors: ["#c9c9c9", "#ffffff"],
    description:
      "Designed by Giuseppe Maurizio Scutellà, Pirce is a sculptural suspension built from a single sheet of die-cut aluminium spiralling outwards. Direct and indirect light combine for a soft, atmospheric glow.",
    specs: [
      { label: "Lamp type", value: "Integrated LED 27W" },
      { label: "Dimmable", value: "Dali / push" },
      { label: "Dimensions", value: "Ø 480 × H 200 mm" },
      { label: "Color temperature", value: "3000K" },
    ],
  },
  {
    slug: "artemide-tizio-classic-black",
    name: "Artemide Tizio Classic Desk Lamp Black",
    brand: "Artemide",
    brandSlug: "artemide",
    category: "Table lamp",
    categorySlug: "table-lamps",
    sku: "AR A009010",
    price: 459.0,
    image: artemideTizio,
    inStock: true,
    leadTime: "3-5 working days",
    colors: ["#1f1f1f"],
    description:
      "Richard Sapper's 1972 Tizio is the desk lamp that defined a generation. Counterweighted parallel arms move with a single fingertip and stay perfectly in place — engineering and sculpture in one.",
    specs: [
      { label: "Lamp type", value: "Integrated LED 10W" },
      { label: "Dimmable", value: "Touch dimmer on base" },
      { label: "Arm reach", value: "1100 mm" },
      { label: "Color temperature", value: "2700K" },
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
  { slug: "artemide", name: "Artemide" },
  { slug: "philips", name: "Philips" },
  { slug: "normann-copenhagen", name: "Normann Copenhagen" },
  { slug: "absinthe", name: "Absinthe Lights" },
  { slug: "vysn", name: "VYSN" },
];