import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// asset banner
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import banner4 from "@/assets/banner4.jpg";

// data banner
const banners = [
  {
    id: 1,
    image: banner1,
    alt: "URBNX Be Authentic Collection",
    productId: "urbnx-essential-tee-black",
  },
  {
    id: 2,
    image: banner2,
    alt: "URBNX Backpack Rp.125.000",
    productId: "urbnx-backpack-classic",
  },
  {
    id: 3,
    image: banner3,
    alt: "URBNX Backpack Rp.140.000",
    productId: "urbnx-backpack-minimalist",
  },
  {
    id: 4,
    image: banner4,
    alt: "URBNX Backpack Rp.125.000",
    productId: "urbnx-backpack-essential",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // === SWIPE STATE (jangan disentuh)
  const startX = useRef(0);
  const endX = useRef(0);
  const dragging = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleClick = (productId: string) => {
    if (dragging.current) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/product/${productId}`);
  };

  // === SWIPE LOGIC
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    dragging.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    endX.current = e.touches[0].clientX;
    if (Math.abs(startX.current - endX.current) > 10) {
      dragging.current = true;
    }
  };

  const onTouchEnd = () => {
    const diff = startX.current - endX.current;
    if (Math.abs(diff) > 60) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  };

  // auto slide
  useEffect(() => {
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      className="
    relative w-full overflow-hidden bg-black

    /* MOBILE: normal, mengikuti rasio layar */
    aspect-[16/9]

    /* TABLET */
    md:aspect-auto md:h-[55vh]

    /* DESKTOP */
    lg:h-[70vh]
  "
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* TRACK SLIDE
          geser halus */}
      <div
        className="
          flex h-full
          transition-transform
          duration-[1100ms]
          ease-[cubic-bezier(0.22,0.61,0.36,1)]
        "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full cursor-pointer"
            onClick={() => handleClick(banner.productId)}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              draggable={false}
              className="
    w-full h-full
    object-cover object-center
    select-none
  "
            />
          </div>
        ))}
      </div>

      {/* DOT INDIKATOR */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className={`
              h-1 rounded-full transition-all duration-300
              ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
