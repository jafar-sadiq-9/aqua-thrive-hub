import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { categoryLabels, type ProductCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

const allCategories: ProductCategory[] = ["beginner", "exotic", "pairs", "aquariums", "accessories"];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") as ProductCategory | null;
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCat || "all");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category, products]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Fish</span> Store
        </h1>
        <p className="text-muted-foreground mb-8">Browse our complete collection</p>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fish, tanks, accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategory("all")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                category === "all" ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  category === cat ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
