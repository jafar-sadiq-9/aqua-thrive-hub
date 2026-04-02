import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import { useProducts } from "@/context/ProductContext";
import { Navigate } from "react-router-dom";
import { Phone, MapPin, Clock, Package, LayoutGrid } from "lucide-react";
import AdminProductManager from "@/components/AdminProductManager";
import { useState } from "react";

type Tab = "orders" | "products";

const Admin = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();
  const [tab, setTab] = useState<Tab>("products");

  if (!user?.isAdmin) return <Navigate to="/login" />;

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
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-display font-bold neon-text">
              ${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </div>
          <div className="glass-card p-5 text-center">
            <p className="text-2xl font-display font-bold neon-text">
              {orders.filter((o) => o.status === "pending").length}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === "products" ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Products
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              tab === "orders" ? "btn-neon" : "glass-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" /> Orders
          </button>
        </div>

        {/* Tab content */}
        {tab === "products" && <AdminProductManager />}

        {tab === "orders" && (
          <div>
            <h2 className="font-display text-xl font-semibold mb-4 text-foreground">Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="glass-card p-10 text-center text-muted-foreground">
                No orders yet. They'll appear here when customers place orders.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="glass-card p-6 animate-fade-in">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-display text-sm font-bold neon-text">{order.id}</p>
                        <p className="text-sm text-foreground font-semibold">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" /> {order.phone}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {order.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-lg neon-text">${order.total.toFixed(2)}</p>
                        <span className="stock-badge-in capitalize">{order.status}</span>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                          <Clock className="h-3 w-3" /> {new Date(order.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-border pt-3">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
