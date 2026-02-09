import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import MobileQuickMenu from "@/components/MobileQuickMenu";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import Newsletter from "@/components/Newsletter";
import BestSellerProducts from "@/components/BestSellerProduct";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Mobile Quick Menu - Only visible on mobile */}
      <MobileQuickMenu />

      {/* Best Seller Products Section */}
      <BestSellerProducts />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Brand Philosophy Section */}
      <BrandPhilosophy />

      {/* Newsletter Section */}
      <Newsletter />
    </Layout>
  );
};

export default Index;
