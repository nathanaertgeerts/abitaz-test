import { ChevronDown } from "lucide-react";
import type { CategoryContent } from "@/data/categoryContent";
import { getSponsoredSlot } from "@/data/sponsoredSlots";
import { Link } from "react-router-dom";

/**
 * Long-form SEO + GEO content block rendered below the product grid.
 *
 * - Uses real semantic headings (h2 / h3) so search engines can outline the page.
 * - FAQs render as native <details> for zero-JS interactivity and good a11y,
 *   and the same data is emitted as FAQPage JSON-LD for rich results.
 * - Body sections support paragraphs and bullet lists for scannable answers
 *   that surface well in AI Overviews / LLM citations.
 */
export const CategorySeoContent = ({
  categoryName,
  content,
  slug,
}: {
  categoryName: string;
  content: CategoryContent;
  slug: string;
}) => {
  const heading = content.bodyHeading ?? `${categoryName} buying guide`;
  const sponsor = getSponsoredSlot(slug);

  return (
    <section
      aria-labelledby="category-guide"
      className="mt-20 border-t border-border pt-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: editorial buying guide + FAQ */}
        <div className="space-y-12">
          <div>
            <h2
              id="category-guide"
              className="font-display text-2xl font-bold text-foreground md:text-3xl"
            >
              {heading}
            </h2>
            <div className="mt-6 space-y-8">
              {content.body.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-lg font-semibold text-foreground">
                    {section.heading}
                  </h3>
                  {section.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {content.faqs.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
                Frequently asked questions
              </h3>
              <div className="mt-4 divide-y divide-border border-t border-border">
                {content.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-[15px] font-medium text-foreground transition-colors hover:text-primary">
                      <span>{f.q}</span>
                      <ChevronDown
                        aria-hidden
                        className="h-4 w-4 flex-none text-muted-foreground transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Amazon-style sponsored brand slot */}
        <aside
          aria-label={`Sponsored by ${sponsor.brand}`}
          className="relative"
        >
          <div className="flex h-full flex-col rounded-2xl bg-muted/40 p-6 md:p-8 lg:p-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <span className="rounded border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Gesponsord
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                {sponsor.wordmark}
              </span>
            </div>

            <div className="flex-1">
              <div className="mb-6 aspect-video overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                <img
                  src={sponsor.image}
                  alt={`${sponsor.brand} — ${sponsor.headline}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="font-display text-xl font-semibold text-foreground">
                {sponsor.headline}
              </h4>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {sponsor.copy}
              </p>
            </div>

            <div className="mt-8">
              <Link
                to={sponsor.href}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {sponsor.cta}
              </Link>
              <p className="mt-3 text-[11px] text-muted-foreground">
                Sponsored placement — selected by {sponsor.brand}.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};