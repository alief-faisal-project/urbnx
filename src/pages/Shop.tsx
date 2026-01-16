import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";

const categories = [
  "All",
  "Backpack",
  "T-Shirt",
  "Hoodie",
  "Accessories",
  "Jacket",
  "Pants",
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { products } = useProducts();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-brand">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Shop Collection</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Jelajahi koleksi lengkap produk URBNX. Kualitas premium dengan
              desain eksklusif.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard
                  {...product}
                  discountPercentage={product.discountPercentage}
                  discountActive={product.discountActive}
                />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                Belum ada produk dalam kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
