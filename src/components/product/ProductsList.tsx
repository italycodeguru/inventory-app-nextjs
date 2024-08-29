import React, { useState } from "react";
import { Product } from "@/src/types/product";
import InventoryUpdate from "./InventoryUpdate";
import { useProductContext } from "@/src/context/productsContext";
import { FiBarChart, FiEdit } from "react-icons/fi";
import Link from "next/link";

interface ProductListProps {
  onSelectedProductForEdit: (product: Product) => void;
}

const ProductsList: React.FC<ProductListProps> = ({
  onSelectedProductForEdit,
}) => {
  const { products, removeProducts, updateProductInventory } =
    useProductContext();
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      // Select all products
      const allProductIds = filteredProducts.map((product) => product.id);
      setSelectedProducts(new Set(allProductIds));
    } else {
      // Deselect all products
      setSelectedProducts(new Set());
    }
    setSelectAll(!selectAll);
  };

  const handleBatchDelete = () => {
    const idsToDelete = Array.from(selectedProducts);
    if (confirm("Are you sure you want to delete the selected products?")) {
      removeProducts(idsToDelete);
      setSelectedProducts(new Set());
      setSelectAll(false); // Reset the "Select All" checkbox after deletion
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: 0 | 1,
  ) => {
    const value = Number(event.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const handleStockChange = (productId: string, newStock: number) => {
    updateProductInventory(productId, newStock);
  };

  // Filter and search products based on user input
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  });

  const handleEdit = (product: Product) => {
    onSelectedProductForEdit(product);
  };

  return (
    <div className="relative p-6 bg-secondary/50 backdrop-blur-md  rounded-lg shadow-md border border-gray-500/30 mb-[90px]">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>

      {/* Search and Filter Section */}
      <div className="mb-4 flex flex-col gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="mt-1 block w-full p-2 border border-gray-700 bg-secondary/50 backdrop-blur-sm rounded-md shadow-sm"
            placeholder="Search by name or description"
          />
        </div>
        <div>
          <label htmlFor="priceRange" className="block text-sm font-medium">
            Filter by Price
          </label>
          <div className="flex items-center gap-4 mb-2">
            <input
              id="priceMin"
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e, 0)}
              className="w-full"
            />
            <input
              id="priceMax"
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e, 1)}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>Min Price: ${priceRange[0]}</span>
            <span>Max Price: ${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Batch Delete Button */}
      {selectedProducts.size !== 0 && (
        <div className="mb-4 flex items-center">
          <button
            onClick={handleBatchDelete}
            className="bg-red-600  py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="p-2 border-b">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Price</th>
              <th className="p-2 border-b text-center">Stock</th>
              <th className="p-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products match the criteria
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-900 border-b border-b-gray-500/30"
                >
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.description}</td>
                  <td className="p-2">${product.price.toFixed(2)}</td>
                  <td className="p-2">
                    <InventoryUpdate
                      stock={product.stock}
                      onStockChange={(newStock) =>
                        handleStockChange(product.id, newStock)
                      }
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center items-center gap-2">
                      <FiEdit
                        size={24}
                        className="cursor-pointer"
                        onClick={() => handleEdit(product)}
                      />
                      <Link href={`/products/history/${product.id}`}>
                        <FiBarChart size={24} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
