import { Headset, PackageCheck, RotateCcw, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Free shipping €50+", text: "Fast delivery across Europe" },
  { icon: RotateCcw, title: "30-day returns", text: "No questions asked" },
  { icon: PackageCheck, title: "Real stock", text: "Live inventory, no surprises" },
  { icon: Headset, title: "Expert support", text: "Talk to a real specialist" },
];

export const TrustStrip = () => {
  return (
    <section aria-label="Why Abitaz" className="container-abitaz mt-14">
      <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-6 md:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <Icon className="mt-0.5 text-cta" />
            <div>
              <div className="text-sm font-semibold text-foreground">{title}</div>
              <div className="text-xs text-muted-foreground">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};