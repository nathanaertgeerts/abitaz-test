import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Indoor lighting", to: "/category/pendant-lamps" },
      { label: "Outdoor lighting", to: "/category/outdoor-lighting" },
      { label: "Installation materials", to: "/category/installation" },
      { label: "Light bulbs", to: "/category/bulbs" },
      { label: "Sale", to: "/sale" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Delivery", to: "#" },
      { label: "Returns", to: "#" },
      { label: "Warranty", to: "#" },
      { label: "Help center", to: "#" },
      { label: "Contact", to: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Abitaz", to: "#" },
      { label: "Brands", to: "/brands" },
      { label: "Blog", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Press", to: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="container-abitaz grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/80">
            Abitaz is the smart shop for buyers who already know what they want. Honest prices,
            real stock, expert support.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">{col.title}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/85">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-cta">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-abitaz flex flex-col items-center justify-between gap-2 py-4 text-xs text-primary-foreground/70 md:flex-row">
          <span>© {new Date().getFullYear()} Abitaz. All rights reserved.</span>
          <span>Prices include VAT.</span>
        </div>
      </div>
    </footer>
  );
};