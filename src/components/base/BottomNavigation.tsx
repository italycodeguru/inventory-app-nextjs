"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import { ThemeSwitch } from "./ThemeSwitch";

const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <footer className="md:hidden block fixed bottom-0 right-0 left-0 bg-secondary/70 border dark:border-secondary backdrop-blur-md rounded-t-xl  py-2">
      <div className="flex gap-10 justify-center items-center relative">
        <div className="left-0 absolute mr-auto">
          <ThemeSwitch />
        </div>
        <Link
          href="/"
          className={`flex flex-col items-center ${pathname == "/" ? "bg-primary text-white font-bold" : ""} p-2 rounded-md shadow`}
        >
          <FiHome size={24} />
          <p className="text-sm">Home</p>
        </Link>
        <Link href="/products" className="flex flex-col items-center">
          <FiShoppingBag size={24} />
          <p className="text-sm">Products</p>
        </Link>
      </div>
    </footer>
  );
};

export default BottomNavigation;
