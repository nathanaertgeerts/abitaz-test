import { Link } from "react-router-dom";
import { Product } from "@/data/products";

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(n);

export const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / (product.originalPrice as number)) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group flex flex-col rounded-lg bg-card p-3 transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-sm bg-sale px-2 py-1 text-xs font-bold text-sale-foreground">
            -{discountPct}%
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-1">
        <span className="text-xs text-muted-foreground">{product.category}</span>
        <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice as number)}
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1">
            {product.colors.slice(0, 5).map((c, i) => (
              <span
                key={i}
                aria-hidden
                className="h-3 w-5 rounded-sm border border-border"
                style={{ backgroundColor: c }}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export { formatPrice };