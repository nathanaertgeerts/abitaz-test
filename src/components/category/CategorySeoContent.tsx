import { ChevronDown } from "lucide-react";
import type { CategoryContent } from "@/data/categoryContent";

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
}: {
  categoryName: string;
  content: CategoryContent;
}) => {
  const heading = content.bodyHeading ?? `${categoryName} buying guide`;

  return (
    <section
      aria-labelledby="category-guide"
      className="mt-16 border-t border-border pt-12"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="category-guide"
          className="font-display text-2xl font-bold text-foreground md:text-3xl"
        >
          {heading}
        </h2>

        <div className="mt-8 space-y-10">
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
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {content.faqs.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
              Frequently asked questions
            </h3>
            <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
              {content.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-foreground">
                    <span>{f.q}</span>
                    <ChevronDown
                      aria-hidden
                      className="h-4 w-4 flex-none text-muted-foreground transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};