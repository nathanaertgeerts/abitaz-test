/**
 * Long-form, CMS-editable copy for category pages.
 *
 * Each entry powers:
 *  - a short `lede` shown directly under the H1 (the "intro description"
 *    visible in the screenshot the user attached)
 *  - a rich `body` block rendered below the product grid + pagination,
 *    optimised for both classical SEO (semantic H2/H3, internal links,
 *    keyword-rich prose) and GEO / AI-Overviews (clear definitions,
 *    structured FAQ, buying guidance — surfaces well in LLM answers).
 *  - an `faqs` list that is rendered as a real `<details>` accordion AND
 *    emitted as `FAQPage` JSON-LD for rich results.
 *
 * Keep prose human and specific to each category — generic copy hurts
 * rankings. The `fallback` entry is used for categories that don't have
 * a tailored block yet, so every page still has *some* indexable text.
 */

export type CategoryFaq = { q: string; a: string };

export type CategoryBodySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CategoryContent = {
  /** 1–2 sentence intro shown under the H1. */
  lede: string;
  /** Optional one-liner H2 above the long-form block (defaults to category name + " buying guide"). */
  bodyHeading?: string;
  /** Long-form sections rendered below the product grid. */
  body: CategoryBodySection[];
  /** FAQ accordion (also emitted as FAQPage JSON-LD). */
  faqs: CategoryFaq[];
};

const fallback: CategoryContent = {
  lede:
    "Hand-picked pieces from the brands we trust — in stock, with honest prices and shipping straight from our European warehouse.",
  body: [
    {
      heading: "What to look for",
      paragraphs: [
        "Use the filters on the left to narrow by brand, style, material, and price. Every product page lists exact dimensions, the light source or socket type, and how soon we can ship it.",
        "Not sure what fits your space? Our team replies to product questions within one working day — just hit the chat button at the bottom right.",
      ],
    },
  ],
  faqs: [
    {
      q: "How fast do you ship?",
      a: "Items marked ‘in stock’ leave our warehouse within 1–2 working days. Most EU addresses receive their order within 3–5 working days after dispatch.",
    },
    {
      q: "Can I return a product?",
      a: "Yes — you have 30 days from delivery to return any unused item in its original packaging. Returns are free within the EU.",
    },
  ],
};

const content: Record<string, CategoryContent> = {
  "pendant-lamps": {
    lede:
      "Statement pendants for above the dining table, kitchen island or hallway — from designer classics to affordable basics.",
    bodyHeading: "Pendant lamps buying guide",
    body: [
      {
        heading: "How to choose the right pendant lamp",
        paragraphs: [
          "A well-chosen pendant does two things at once: it sets the visual tone of a room and delivers focused, comfortable light exactly where you need it. For a dining table, aim for a fixture roughly half to two-thirds the width of the tabletop and hang the bottom edge 70–85 cm above the surface. Above a kitchen island, lean toward a row of two or three smaller pendants spaced evenly along the length.",
          "For hallways and stairwells, look for fixtures rated for the ceiling height of the space — long cord drops (1.5–3 m) keep proportions right in tall entryways, while flush or semi-flush options work better in standard 2.4 m rooms.",
        ],
      },
      {
        heading: "Light source: integrated LED vs. replaceable bulb",
        bullets: [
          "Integrated LED — slim, energy-efficient and often dimmable out of the box. Lifespan is 25,000–50,000 hours; when it eventually fails, the whole fixture is replaced.",
          "Replaceable bulb (E27 / E14 / G9) — pick your own colour temperature and brightness, and swap bulbs over time. The most flexible choice for design lovers who like to tune the atmosphere.",
        ],
      },
      {
        heading: "Materials & finishes that age well",
        paragraphs: [
          "Solid brass, hand-blown opal glass and powder-coated steel are the three finishes we see lasting longest in real homes. Avoid thin chromed plastic on visible parts — it discolours within a few years near kitchens.",
        ],
      },
    ],
    faqs: [
      {
        q: "How high should I hang a pendant above a dining table?",
        a: "Hang the bottom of the shade 70–85 cm above the tabletop. Lower fixtures create a more intimate atmosphere; higher ones spread light more evenly across the room.",
      },
      {
        q: "Can I install a pendant lamp myself?",
        a: "If your ceiling already has a wired ceiling rose, swapping a pendant is a 15-minute job: turn off the breaker, disconnect the existing fixture, connect live / neutral / earth on the new one, and mount the canopy. For new wiring, hire a certified electrician.",
      },
      {
        q: "Are the pendants dimmable?",
        a: "Most of our pendants are dimmable, but the method differs: integrated-LED models need a trailing-edge LED dimmer, while pendants with replaceable bulbs simply need a dimmable bulb. The spec table on each product page tells you exactly which dimmer to use.",
      },
      {
        q: "Do you deliver outside the Netherlands?",
        a: "Yes — we ship across the EU and the UK from our warehouse in the Netherlands. Shipping costs and lead times are shown in the cart before checkout.",
      },
    ],
  },
};

export const getCategoryContent = (slug: string): CategoryContent =>
  content[slug] ?? fallback;