// Inline SVG wordmarks approximating each brand's typographic style.
// Pure CSS/SVG — no external assets, no trademark image files.

type LogoProps = { className?: string };

export const LouisPoulsenLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Louis Poulsen">
    <text
      x="100"
      y="22"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
      fontSize="20"
      letterSpacing="2"
      fill="currentColor"
    >
      LOUIS POULSEN
    </text>
  </svg>
);

export const TraditionLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="&tradition">
    <text
      x="100"
      y="23"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontStyle="italic"
      fontWeight="400"
      fontSize="22"
      fill="currentColor"
    >
      &tradition
    </text>
  </svg>
);

export const NordluxLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Nordlux">
    <text
      x="100"
      y="23"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="700"
      fontSize="22"
      letterSpacing="1"
      fill="currentColor"
    >
      NORDLUX
    </text>
  </svg>
);

export const FlosLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Flos">
    <text
      x="100"
      y="25"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="800"
      fontSize="26"
      letterSpacing="2"
      fill="currentColor"
    >
      FLOS
    </text>
  </svg>
);

export const PhilipsLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Philips">
    {/* Wave + stars motif (simplified) */}
    <g transform="translate(8, 6)" fill="currentColor">
      <circle cx="2" cy="2" r="1.2" />
      <circle cx="8" cy="2" r="1.2" />
      <circle cx="14" cy="2" r="1.2" />
      <circle cx="2" cy="8" r="1.2" />
      <circle cx="14" cy="8" r="1.2" />
      <circle cx="2" cy="14" r="1.2" />
      <circle cx="8" cy="14" r="1.2" />
      <circle cx="14" cy="14" r="1.2" />
      <path d="M0 18 Q 8 12, 16 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>
    <text
      x="32"
      y="23"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
      fontSize="22"
      letterSpacing="1"
      fill="currentColor"
    >
      PHILIPS
    </text>
  </svg>
);

export const NormannLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 32" className={className} role="img" aria-label="Normann Copenhagen">
    <text
      x="120"
      y="14"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="700"
      fontSize="13"
      letterSpacing="1.5"
      fill="currentColor"
    >
      NORMANN
    </text>
    <text
      x="120"
      y="27"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="400"
      fontSize="10"
      letterSpacing="3"
      fill="currentColor"
    >
      COPENHAGEN
    </text>
  </svg>
);

export const brandLogos: Record<string, (p: LogoProps) => JSX.Element> = {
  "louis-poulsen": LouisPoulsenLogo,
  tradition: TraditionLogo,
  nordlux: NordluxLogo,
  flos: FlosLogo,
  philips: PhilipsLogo,
  "normann-copenhagen": NormannLogo,
};
