"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { getInventoryHistory } from "@/src/services/productsService";
import { InventoryHistory } from "@/src/types/inventoryHistory";

const ProductHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState<InventoryHistory[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<InventoryHistory[]>(
    [],
  );

  useEffect(() => {
    const fetchHistory = () => {
      try {
        const storedHistory = getInventoryHistory();
        setHistory(storedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (id && history.length > 0) {
      const productId = id;
      const productHistory = history.filter(
        (change) => change.productId == productId,
      );
      setFilteredHistory(productHistory);
    }
  }, [id, history]);

  return (
    <div className="min-h-screen text-gray-100 p-6">
      <div className="relative bg-gray-800/50 backdrop-blur-md p-6 rounded-lg shadow-md border border-gray-500/30">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold ">Change History</h1>
          <button className="flex gap-2 items-center bg-gray-700/50 backdrop-blur-sm p-2 rounded-lg border border-gray-500/30">
            <FiRefreshCcw size={20} />
            <span>Refresh</span>
          </button>
        </div>
        {filteredHistory.length > 0 ? (
          <ul className="space-y-4">
            {filteredHistory.map((change) => (
              <li
                key={change.id}
                className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-gray-500/30"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{`Change Date: ${new Date(change.changeDate).toLocaleString()}`}</h3>
                    <p className="text-sm text-gray-400">
                      Change Type: {change.changeType}
                    </p>
                    <p className="text-sm text-gray-400">
                      Amount Changed: {change.changeAmount}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            No change history available for this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductHistory;
