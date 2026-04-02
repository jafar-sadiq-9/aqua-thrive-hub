import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { useProducts } from "@/context/ProductContext";
import { Navigate } from "react-router-dom";
import { Phone, MapPin, Clock, Package, LayoutGrid, Bell, CheckCircle2, Truck, AlertCircle } from "lucide-react";
import AdminProductManager from "@/components/AdminProductManager";
import { useState, useEffect } from "react";

type Tab = "orders" | "products";

const statusConfig = {
  pending: { label: "Pending", icon: AlertCircle, class: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  confirmed: { label: "Confirmed", icon: CheckCircle2, class: "bg-primary/15 text-primary border-primary/30" },
  delivered: { label: "Delivered", icon: Truck, class: "bg-green-500/15 text-green-400 border-green-500/30" },
};

const Admin = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus, newOrderCount, clearNewOrderCount } = useOrders();
  const { products } = useProducts();
  const [tab, setTab] = useState<Tab>("orders");

  useEffect(() => {
    if (tab === "orders") clearNewOrderCount();
  }, [tab, clearNewOrderCount]);

  if (!user?.isAdmin) return <Navigate to="/login" />;

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const confirmedOrders = orders.filter((o) => o.status === "confirmed");
  const deliveredOrders = orders.filter((o) => o.status === "delivered");

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold mb-2">
          <span className="gradient-text">Admin</span> Dashboard
        </h1>
        <p className="text-muted-foreground mb-6">Manage your store</p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-display font-bold neon-text">{products.length}</p>
            <p className="text-xs text-muted-foreground">Products</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-display font-bold neon-text">{orders.length}</p>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-display font-bold neon-text">
              ${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
          <div className="glass-card p-5 text-center relative">
            <p className="text-2xl font-display font-bold neon-text">{pendingOrders.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
            {pendingOrders.length > 0 && (
              <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("orders")}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === "orders" ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" /> Orders
            {newOrderCount > 0 && tab !== "orders" && (
              <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {newOrderCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === "products" ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Products
          </button>
        </div>

        {/* Tab content */}
        {tab === "products" && <AdminProductManager />}

        {tab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div className="glass-card p-14 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">No Orders Yet</h3>
                <p className="text-sm text-muted-foreground">
                  When customers place orders, you'll see them here with a notification alert.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Pending Orders */}
                {pendingOrders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Pending Orders ({pendingOrders.length})
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      {pendingOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirmed Orders */}
                {confirmedOrders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Confirmed ({confirmedOrders.length})
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      {confirmedOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivered Orders */}
                {deliveredOrders.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="h-5 w-5 text-green-400" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        Delivered ({deliveredOrders.length})
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      {deliveredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} onStatusChange={updateOrderStatus} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: import("@/context/OrderContext").Order;
  onStatusChange: (id: string, status: "pending" | "confirmed" | "delivered") => void;
}

const OrderCard = ({ order, onStatusChange }: OrderCardProps) => {
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-display text-sm font-bold neon-text">{order.id}</p>
          <p className="text-sm text-foreground font-semibold mt-1">{order.customerName}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Phone className="h-3 w-3" /> {order.phone}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {order.address}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-lg neon-text">${order.total.toFixed(2)}</p>
          <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${config.class}`}>
            <StatusIcon className="h-3 w-3" /> {config.label}
          </span>
          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 justify-end">
            <Clock className="h-3 w-3" /> {new Date(order.date).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order items */}
      <div className="border-t border-border pt-3 mb-4">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{item.product.name} × {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Status actions */}
      {order.status !== "delivered" && (
        <div className="flex gap-2">
          {order.status === "pending" && (
            <button
              onClick={() => onStatusChange(order.id, "confirmed")}
              className="btn-neon text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Confirm Order
            </button>
          )}
          {order.status === "confirmed" && (
            <button
              onClick={() => onStatusChange(order.id, "delivered")}
              className="btn-neon text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <Truck className="h-3.5 w-3.5" /> Mark Delivered
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
