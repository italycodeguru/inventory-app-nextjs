import { useProductContext } from "@/src/context/productsContext";
import { Product } from "@/src/types/product";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const OutOfStockProducts = () => {
  // Retrieve products from the product context
  const { products } = useProductContext();

  // Filter products with zero stock
  const outOfStockProducts = products.filter(
    (product: Product) => product.stock === 0,
  );

  return (
    <div className="relative bg-secondary/50 backdrop-blur-md p-6 rounded-lg shadow-md border border-gray-500/30">
      <h2 className="text-xl font-semibold mb-4 ">Out of Stock Products</h2>
      {outOfStockProducts.length > 0 ? (
        <ul className="space-y-4">
          {outOfStockProducts.map((product) => (
            <li
              key={product.id}
              className="bg-gray-700/50 backdrop-blur-sm p-4 rounded-lg border border-gray-500/30"
            >
              <div className="flex items-center gap-4">
                <FiShoppingCart size={24} />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-400">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No products are currently out of stock.</p>
      )}
    </div>
  );
};

export default OutOfStockProducts;
