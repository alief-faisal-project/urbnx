import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "@/context/ProductContext";

const FeaturedProducts = () => {
  const { products, featuredCount } = useProducts();
  // Show products based on featuredCount setting
  const featuredProducts = products.slice(0, featuredCount);

  return (
    <section className="section-padding bg-background">
      <div className="container-brand">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
              Koleksi Terbaru
            </p>
            <h2 className="heading-section">Produk Unggulan</h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-medium uppercase tracking-wider hover:text-muted-foreground transition-colors inline-flex items-center gap-2 group"
          >
            Lihat Semua
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                {...product}
                discountPercentage={product.discountPercentage}
                discountActive={product.discountActive}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
