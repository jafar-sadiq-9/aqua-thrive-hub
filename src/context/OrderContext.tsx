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

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const clearNewOrderCount = useCallback(() => setNewOrderCount(0), []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, newOrderCount, clearNewOrderCount }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
