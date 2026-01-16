import tas1 from "@/assets/tas_1.png";
import tas2 from "@/assets/tas_2.png";
import tas3 from "@/assets/tas_3.png";
import tshirt from "@/assets/tshirt.png";
import hoodie from "@/assets/hoodie.png";
import accessories from "@/assets/accessories.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  features: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "urbnx-backpack-classic",
    name: "URBNX Backpack Classic",
    price: 125000,
    image: tas2,
    images: [tas2],
    category: "Backpack",
    description: "Backpack dengan desain klasik yang timeless. Cocok untuk aktivitas sehari-hari, sekolah, atau kerja. Material berkualitas tinggi dengan kapasitas yang optimal.",
    features: [
      "Material polyester premium tahan air",
      "Kapasitas 20L",
      "Compartment laptop hingga 15 inch",
      "Pocket organizer untuk aksesoris",
      "Strap bahu empuk dan adjustable",
    ],
  },
  {
    id: "urbnx-backpack-minimalist",
    name: "URBNX Backpack Minimalist",
    price: 140000,
    image: tas1,
    images: [tas1],
    category: "Backpack",
    description: "Desain minimalis untuk kamu yang mengedepankan kesederhanaan. Ringan namun tetap stylish dan fungsional untuk aktivitas urban.",
    features: [
      "Material canvas premium",
      "Kapasitas 18L",
      "Design slim dan lightweight",
      "Front pocket dengan zipper tersembunyi",
      "Cocok untuk daily commute",
    ],
  },
  {
    id: "urbnx-backpack-essential",
    name: "URBNX Backpack Essential",
    price: 135000,
    image: tas3,
    images: [tas3],
    category: "Backpack",
    description: "Essential backpack untuk kebutuhan sehari-hari. Design yang clean dengan fitur lengkap untuk menunjang produktivitas kamu.",
    features: [
      "Material nylon tahan lama",
      "Kapasitas 22L",
      "Multiple compartments",
      "Side pocket untuk botol minum",
      "Back panel dengan ventilasi",
    ],
  },
  {
    id: "urbnx-essential-tee-black",
    name: "URBNX Essential Tee Black",
    price: 189000,
    image: tshirt,
    images: [tshirt],
    category: "T-Shirt",
    description: "T-shirt essential dengan kualitas premium. Dibuat dari 100% katun combed 30s yang lembut dan breathable. Cocok untuk daily wear maupun layering.",
    features: [
      "100% Cotton Combed 30s",
      "Gramasi 180 GSM",
      "Pre-shrunk fabric",
      "Jahitan rantai yang kokoh",
      "Fit: Regular relaxed",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "urbnx-heavyweight-hoodie",
    name: "URBNX Heavyweight Hoodie",
    price: 389000,
    image: hoodie,
    images: [hoodie],
    category: "Hoodie",
    description: "Heavyweight hoodie dengan konstruksi premium. Fleece tebal yang hangat dan nyaman untuk cuaca dingin. Desain oversized yang trendy dan timeless.",
    features: [
      "Heavy fleece 400 GSM",
      "Kangaroo pocket depan",
      "Drawstring hood adjustable",
      "Ribbed cuffs dan hem",
      "Fit: Oversized boxy",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "urbnx-braided-leather-bracelet",
    name: "URBNX Braided Leather Bracelet",
    price: 149000,
    image: accessories,
    images: [accessories],
    category: "Accessories",
    description: "Gelang kulit anyaman premium dengan clasp magnetik gold. Desain minimalis yang elegan, cocok untuk melengkapi gaya streetwear maupun casual.",
    features: [
      "Genuine leather braided",
      "Stainless steel magnetic clasp",
      "Gold-tone finish",
      "Diameter: 21cm (adjustable)",
      "Unisex design",
    ],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
};
