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

/* Brand glyphs — Lucide doesn't ship social brand marks, so we inline
   minimal monochrome SVGs that pick up the surrounding `currentColor`. */
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.2c-.3 0-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.1v2.4H8v3h2.5V21h3z" />
  </svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3V9.5zm6.5 0h3.8v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8-1.7 0-2 1.3-2 2.7V21h-4V9.5z" />
  </svg>
);

const socials = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
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