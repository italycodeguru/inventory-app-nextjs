"use client";

import Link from "next/link";
import React from "react";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "./ThemeSwitch";

// Sidebar Component
const Sidebar: React.FC = () => (
  <aside className="md:block hidden w-64 h-screen bg-secondary/50 backdrop-blur-lg p-4 border border-gray-500/30">
    <div className="flex items-center mb-8 justify-between">
      <h1 className="text-xl font-bold">Inventory App</h1>
      <ThemeSwitch />
    </div>
    <nav>
      <ul className="space-y-3">
        <SidebarItem href="/" icon={FiHome} label="Home" />
        <SidebarItem href="/products" icon={FiShoppingBag} label="Products" />
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

// SidebarItem Component
interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const baseClasses = "flex gap-4 items-center rounded-md p-3 cursor-pointer";
  const activeClasses =
    "bg-primary/20 backdrop-blur-md border border-primary/30";
  const inactiveClasses =
    "hover:bg-primary/10 hover:backdrop-blur-md border border-transparent hover:border-gray-500/30";

  return (
    <li>
      <Link href={href} passHref>
        <div
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </div>
      </Link>
    </li>
  );
};
