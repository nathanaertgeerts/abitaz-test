import { Headset, PackageCheck, RotateCcw, Truck } from "lucide-react";

type Item = {
  icon: typeof Truck;
  title: string;
  text: string;
  href?: string;
  external?: boolean;
};

const items: Item[] = [
  { icon: Truck, title: "Free shipping €50+", text: "Fast delivery across Europe" },
  { icon: RotateCcw, title: "30-day returns", text: "No questions asked" },
  { icon: PackageCheck, title: "Real stock", text: "Live inventory, no surprises" },
  {
    icon: Headset,
    title: "Expert support",
    text: "Online lichtadvies",
    href: "https://abitaz.lovable.app",
    external: true,
  },
];

export const TrustStrip = () => {
  return (
    <section aria-label="Why Abitaz" className="container-abitaz mt-14">
      <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-6 md:grid-cols-4">
        {items.map(({ icon: Icon, title, text, href, external }) => {
          const content = (
            <>
              <Icon className="mt-0.5 text-cta" />
              <div>
                <div className="text-sm font-semibold text-foreground">{title}</div>
                <div className="text-xs text-muted-foreground">{text}</div>
              </div>
            </>
          );
          if (href) {
            return (
              <a
                key={title}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-start gap-3 rounded-md transition hover:bg-surface"
              >
                {content}
              </a>
            );
          }
          return (
            <div key={title} className="flex items-start gap-3">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
};