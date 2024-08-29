import { Product } from "@/src/types/product";
import { InventoryHistory } from "@/src/types/inventoryHistory";

/**
 * Key for storing products in local storage
 */
const PRODUCTS_KEY = "products";

/**
 * Key for storing inventory history in local storage
 */
const INVENTORY_HISTORY_KEY = "inventoryHistory";

/**
 * Checks if localStorage is available (i.e., running in the browser).
 * @returns A boolean indicating whether localStorage is accessible.
 */
const isLocalStorageAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
};

/**
 * Retrieves all products from local storage.
 * @returns An array of products.
 */
export const getProducts = (): Product[] => {
  if (!isLocalStorageAvailable()) return [];
  const products = localStorage.getItem(PRODUCTS_KEY);
  return products ? JSON.parse(products) : [];
};

/**
 * Retrieves a product by its ID from local storage.
 * @param productId - The ID of the product to retrieve.
 * @returns The product with the specified ID, or undefined if not found.
 */
export const getProductById = (productId: string): Product | undefined => {
  const products = getProducts();
  return products.find((product) => product.id === productId);
};

/**
 * Saves products to local storage.
 * @param products The array of products to save.
 */
const saveProducts = (products: Product[]): void => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};

/**
 * Adds a new product to local storage.
 * @param product The product to add.
 */
export const createProduct = (product: Product): void => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

/**
 * Deletes a product from local storage.
 * @param id The ID of the product to delete.
 */
export const deleteProduct = (id: string): void => {
  let products = getProducts();
  products = products.filter((product) => product.id !== id);
  saveProducts(products);
};

/**
 * Updates a product in local storage.
 * @param updatedProduct The updated product data.
 */
export const updateProduct = (updatedProduct: Product): void => {
  const products = getProducts();
  const index = products.findIndex(
    (product) => product.id === updatedProduct.id,
  );
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
  }
};

/**
 * Retrieves the inventory history from local storage.
 * @returns An array of inventory history records.
 */
export const getInventoryHistory = (): InventoryHistory[] => {
  if (!isLocalStorageAvailable()) return [];
  const history = localStorage.getItem(INVENTORY_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
};

/**
 * Saves inventory history to local storage.
 * @param history The array of inventory history records to save.
 */
const saveInventoryHistory = (history: InventoryHistory[]): void => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(INVENTORY_HISTORY_KEY, JSON.stringify(history));
  }
};

/**
 * Adds an entry to the inventory history.
 * @param entry The inventory history entry to add.
 */
export const addInventoryHistoryEntry = (entry: InventoryHistory): void => {
  const history = getInventoryHistory();
  history.push(entry);
  saveInventoryHistory(history);
};

/**
 * Updates the stock level of a product and records the change in inventory history.
 * @param productId The ID of the product to update.
 * @param newStock The new stock of the product.
 * @param changeType The type of change ('addition' or 'subtraction').
 * @param notes Optional notes about the change.
 */
export const updateInventory = (productId: string, newStock: number): void => {
  let products = getProducts();
  const product = products.find((p) => p.id === productId);

  if (product) {
    const changeType = newStock > product.stock ? "addition" : "subtraction";
    const changeAmount = newStock - product.stock;
    product.stock = newStock;
    updateProduct(product);

    const historyEntry: InventoryHistory = {
      id: new Date().toISOString(), // Unique ID for the history entry
      productId: productId,
      changeAmount,
      changeType,
      changeDate: new Date(),
    };

    addInventoryHistoryEntry(historyEntry);
  }
};

/**
 * Deletes products by their IDs and removes related inventory history records.
 * @param {string[]} ids - Array of product IDs to be deleted.
 */
export const deleteProducts = (ids: string[]): void => {
  // Get all products and filter out the ones to be deleted
  const products = getProducts();
  const updatedProducts = products.filter(
    (product) => !ids.includes(product.id),
  );
  saveProducts(updatedProducts);

  // Get all inventory history and filter out the records related to deleted products
  const history = getInventoryHistory();
  const updatedHistory = history.filter(
    (record) => !ids.includes(record.productId),
  );
  saveInventoryHistory(updatedHistory);
};

/**
 * Clears all inventory history from local storage.
 */
export const clearInventoryHistory = (): void => {
  localStorage.removeItem(INVENTORY_HISTORY_KEY);
};

/**
 * Generates a random UUID
 */
export const generateUniqueId = (): string => {
  // Generate a unique string based on the current timestamp and random number
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
