import { Flame } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProducts } from "@/context/ProductContext";

const BestSellerProducts = () => {
  const { products } = useProducts();

  const bestSellerIds = [
    "urbnx-essential-tee-black",
    "urbnx-heavyweight-hoodie",
    "urbnx-backpack-urban",
    "urbnx-braided-leather-bracelet",
  ];

  const bestSellers = products.filter((p) => bestSellerIds.includes(p.id));

  return (
    <section id="terlaris" className="section-padding bg-background">
      <div className="container-brand">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <Flame className="w-6 h-6 text-foreground" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
              Best Seller
            </p>
            <h2 className="text-xl md:text-2xl font-display uppercase tracking-wide">
              Produk Terlaris
            </h2>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                {...product}
                discountPercentage={product.discountPercentage}
                discountActive={product.discountActive}
                sizes={product.sizes}
                isOutOfStock={product.isOutOfStock}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerProducts;
