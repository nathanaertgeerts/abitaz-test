// Inline brand SVGs so we don't depend on external assets.
// Each badge is rendered on a white pill for max recognizability on dark backgrounds.

const Badge = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    aria-label={label}
    title={label}
    className="flex h-7 w-12 items-center justify-center rounded-md bg-white px-1 shadow-sm ring-1 ring-black/5"
  >
    {children}
  </div>
);

export const PaymentMethods = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge label="Visa">
        <svg viewBox="0 0 48 16" className="h-4 w-auto">
          <text
            x="0"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="15"
            fill="#1A1F71"
          >
            VISA
          </text>
        </svg>
      </Badge>

      <Badge label="Mastercard">
        <svg viewBox="0 0 36 22" className="h-5 w-auto">
          <circle cx="13" cy="11" r="9" fill="#EB001B" />
          <circle cx="23" cy="11" r="9" fill="#F79E1B" />
          <path
            d="M18 4.6a9 9 0 0 1 0 12.8 9 9 0 0 1 0-12.8z"
            fill="#FF5F00"
          />
        </svg>
      </Badge>

      <Badge label="American Express">
        <svg viewBox="0 0 48 22" className="h-5 w-auto">
          <rect width="48" height="22" rx="2" fill="#2E77BB" />
          <text
            x="24"
            y="14"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="7"
            fill="#fff"
            letterSpacing="0.5"
          >
            AMERICAN
          </text>
          <text
            x="24"
            y="20"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="700"
            fontSize="5"
            fill="#fff"
            letterSpacing="1"
          >
            EXPRESS
          </text>
        </svg>
      </Badge>

      <Badge label="PayPal">
        <svg viewBox="0 0 60 16" className="h-4 w-auto">
          <text
            x="0"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="14"
            fill="#003087"
          >
            Pay
          </text>
          <text
            x="22"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="14"
            fill="#009CDE"
          >
            Pal
          </text>
        </svg>
      </Badge>

      <Badge label="Bancontact">
        <svg viewBox="0 0 48 16" className="h-4 w-auto">
          <text
            x="0"
            y="12"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontSize="9"
            fill="#005498"
          >
            Banc
          </text>
          <text
            x="22"
            y="12"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontSize="9"
            fill="#FFD800"
            stroke="#005498"
            strokeWidth="0.3"
          >
            ontact
          </text>
        </svg>
      </Badge>

      <Badge label="iDEAL">
        <svg viewBox="0 0 40 18" className="h-4 w-auto">
          <text
            x="0"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="13"
            fill="#CC0066"
          >
            i
          </text>
          <text
            x="6"
            y="13"
            fontFamily="Arial, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="13"
            fill="#000"
          >
            DEAL
          </text>
        </svg>
      </Badge>

      <Badge label="Apple Pay">
        <svg viewBox="0 0 40 18" className="h-4 w-auto" fill="#000">
          <path d="M6.6 4.7c-.4.5-1.1.9-1.7.8-.1-.7.2-1.4.6-1.8.4-.5 1.1-.9 1.7-.9.1.7-.2 1.4-.6 1.9zm.6.9c-.9-.1-1.7.5-2.2.5-.5 0-1.1-.5-1.9-.5-1 0-1.9.6-2.4 1.5-1 1.8-.3 4.4.7 5.9.5.7 1.1 1.5 1.9 1.5.7 0 1-.5 1.9-.5s1.1.5 1.9.5c.8 0 1.3-.7 1.8-1.4.6-.8.8-1.6.8-1.6 0 0-1.6-.6-1.6-2.5 0-1.5 1.3-2.3 1.3-2.3-.7-1.1-1.8-1.2-2.2-1.2z" />
          <text
            x="12"
            y="13"
            fontFamily="-apple-system, Helvetica, Arial, sans-serif"
            fontWeight="600"
            fontSize="9"
            fill="#000"
          >
            Pay
          </text>
        </svg>
      </Badge>

      <Badge label="Klarna">
        <svg viewBox="0 0 48 18" className="h-4 w-auto">
          <rect width="48" height="18" rx="3" fill="#FFA8CD" />
          <text
            x="24"
            y="13"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="10"
            fill="#0A0A0A"
          >
            Klarna.
          </text>
        </svg>
      </Badge>
    </div>
  );
};
