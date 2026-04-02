import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Package, ArrowRight, Clock, CheckCircle, Truck, XCircle, Trash2 } from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-primary", bg: "bg-primary/10 border-primary/30" },
  delivered: { label: "Delivered", icon: Truck, color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/30" },
};

const MyOrders = () => {
  const { orders, cancelOrder, removeItemFromOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6">
        <Package className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-display text-2xl font-bold text-foreground">Please login to view orders</h2>
        <button onClick={() => navigate("/login")} className="btn-neon flex items-center gap-2">
          Login Now <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  const myOrders = orders.filter((o) => o.phone === user.phone);

  if (myOrders.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6">
        <Package className="h-16 w-16 text-muted-foreground" />
        <h2 className="font-display text-2xl font-bold text-foreground">No orders yet</h2>
        <p className="text-muted-foreground">Start shopping to see your orders here.</p>
        <button onClick={() => navigate("/shop")} className="btn-neon flex items-center gap-2">
          Browse Shop <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-8">
          <span className="gradient-text">My</span> Orders
        </h1>
        <div className="flex flex-col gap-6">
          {myOrders.map((order) => {
            const cfg = statusConfig[order.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={order.id} className="glass-card p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {cfg.label}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-4">
                  {order.items.map((item) => {
                    const isFish = item.product.category === "fishes";
                    return (
                      <div key={item.product.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} {isFish ? (item.product.isPair ? "pairs" : "fishes") : "items"} × ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                        {order.status === "pending" && order.items.length > 1 && (
                          <button
                            onClick={() => removeItemFromOrder(order.id, item.product.id)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-display text-lg font-bold neon-text">${order.total.toFixed(2)}</span>
                  {order.status === "pending" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
