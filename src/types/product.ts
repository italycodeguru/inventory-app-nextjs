// src/types/product.ts

/**
 * Represents a product in the inventory system.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}
