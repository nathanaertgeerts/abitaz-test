import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls window to the top whenever the pathname changes.
 * If the URL contains a hash (#section), respects that and skips scrolling.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};
