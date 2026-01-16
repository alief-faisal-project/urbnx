import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { products as initialProducts, Product } from "@/data/products";

export interface ProductWithDiscount extends Product {
  discountPercentage?: number;
  discountActive?: boolean;
}

interface ProductContextType {
  products: ProductWithDiscount[];
  featuredCount: number;
  setFeaturedCount: (count: number) => void;
  addProduct: (product: Omit<ProductWithDiscount, "id">) => void;
  updateProduct: (id: string, product: Partial<ProductWithDiscount>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => ProductWithDiscount | undefined;
  calculateDiscountedPrice: (product: ProductWithDiscount) => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductWithDiscount[]>([]);
  const [featuredCount, setFeaturedCountState] = useState<number>(6);

  useEffect(() => {
    // Load products from localStorage or use initial data
    const savedProducts = localStorage.getItem("urbnx_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch {
        setProducts(
          initialProducts.map((p) => ({
            ...p,
            discountPercentage: 0,
            discountActive: false,
          }))
        );
      }
    } else {
      setProducts(
        initialProducts.map((p) => ({
          ...p,
          discountPercentage: 0,
          discountActive: false,
        }))
      );
    }

    // Load featured count
    const savedFeaturedCount = localStorage.getItem("urbnx_featured_count");
    if (savedFeaturedCount) {
      setFeaturedCountState(parseInt(savedFeaturedCount) || 6);
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("urbnx_products", JSON.stringify(products));
    }
  }, [products]);

  const setFeaturedCount = (count: number) => {
    setFeaturedCountState(count);
    localStorage.setItem("urbnx_featured_count", count.toString());
  };

  const generateId = () => {
    return `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addProduct = (productData: Omit<ProductWithDiscount, "id">) => {
    const newProduct: ProductWithDiscount = {
      ...productData,
      id: generateId(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (
    id: string,
    productData: Partial<ProductWithDiscount>
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const calculateDiscountedPrice = (product: ProductWithDiscount): number => {
    if (
      product.discountActive &&
      product.discountPercentage &&
      product.discountPercentage > 0
    ) {
      return Math.round(
        product.price - (product.price * product.discountPercentage) / 100
      );
    }
    return product.price;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredCount,
        setFeaturedCount,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        calculateDiscountedPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
