import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { addToCart } = useCart();
  const { getProductById, calculateDiscountedPrice } = useProducts();
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-section mb-4">Produk Tidak Ditemukan</h1>
          <Link to="/shop" className="btn-primary inline-block">
            Kembali ke Shop
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const finalPrice = calculateDiscountedPrice(product);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Pilih ukuran",
        description: "Silakan pilih ukuran terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );

    toast({
      title: "Ditambahkan ke keranjang",
      description: `${quantity}x ${product.name} telah ditambahkan.`,
    });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-brand">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary overflow-hidden relative">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {/* Discount Badge */}
                {product.discountActive &&
                  product.discountPercentage &&
                  product.discountPercentage > 0 && (
                    <span className="absolute top-4 right-4 px-3 py-2 bg-red-500 text-white text-lg font-bold animate-pulse">
                      -{product.discountPercentage}%
                    </span>
                  )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 bg-secondary overflow-hidden border-2 transition-colors ${
                        activeImage === idx
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  {product.category}
                </p>
                <h1 className="heading-section mb-4">{product.name}</h1>

                {/* Price with Discount */}
                <div className="flex items-center gap-3">
                  {product.discountActive &&
                  product.discountPercentage &&
                  product.discountPercentage > 0 ? (
                    <>
                      <p className="text-xl line-through text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-3xl font-bold text-red-600">
                        {formatPrice(finalPrice)}
                      </p>
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold">
                        Hemat {formatPrice(product.price - finalPrice)}
                      </span>
                    </>
                  ) : (
                    <p className="text-2xl font-bold">
                      {formatPrice(product.price)}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              {product.sizes && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold uppercase tracking-wide">
                      Ukuran:
                    </h3>
                    <Link
                      to="/size-guide"
                      className="text-sm text-muted-foreground hover:text-foreground underline"
                    >
                      Size Guide
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-semibold uppercase tracking-wide">
                  Fitur:
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <h3 className="font-semibold uppercase tracking-wide">
                  Jumlah:
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Additional Info */}
              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium uppercase tracking-wide">
                    Pengiriman:
                  </span>
                  <span className="text-muted-foreground">
                    Seluruh Indonesia
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium uppercase tracking-wide">
                    Garansi:
                  </span>
                  <span className="text-muted-foreground">
                    30 hari pengembalian
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
