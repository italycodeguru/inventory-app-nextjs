import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Sidebar from "@/src/components/base/Sidebar";
import BottomNavigation from "@/src/components/base/BottomNavigation";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Inventory Tracking App",
  description: "Inventory Tracking App",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          raleway.className + " bg-background dark:text-white light:text-black"
        }
      >
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <main>{children}</main>
            <BottomNavigation />
          </div>
        </div>
      </body>
    </html>
  );
}
