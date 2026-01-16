import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  discountPercentage?: number;
  discountActive?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  discountPercentage,
  discountActive,
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

  return (
    <Link
      to={`/product/${id}`}
      className="product-card block group"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden bg-secondary aspect-square mb-4">
        <img
          src={image}
          alt={name}
          className="product-image w-full h-full object-cover object-center"
        />
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-background text-xs font-medium uppercase tracking-wider">
            {category}
          </span>
        )}
        {/* Discount Badge */}
        {discountActive && discountPercentage && discountPercentage > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold animate-pulse">
            -{discountPercentage}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-medium uppercase tracking-wide group-hover:text-muted-foreground transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          {discountActive && discountPercentage && discountPercentage > 0 ? (
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
