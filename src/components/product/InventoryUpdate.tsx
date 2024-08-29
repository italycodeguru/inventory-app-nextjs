import React, { useState } from "react";

// Define the component props
interface InventoryUpdateProps {
  stock: number;
  onStockChange: (newStock: number) => void;
}

const InventoryUpdate: React.FC<InventoryUpdateProps> = ({
  stock,
  onStockChange,
}) => {
  const [currentStock, setCurrentStock] = useState(stock);

  // Handle increment of stock
  const handleIncrement = () => {
    const newStock = currentStock + 1;
    setCurrentStock(newStock);
    onStockChange(newStock);
  };

  // Handle decrement of stock
  const handleDecrement = () => {
    const newStock = currentStock > 0 ? currentStock - 1 : 0; // Prevent negative stock
    setCurrentStock(newStock);
    onStockChange(newStock);
  };

  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={handleDecrement}
        className="bg-primary py-1 px-3 rounded-md hover:bg-gray-600 transition-colors"
      >
        -
      </button>
      <span className="text-lg font-semibold">{currentStock}</span>
      <button
        onClick={handleIncrement}
        className="bg-primary  py-1 px-3 rounded-md hover:bg-gray-600 transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default InventoryUpdate;
