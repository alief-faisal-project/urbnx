import Layout from "@/components/Layout";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with Carousel */}
      <HeroCarousel />

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
