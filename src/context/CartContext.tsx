import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

/** A single line in the cart. We store a minimal denormalised snapshot of the
 *  product so the cart keeps working even if the catalogue changes. */
export type CartLine = {
  slug: string;
  name: string;
  brand: string;
  image: string;
  description: string;
  price: number;
  originalPrice?: number;
  leadTime: string;
  inStock: boolean;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  totalSavings: number;
  addItem: (product: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "abitaz.cart.v1";

const loadInitial = (): CartLine[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => l && typeof l.slug === "string" && typeof l.qty === "number");
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(loadInitial);

  // Persist on every change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota or private mode — ignore */
    }
  }, [lines]);

  const addItem = useCallback((product: Product, qty: number = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, qty: l.qty + qty } : l,
        );
      }
      const line: CartLine = {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.image,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        leadTime: product.leadTime,
        inStock: product.inStock,
        qty,
      };
      return [...prev, line];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
    const totalSavings = lines.reduce(
      (n, l) => n + (l.originalPrice ? (l.originalPrice - l.price) * l.qty : 0),
      0,
    );
    return { lines, itemCount, subtotal, totalSavings, addItem, setQty, removeItem, clear };
  }, [lines, addItem, setQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
};