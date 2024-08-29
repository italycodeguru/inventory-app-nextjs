/**
 * Represents a record of a change in inventory for a product.
 */
export interface InventoryHistory {
  id: string;
  productId: string;
  changeAmount: number;
  changeType: "addition" | "subtraction";
  changeDate: Date;
}
