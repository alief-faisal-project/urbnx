import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, Trash2, User } from "lucide-react";
import logo from "@/assets/logo_urbnx.png";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { useAdmin } from "@/context/AdminContext";
import HamburgerIcon from "@/components/HamburgerIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } =
    useCart();
  const { products, calculateDiscountedPrice } = useProducts();
  const { isAuthenticated: isAdminAuthenticated } = useAdmin();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const priceMatch = product.price.toString().includes(query);
      return nameMatch || priceMatch;
    });
    setSearchResults(results);
  }, [searchQuery]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white">
      <div className="container-brand">
        <div className="flex items-center justify-between h-12 md:h-14 px-4 md:px-8">
          {/* Hamburger Menu - Left */}
          <button
            className="p-2 hover:bg-secondary/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <Menu className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </button>

          {/* Logo - Center */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img src={logo} alt="URBNX Logo" className="h-7 md:h-9 w-auto" />
          </Link>

          {/* Actions - Right */}
          <div className="flex items-center gap-2">
            <div ref={searchRef} className="relative">
              <button
                className="p-2 hover:bg-secondary/50 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white shadow-lg border border-border animate-fade-in">
                  <div className="p-3 border-b border-border">
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-border focus:outline-none focus:border-primary"
                      autoFocus
                    />
                  </div>

                  {searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0 flex items-center gap-3"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover bg-secondary"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-1">
                              {product.discountActive &&
                              product.discountPercentage ? (
                                <>
                                  <p className="text-xs line-through text-muted-foreground">
                                    {formatPrice(product.price)}
                                  </p>
                                  <p className="text-xs font-semibold text-red-600">
                                    {formatPrice(
                                      calculateDiscountedPrice(product),
                                    )}
                                  </p>
                                </>
                              ) : (
                                <p className="text-xs text-muted-foreground">
                                  {formatPrice(product.price)}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchQuery && searchResults.length === 0 && (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Produk tidak ditemukan
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <div ref={cartRef} className="relative">
              <button
                className="p-2 hover:bg-secondary/50 transition-colors relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white shadow-lg border border-border animate-fade-in">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold uppercase tracking-wide">
                      Keranjang
                    </h3>
                  </div>

                  {items.length > 0 ? (
                    <>
                      <div className="max-h-80 overflow-y-auto">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 border-b border-border/50 flex gap-3"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover bg-secondary flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground mb-2">
                                {formatPrice(item.price)}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center border border-border">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-7 h-7 flex items-center justify-center text-xs hover:bg-secondary"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center text-xs">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-7 h-7 flex items-center justify-center text-xs hover:bg-secondary"
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1 text-muted-foreground hover:text-foreground"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-secondary/50">
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Total</span>
                          <span className="font-bold">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                        <button className="btn-primary w-full text-sm">
                          Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-8 text-center">
                      <ShoppingBag className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Keranjang kosong
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide-in Menu - Dark Style */}
        <div
          className={`fixed top-0 left-0 h-screen w-full max-w-sm bg-[#1a1a1a] z-50 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <div className="absolute top-4 left-4">
            <HamburgerIcon isOpen={true} onClick={() => setIsMenuOpen(false)} />
            <style>{`.absolute.top-4.left-4 span { background-color: white !important; }`}</style>
          </div>

          <nav className="flex flex-col pt-20 pb-8 h-full">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-6 py-5 text-white font-display text-lg uppercase tracking-[0.2em] hover:text-white/70 transition-all duration-200 border-b border-white/10"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.3s ease-out ${index * 0.05}s`,
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Login Link */}
            <Link
              to={isAdminAuthenticated ? "/admin/panel" : "/admin/login"}
              className="px-6 py-4 flex items-center gap-3 text-white/70 hover:text-white transition-colors border-b border-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">
                {isAdminAuthenticated ? "Admin Panel" : "LOGIN"}
              </span>
            </Link>

            {/* Social Icons at Bottom */}
            <div className="mt-auto px-6 pt-8 flex justify-center gap-8">
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white/50 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
