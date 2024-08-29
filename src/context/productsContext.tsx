import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/src/types/product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProducts,
  updateInventory,
} from "@/src/services/productsService";

interface ProductContextType {
  products: Product[];
  addNewProduct: (product: Product) => void;
  updateProductInventory: (id: string, newStock: number) => void;
  updateExistingProduct: (product: Product) => void;
  removeProducts: (ids: string[]) => void;
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(getProducts());

  const addNewProduct = (product: Product) => {
    createProduct(product);
    setProducts(getProducts()); // Refresh state with updated products
  };

  const updateExistingProduct = (product: Product) => {
    updateProduct(product);
    setProducts(getProducts()); // Refresh state with updated products
  };

  const removeProducts = (ids: string[]) => {
    deleteProducts(ids);
    setProducts(getProducts()); // Refresh state with updated products
  };

  const refreshProducts = () => {
    setProducts(getProducts()); // Refresh state with updated products
  };

  const updateProductInventory = (id: string, newStock: number) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, stock: newStock } : product,
    );
    updateInventory(id, newStock);
    setProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addNewProduct,
        updateProductInventory,
        updateExistingProduct,
        removeProducts,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
