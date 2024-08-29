"use client";

import ProductForm from "@/src/components/product/ProductForm";
import ProductList from "@/src/components/product/ProductsList";
import React, { useState } from "react";
import ProductsList from "@/src/components/product/ProductsList";
import { ProductProvider } from "@/src/context/productsContext";
import { Product } from "@/src/types/product";

const ProductsPage: React.FC = () => {
  const [selectedEditProduct, setSelectedEditProduct] = useState<
    Product | undefined
  >(undefined);
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <ProductProvider>
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-3 col-span-12">
            <ProductForm initialProduct={selectedEditProduct} />
          </div>
          <div className="md:col-span-9 col-span-12">
            <ProductsList onSelectedProductForEdit={setSelectedEditProduct} />
          </div>
        </div>
      </ProductProvider>
    </div>
  );
};

export default ProductsPage;
