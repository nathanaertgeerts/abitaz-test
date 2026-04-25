import { Link } from "react-router-dom";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Wordmark placeholder for Abitaz. Will be replaced with a final logo.
 */
export const Logo = ({ variant = "light", className = "" }: LogoProps) => {
  const color = variant === "light" ? "text-primary-foreground" : "text-foreground";
  return (
    <Link to="/" aria-label="Abitaz home" className={`inline-flex items-baseline ${color} ${className}`}>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        ab
        <span className="relative inline-block">
          {/* dotless i (ı) so we can replace the natural dot with our brand dot */}
          ı
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[0.05em] h-[0.28em] w-[0.28em] rounded-full bg-cta"
            aria-hidden
          />
        </span>
        taz
      </span>
    </Link>
  );
};