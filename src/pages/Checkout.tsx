import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle, Truck } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-display text-2xl font-bold text-foreground">Please login to place an order</h2>
        <p className="text-muted-foreground">You need to be logged in to proceed with checkout.</p>
        <button onClick={() => navigate("/login")} className="btn-neon flex items-center gap-2">
          Login Now <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const order = placeOrder({ customerName: name, phone, address, items, total: totalPrice });
    setOrderId(order.id);
    clearCart();
    setPlaced(true);
    toast.success("Order placed successfully! 🎉");
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 px-4">
        <div className="animate-scale-in glass-card neon-border p-10 text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-neon-green mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-1">Order ID: <span className="neon-text font-mono">{orderId}</span></p>
          <p className="text-sm text-muted-foreground mb-4">Cash on Delivery • We'll contact you soon!</p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            Expected delivery in 2-4 days
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-8">
          <span className="gradient-text">Checkout</span>
        </h1>
        <div className="grid gap-6">
          {/* Order summary */}
          <div className="glass-card p-6">
            <h3 className="font-display text-sm font-semibold mb-4 text-foreground">Order Summary</h3>
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  {item.product.name} × {item.quantity}
                </span>
                <span className="text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="neon-text font-display">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-card p-6 flex flex-col gap-4">
            <h3 className="font-display text-sm font-semibold text-foreground">Delivery Details</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
            <div className="glass-card p-3 flex items-center gap-3 border-primary/30">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
              </div>
            </div>
            <button type="submit" className="btn-neon w-full text-base mt-2">
              Place Order — ${totalPrice.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
