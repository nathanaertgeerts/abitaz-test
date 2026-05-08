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
      y="22"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="300"
      fontSize="20"
      letterSpacing="6"
      fill="currentColor"
    >
      nordlux
    </text>
  </svg>
);

export const FlosLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Flos">
    <text
      x="100"
      y="26"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
      fontSize="28"
      letterSpacing="1"
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

export const AbsintheLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Absinthe Lights">
    {/* Small swift / bird mark in front of the wordmark — echoes the brand's logotype */}
    <g transform="translate(4, 9)" fill="currentColor">
      <path d="M0 8 C 4 4, 8 0, 14 2 L 11 5 C 9 4, 6 6, 4 9 Z" />
      <path d="M14 2 C 18 0, 22 2, 24 6 L 18 6 C 17 4, 15 3, 14 4 Z" opacity="0.75" />
    </g>
    <text
      x="34"
      y="22"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="500"
      fontSize="18"
      letterSpacing="2.5"
      fill="currentColor"
    >
      ABSINTHE
    </text>
  </svg>
);

export const VysnLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="VYSN">
    {/* Stylised geometric VYSN wordmark (angular Y/S echoes their logotype) */}
    <text
      x="100"
      y="24"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="26"
      letterSpacing="4"
      fill="currentColor"
    >
      VYSN
    </text>
  </svg>
);

export const ArtemideLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Artemide">
    <text
      x="110"
      y="23"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="300"
      fontSize="22"
      letterSpacing="6"
      fill="currentColor"
    >
      ARTEMIDE
    </text>
  </svg>
);

export const MartinelliLuceLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 32" className={className} role="img" aria-label="Martinelli Luce">
    <text
      x="120"
      y="14"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="700"
      fontSize="13"
      letterSpacing="2"
      fill="currentColor"
    >
      MARTINELLI
    </text>
    <text
      x="120"
      y="27"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontStyle="italic"
      fontWeight="400"
      fontSize="12"
      letterSpacing="2"
      fill="currentColor"
    >
      luce
    </text>
  </svg>
);

export const SlvLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="SLV">
    {/* Bold, square wordmark — echoes SLV's compact industrial logotype */}
    <text
      x="100"
      y="25"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="28"
      letterSpacing="2"
      fill="currentColor"
    >
      SLV
    </text>
  </svg>
);

export const EgloLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Eglo">
    <text
      x="100"
      y="24"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontStyle="italic"
      fontWeight="800"
      fontSize="24"
      letterSpacing="0"
      fill="currentColor"
    >
      EGLO
    </text>
  </svg>
);

export const BrilliantLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Brilliant">
    <text
      x="110"
      y="23"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
      fontSize="20"
      letterSpacing="1"
      fill="currentColor"
    >
      Brilliant
    </text>
  </svg>
);

export const PaulmannLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Paulmann">
    <g transform="translate(28, 8)" fill="currentColor">
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2.5" />
    </g>
    <text
      x="56"
      y="22"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="500"
      fontSize="18"
      letterSpacing="2"
      fill="currentColor"
    >
      PAULMANN
    </text>
  </svg>
);

export const VibiaLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Vibia">
    <text
      x="100"
      y="24"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontWeight="400"
      fontSize="24"
      letterSpacing="3"
      fill="currentColor"
    >
      vibia
    </text>
  </svg>
);

export const WeverDucreLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 32" className={className} role="img" aria-label="Wever & Ducré">
    <text
      x="120"
      y="14"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="700"
      fontSize="13"
      letterSpacing="3"
      fill="currentColor"
    >
      WEVER &amp; DUCRÉ
    </text>
    <line x1="80" y1="22" x2="160" y2="22" stroke="currentColor" strokeWidth="0.6" />
    <text
      x="120"
      y="30"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="300"
      fontSize="8"
      letterSpacing="3"
      fill="currentColor"
    >
      LIGHTING
    </text>
  </svg>
);

export const FoscariniLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Foscarini">
    <text
      x="110"
      y="22"
      textAnchor="middle"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontStyle="italic"
      fontWeight="400"
      fontSize="22"
      fill="currentColor"
    >
      Foscarini
    </text>
  </svg>
);

export const MarsetLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 200 32" className={className} role="img" aria-label="Marset">
    <text
      x="100"
      y="24"
      textAnchor="middle"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="900"
      fontSize="22"
      letterSpacing="0"
      fill="currentColor"
    >
      marset
    </text>
  </svg>
);

export const OcchioLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 220 32" className={className} role="img" aria-label="Occhio">
    <g transform="translate(30, 8)" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="7" />
      <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none" />
    </g>
    <text
      x="56"
      y="22"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="300"
      fontSize="20"
      letterSpacing="4"
      fill="currentColor"
    >
      OCCHIO
    </text>
  </svg>
);

export const DeltaLightLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 32" className={className} role="img" aria-label="Delta Light">
    <g transform="translate(20, 6)" fill="currentColor">
      <polygon points="0,18 9,0 18,18" />
    </g>
    <text
      x="50"
      y="22"
      fontFamily="'Helvetica Neue', Arial, sans-serif"
      fontWeight="600"
      fontSize="18"
      letterSpacing="2"
      fill="currentColor"
    >
      DELTA LIGHT
    </text>
  </svg>
);

export const ModularLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 32" className={className} role="img" aria-label="Modular Lighting">
    <text
      x="120"
      y="14"
      textAnchor="middle"
      fontFamily="'Courier New', monospace"
      fontWeight="700"
      fontSize="12"
      letterSpacing="3"
      fill="currentColor"
    >
      MODULAR
    </text>
    <text
      x="120"
      y="27"
      textAnchor="middle"
      fontFamily="'Courier New', monospace"
      fontWeight="400"
      fontSize="9"
      letterSpacing="4"
      fill="currentColor"
    >
      LIGHTING INSTRUMENTS
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
  absinthe: AbsintheLogo,
  vysn: VysnLogo,
  artemide: ArtemideLogo,
  "martinelli-luce": MartinelliLuceLogo,
  slv: SlvLogo,
  eglo: EgloLogo,
  brilliant: BrilliantLogo,
  paulmann: PaulmannLogo,
  vibia: VibiaLogo,
  "wever-ducre": WeverDucreLogo,
  foscarini: FoscariniLogo,
  marset: MarsetLogo,
  occhio: OcchioLogo,
  "delta-light": DeltaLightLogo,
  "modular-lighting": ModularLogo,
};
