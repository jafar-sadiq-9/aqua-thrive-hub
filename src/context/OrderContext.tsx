import React, { createContext, useContext, useState, useCallback } from "react";
import type { CartItem } from "./CartContext";
import { toast } from "sonner";

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "status" | "date">) => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  cancelOrder: (id: string) => void;
  removeItemFromOrder: (orderId: string, productId: string) => void;
  newOrderCount: number;
  clearNewOrderCount: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderCount, setNewOrderCount] = useState(0);

  const placeOrder = useCallback((orderData: Omit<Order, "id" | "status" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: "pending",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setNewOrderCount((prev) => prev + 1);
    toast.success("🔔 New order received!", { description: `Order ${newOrder.id} from ${newOrder.customerName}` });
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "cancelled" as OrderStatus } : o)));
    toast.info("Order cancelled");
  }, []);

  const removeItemFromOrder = useCallback((orderId: string, productId: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== orderId || o.status !== "pending") return o;
      const newItems = o.items.filter((i) => i.product.id !== productId);
      if (newItems.length === 0) {
        toast.info("All items removed — order cancelled");
        return { ...o, items: newItems, total: 0, status: "cancelled" as OrderStatus };
      }
      const newTotal = newItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      return { ...o, items: newItems, total: newTotal };
    }));
    toast.success("Item removed from order");
  }, []);

  const clearNewOrderCount = useCallback(() => setNewOrderCount(0), []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, cancelOrder, removeItemFromOrder, newOrderCount, clearNewOrderCount }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
