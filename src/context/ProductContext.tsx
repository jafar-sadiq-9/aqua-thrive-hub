import React, { createContext, useContext, useState, useCallback } from "react";
import { products as defaultProducts, type Product, type ProductCategory } from "@/lib/products";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  const addProduct = useCallback((data: Omit<Product, "id">) => {
    const newProduct: Product = { ...data, id: `product-${Date.now()}` };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
