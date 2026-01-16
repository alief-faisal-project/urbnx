import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { useProducts, ProductWithDiscount } from "@/context/ProductContext";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Image,
  Link,
  Package,
  Percent,
  DollarSign,
  Tag,
  FileText,
  List,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import logo from "@/assets/logo_urbnx.png";
import { toast } from "sonner";

const AdminPanel = () => {
  const { admin, isAuthenticated, logout } = useAdmin();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    calculateDiscountedPrice,
  } = useProducts();
  const navigate = useNavigate();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    features: [""],
    sizes: [] as string[],
    discountPercentage: "",
    discountActive: false,
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/admin/login");
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const categories = [
    "Backpack",
    "T-Shirt",
    "Hoodie",
    "Accessories",
    "Jacket",
    "Pants",
  ];
  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      features: [""],
      sizes: [],
      discountPercentage: "",
      discountActive: false,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.image
    ) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    const productData = {
      name: formData.name,
      price: parseInt(formData.price),
      category: formData.category,
      description: formData.description,
      image: formData.image,
      images: [formData.image],
      features: formData.features.filter((f) => f.trim() !== ""),
      sizes: formData.sizes.length > 0 ? formData.sizes : undefined,
      discountPercentage: formData.discountPercentage
        ? parseInt(formData.discountPercentage)
        : 0,
      discountActive: formData.discountActive,
    };

    if (editingProduct) {
      updateProduct(editingProduct, productData);
      toast.success("Produk berhasil diupdate!");
      setEditingProduct(null);
    } else {
      addProduct(productData);
      toast.success("Produk berhasil ditambahkan!");
      setIsAddingProduct(false);
    }

    resetForm();
  };

  const handleEdit = (product: ProductWithDiscount) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      features: product.features.length > 0 ? product.features : [""],
      sizes: product.sizes || [],
      discountPercentage: product.discountPercentage?.toString() || "",
      discountActive: product.discountActive || false,
    });
    setEditingProduct(product.id);
    setIsAddingProduct(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus produk "${name}"?`)) {
      deleteProduct(id);
      toast.success("Produk berhasil dihapus!");
    }
  };

  const handleToggleDiscount = (product: ProductWithDiscount) => {
    updateProduct(product.id, { discountActive: !product.discountActive });
    toast.success(
      product.discountActive ? "Diskon dinonaktifkan" : "Diskon diaktifkan!"
    );
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="URBNX" className="h-8 invert" />
            <div className="hidden sm:block">
              <span className="text-white/50 text-sm">Admin Panel</span>
              <span className="text-white/30 mx-2">•</span>
              <span className="text-white/70 text-sm">{admin?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              Lihat Toko
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow-sm">
            <Package className="w-8 h-8 text-primary mb-2" />
            <p className="text-2xl font-bold">{products.length}</p>
            <p className="text-sm text-muted-foreground">Total Produk</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <Percent className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold">
              {products.filter((p) => p.discountActive).length}
            </p>
            <p className="text-sm text-muted-foreground">Produk Diskon</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <Tag className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold">
              {new Set(products.map((p) => p.category)).size}
            </p>
            <p className="text-sm text-muted-foreground">Kategori</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-lg font-bold">
              {formatPrice(
                products.reduce((sum, p) => sum + p.price, 0) /
                  products.length || 0
              )}
            </p>
            <p className="text-sm text-muted-foreground">Rata-rata Harga</p>
          </div>
        </div>

        {/* Add Product Button */}
        {!isAddingProduct && (
          <button
            onClick={() => {
              setIsAddingProduct(true);
              resetForm();
              setEditingProduct(null);
            }}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Produk Baru
          </button>
        )}

        {/* Add/Edit Product Form */}
        {isAddingProduct && (
          <div className="bg-white p-6 shadow-sm mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  resetForm();
                  setEditingProduct(null);
                }}
                className="p-2 hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:border-primary"
                      placeholder="URBNX Backpack Classic"
                      required
                    />
                  </div>

                  {/* Price & Discount */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Harga (IDR) *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-border focus:outline-none focus:border-primary"
                        placeholder="125000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Diskon (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discountPercentage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            discountPercentage: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-border focus:outline-none focus:border-primary"
                        placeholder="20"
                      />
                    </div>
                  </div>

                  {/* Discount Toggle */}
                  {formData.discountPercentage &&
                    parseInt(formData.discountPercentage) > 0 && (
                      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200">
                        <input
                          type="checkbox"
                          id="discountActive"
                          checked={formData.discountActive}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              discountActive: e.target.checked,
                            }))
                          }
                          className="w-5 h-5 accent-green-600"
                        />
                        <label htmlFor="discountActive" className="text-sm">
                          <span className="font-medium text-green-700">
                            Aktifkan Diskon
                          </span>
                          <span className="block text-green-600">
                            Harga akan menjadi{" "}
                            {formatPrice(
                              parseInt(formData.price) -
                                (parseInt(formData.price) *
                                  parseInt(formData.discountPercentage)) /
                                  100
                            )}
                          </span>
                        </label>
                      </div>
                    )}

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kategori *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:border-primary bg-white"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ukuran (untuk pakaian)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-4 py-2 border transition-colors ${
                            formData.sizes.includes(size)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-white border-border hover:border-primary"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Gambar Produk *
                    </label>
                    <div className="space-y-3">
                      {/* Preview */}
                      {formData.image && (
                        <div className="relative w-40 h-40 bg-secondary overflow-hidden">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, image: "" }))
                            }
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Upload Options */}
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-secondary transition-colors text-sm"
                        >
                          <Image className="w-4 h-4" />
                          Upload File
                        </button>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="url"
                            placeholder="Atau masukkan URL gambar..."
                            className="flex-1 px-3 py-2 border border-border text-sm focus:outline-none focus:border-primary"
                            onBlur={(e) => {
                              if (e.target.value) {
                                setFormData((prev) => ({
                                  ...prev,
                                  image: e.target.value,
                                }));
                                e.target.value = "";
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="px-3 py-2 border border-border hover:bg-secondary"
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-border focus:outline-none focus:border-primary resize-none"
                      placeholder="Deskripsi produk..."
                    />
                  </div>

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fitur Produk
                    </label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) =>
                              handleFeatureChange(index, e.target.value)
                            }
                            className="flex-1 px-4 py-2 border border-border focus:outline-none focus:border-primary text-sm"
                            placeholder={`Fitur ${index + 1}`}
                          />
                          {formData.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 border border-border"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="text-sm text-primary hover:underline"
                      >
                        + Tambah Fitur
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? "Update Produk" : "Simpan Produk"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProduct(false);
                    resetForm();
                    setEditingProduct(null);
                  }}
                  className="px-6 py-3 border border-border hover:bg-secondary transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <List className="w-5 h-5" />
              Daftar Produk ({products.length})
            </h2>
          </div>

          <div className="divide-y">
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover bg-secondary flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      {product.discountActive && product.discountPercentage && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold">
                          -{product.discountPercentage}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {product.discountActive && product.discountPercentage ? (
                        <>
                          <span className="text-sm line-through text-muted-foreground">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-sm font-bold text-red-600">
                            {formatPrice(calculateDiscountedPrice(product))}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {product.discountPercentage &&
                      product.discountPercentage > 0 && (
                        <button
                          onClick={() => handleToggleDiscount(product)}
                          className={`px-3 py-2 text-xs font-medium transition-colors ${
                            product.discountActive
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {product.discountActive ? "Diskon ON" : "Diskon OFF"}
                        </button>
                      )}
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setExpandedProduct(
                          expandedProduct === product.id ? null : product.id
                        )
                      }
                      className="p-2 hover:bg-secondary transition-colors"
                    >
                      {expandedProduct === product.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProduct === product.id && (
                  <div className="mt-4 pt-4 border-t pl-20 text-sm animate-fade-in">
                    <p className="text-muted-foreground mb-2">
                      {product.description}
                    </p>
                    {product.features.length > 0 && (
                      <div className="mb-2">
                        <span className="font-medium">Fitur:</span>
                        <ul className="list-disc list-inside text-muted-foreground">
                          {product.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                      <p>
                        <span className="font-medium">Ukuran:</span>{" "}
                        {product.sizes.join(", ")}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {products.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>
                  Belum ada produk. Klik "Tambah Produk Baru" untuk memulai.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
