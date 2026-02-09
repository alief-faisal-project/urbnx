import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  discountPercentage?: number;
  discountActive?: boolean;
  sizes?: string[];
  isOutOfStock?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  discountPercentage,
  discountActive,
  sizes,
  isOutOfStock,
}: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const discountedPrice =
    discountActive && discountPercentage
      ? Math.round(price - (price * discountPercentage) / 100)
      : price;

  // Only enable flip animation for T-Shirt and Hoodie categories
  const hasFlipAnimation = category === "T-Shirt" || category === "Hoodie";
  const shouldFlip = hasFlipAnimation && !isOutOfStock;

  return (
    <Link
      to={`/product/${id}`}
      className="product-card block group"
      onClick={handleClick}
    >
      <div
        className={`relative overflow-hidden bg-secondary aspect-square mb-4 ${hasFlipAnimation ? "[perspective:1000px]" : ""}`}
      >
        <div
          className={`relative w-full h-full ${hasFlipAnimation ? "transition-transform duration-500 [transform-style:preserve-3d]" : ""} ${shouldFlip ? "group-hover:[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Front - Product Image */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <img
              src={image}
              alt={name}
              className={`w-full h-full object-cover object-center ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
            />
            {category && (
              <span className="absolute top-3 left-3 px-3 py-1 bg-background text-xs font-medium uppercase tracking-wider">
                {category}
              </span>
            )}
            {/* Out of Stock Badge */}
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-4 py-2 bg-foreground text-background text-sm font-bold uppercase tracking-wider">
                  Stok Habis
                </span>
              </div>
            )}
            {/* Discount Badge */}
            {!isOutOfStock &&
              discountActive &&
              discountPercentage &&
              discountPercentage > 0 && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold animate-pulse">
                  -{discountPercentage}%
                </span>
              )}
          </div>

          {/* Back - Available Sizes (only for T-Shirt and Hoodie) */}
          {hasFlipAnimation && (
            <div className="absolute inset-0 bg-foreground [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-4">
              <p className="text-background text-xs uppercase tracking-widest mb-4">
                Ukuran Tersedia
              </p>
              {sizes && sizes.length > 0 ? (
                <div className="flex flex-wrap gap-2 justify-center">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="w-10 h-10 flex items-center justify-center border border-background/30 text-background text-sm font-medium"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-background/70 text-sm">One Size</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-medium uppercase tracking-wide">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          {isOutOfStock ? (
            <p className="text-sm text-muted-foreground">Tidak tersedia</p>
          ) : discountActive && discountPercentage && discountPercentage > 0 ? (
            <>
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(price)}
              </p>
              <p className="text-sm md:text-base font-bold text-red-600">
                {formatPrice(discountedPrice)}
              </p>
            </>
          ) : (
            <p className="text-sm md:text-base font-semibold">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
