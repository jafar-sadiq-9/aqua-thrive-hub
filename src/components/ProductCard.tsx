import type { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const inStock = product.stock > 0;

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="glass-card-hover group overflow-hidden flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isPair && <span className="pair-badge">🐟 Pair</span>}
          {inStock ? (
            <span className="stock-badge-in">In Stock</span>
          ) : (
            <span className="stock-badge-out">Sold Out</span>
          )}
        </div>
        {product.pairPrice && !product.isPair && (
          <div className="absolute top-3 right-3 pair-badge text-[10px]">
            Pair: ${product.pairPrice.toFixed(2)}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-sm font-semibold text-foreground mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 flex-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold neon-text">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
              inStock
                ? "btn-neon"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
