import { useEffect } from "react";
import { BrandsBar } from "@/components/home/BrandsBar";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { HeroGrid } from "@/components/home/HeroGrid";
import { PopularProducts } from "@/components/home/PopularProducts";
import { TrustStrip } from "@/components/home/TrustStrip";
import { SiteLayout } from "@/components/layout/SiteLayout";

const Index = () => {
  useEffect(() => {
    document.title = "Abitaz — Smart shop for lighting & installation materials";
    const desc =
      "Abitaz: honest prices, real stock, expert support. Shop indoor and outdoor lighting, top brands and installation materials.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <SiteLayout>
      <h1 className="sr-only">Abitaz — the smart shop for lighting</h1>
      <HeroGrid />
      <TrustStrip />
      <CategoryStrip />
      <PopularProducts />
      <BrandsBar />
    </SiteLayout>
  );
};

export default Index;
