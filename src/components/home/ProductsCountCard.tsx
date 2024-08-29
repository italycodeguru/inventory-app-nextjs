"use client";

import { useProductContext } from "@/src/context/productsContext";

const ProductsCountCard = () => {
  const { products } = useProductContext();
  return (
    <div className="relative bg-secondary/50 backdrop-blur-md p-6 h-fit rounded-lg shadow-md border border-gray-500/30">
      <h3 className="text-xl font-semibold mb-4 ">Total Products</h3>
      <p className="text-4xl font-bold ">{products.length}</p>
    </div>
  );
};

export default ProductsCountCard;
