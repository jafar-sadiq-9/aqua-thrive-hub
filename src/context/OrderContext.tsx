import React, { createContext, useContext, useState, useCallback } from "react";
import type { CartItem } from "./CartContext";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "delivered";
  date: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "status" | "date">) => Order;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = useCallback((orderData: Omit<Order, "id" | "status" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: "pending",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
