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
          i
          <span
            className="absolute left-1/2 -top-0.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cta"
            aria-hidden
          />
        </span>
        taz
      </span>
    </Link>
  );
};