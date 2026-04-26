import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { PaymentMethods } from "./PaymentMethods";

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

const socials = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "LinkedIn", href: "#", icon: Linkedin },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-surface text-foreground">
      <div className="container-abitaz grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Abitaz is the smart shop for buyers who already know what they want. Honest prices,
            real stock, expert support.
          </p>
          <div className="mt-5 flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-foreground">
              {col.title}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="border-t border-border">
        <div className="container-abitaz flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
            Secure payment
          </span>
          <PaymentMethods />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-abitaz flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Abitaz. All rights reserved.</span>
          <span>Prices include VAT.</span>
        </div>
      </div>
    </footer>
  );
};