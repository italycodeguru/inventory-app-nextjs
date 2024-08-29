import React, { useEffect, useState } from "react";
import {
  getInventoryHistory,
  getProductById,
} from "@/src/services/productsService";
import { InventoryHistory } from "@/src/types/inventoryHistory";
import { FiRefreshCcw } from "react-icons/fi";
import { clearInventoryHistory } from "../../services/productsService";

const InventoryHistoryList: React.FC = () => {
  const [history, setHistory] = useState<InventoryHistory[]>([]);

  useEffect(() => {
    const storedHistory = getInventoryHistory();
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    clearInventoryHistory();
    setHistory([]);
  };

  return (
    <div className="relative bg-secondary/50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6  h-[350px] overflow-y-auto border border-gray-500/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold ">Latest Inventory Changes</h2>
        <button
          onClick={clearHistory}
          className="flex gap-2 items-center bg-secondary/50 backdrop-blur-sm p-2 rounded-lg border border-gray-500/30"
        >
          <FiRefreshCcw />
          <span>Clear History</span>
        </button>
      </div>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((record) => (
            <li
              key={record.id}
              className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg border border-gray-500/30"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{`Product: ${getProductById(record.productId)?.name}`}</h3>
                  <p className="text-sm text-gray-400">
                    {record.changeDate.toLocaleString()}
                  </p>
                </div>
                <div
                  className={`text-lg font-bold ${
                    record.changeType === "addition"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {record.changeType === "addition" ? "+" : ""}
                  {record.changeAmount}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No inventory changes recorded yet.</p>
      )}
    </div>
  );
};

export default InventoryHistoryList;
