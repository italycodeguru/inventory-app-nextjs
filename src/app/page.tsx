"use client";

import React from "react";
import Link from "next/link";
import ProductsCountCard from "@/src/components/home/ProductsCountCard";
import { ProductProvider } from "@/src/context/productsContext";
import InventoryHistoryList from "@/src/components/home/InventoryHistoryList";
import OutOfStockProducts from "@/src/components/home/OutOfStockProducts";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen  p-8">
      <h1 className="text-2xl font-black mb-6">Inventory Dashboard</h1>

      {/* Project Description */}
      <div className="relative bg-secondary/50 backdrop-blur-md p-6 rounded-lg shadow-md mb-6 border border-gray-500/30">
        <h2 className="text-xl font-semibold mb-4 ">Project Overview</h2>
        <p className="">
          Welcome to the Inventory Tracking App! This application allows users
          to manage their products and inventory levels efficiently. With
          features like product creation, editing, deletion, and inventory
          updates, it provides a simple yet powerful tool for managing your
          store.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ProductProvider>
          <div className="flex flex-col gap-4">
            <ProductsCountCard />
            <OutOfStockProducts />
          </div>
        </ProductProvider>
        <InventoryHistoryList />
      </div>
    </div>
  );
};

export default Home;
