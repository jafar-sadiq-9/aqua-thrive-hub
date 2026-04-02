import { useState, useRef } from "react";
import { useProducts } from "@/context/ProductContext";
import { type Product, type ProductCategory, categoryLabels } from "@/lib/products";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, ImagePlus, Save } from "lucide-react";

const allCategories: ProductCategory[] = ["beginner", "exotic", "pairs", "aquariums", "accessories"];

interface ProductFormData {
  name: string;
  price: string;
  pairPrice: string;
  image: string;
  description: string;
  category: ProductCategory;
  stock: string;
  isPair: boolean;
  featured: boolean;
}

const emptyForm: ProductFormData = {
  name: "",
  price: "",
  pairPrice: "",
  image: "",
  description: "",
  category: "beginner",
  stock: "",
  isPair: false,
  featured: false,
};

const AdminProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setForm((prev) => ({ ...prev, image: result }));
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview("");
    setShowForm(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      pairPrice: product.pairPrice ? String(product.pairPrice) : "",
      image: product.image,
      description: product.description,
      category: product.category,
      stock: String(product.stock),
      isPair: product.isPair || false,
      featured: product.featured || false,
    });
    setImagePreview(product.image);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.stock || !form.image) {
      toast.error("Please fill name, price, stock, and upload a photo");
      return;
    }

    const productData = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      pairPrice: form.pairPrice ? parseFloat(form.pairPrice) : undefined,
      image: form.image,
      description: form.description.trim(),
      category: form.category,
      stock: parseInt(form.stock, 10),
      isPair: form.isPair,
      featured: form.featured,
    };

    if (editingId) {
      updateProduct(editingId, productData);
      toast.success("Product updated!");
    } else {
      addProduct(productData);
      toast.success("Product added! 🐟");
    }

    setShowForm(false);
    setForm(emptyForm);
    setImagePreview("");
    setEditingId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteProduct(id);
      toast.success("Product deleted");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Manage Products ({products.length})
        </h2>
        <button onClick={openAdd} className="btn-neon flex items-center gap-2 text-sm px-5 py-2.5">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <div className="glass-card neon-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-bold text-foreground">
                {editingId ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Image upload */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Product Photo *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer border-2 border-dashed border-border rounded-xl h-40 flex items-center justify-center overflow-hidden hover:border-primary/50 transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImagePlus className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-xs">Click to upload photo</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Product Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Fancy Guppy"
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              {/* Price + Pair Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    placeholder="9.99"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Pair Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.pairPrice}
                    onChange={(e) => setForm((p) => ({ ...p, pairPrice: e.target.value }))}
                    placeholder="Optional"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Stock + Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Stock *</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
                    placeholder="10"
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as ProductCategory }))}
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {allCategories.map((c) => (
                      <option key={c} value={c}>{categoryLabels[c]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Short description..."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPair}
                    onChange={(e) => setForm((p) => ({ ...p, isPair: e.target.checked }))}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground">Pair Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-foreground">Featured</span>
                </label>
              </div>

              <button type="submit" className="btn-neon w-full flex items-center justify-center gap-2 text-sm mt-2">
                <Save className="h-4 w-4" />
                {editingId ? "Save Changes" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div key={product.id} className="glass-card p-4 flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-semibold text-foreground truncate">{product.name}</h4>
                {product.isPair && <span className="pair-badge text-[10px]">Pair</span>}
                {product.featured && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">Featured</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {categoryLabels[product.category]} • Stock: {product.stock}
              </p>
            </div>
            <span className="font-display text-sm font-bold neon-text whitespace-nowrap">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex gap-1.5 flex-shrink-0">
              <button
                onClick={() => openEdit(product)}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(product.id, product.name)}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductManager;
