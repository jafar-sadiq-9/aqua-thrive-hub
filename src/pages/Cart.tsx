import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, LogIn } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
        <Link to="/shop" className="btn-neon flex items-center gap-2">
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-8">
          <span className="gradient-text">Shopping</span> Cart
        </h1>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.product.id} className="glass-card p-4 flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                loading="lazy"
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-sm font-semibold text-foreground">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">${item.product.price.toFixed(2)} each</p>
                {item.product.isPair && <span className="pair-badge text-[10px] mt-1 inline-block">Pair</span>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="p-1.5 rounded-lg bg-secondary text-foreground hover:bg-primary/20 transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1.5 rounded-lg bg-secondary text-foreground hover:bg-primary/20 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="font-display text-sm font-bold neon-text w-20 text-right">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="glass-card neon-border p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="font-display text-2xl font-bold neon-text">${totalPrice.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-neon w-full flex items-center justify-center gap-2 text-base">
            Proceed to Checkout <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
