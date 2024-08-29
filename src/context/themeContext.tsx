import { useState, useEffect } from "react";

export default function useDarkTheme(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [theme, setTheme] = useState<string>(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light"; // Fallback to "light" for server-side rendering
  });

  const colorTheme: string = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);

      if (theme === "dark") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
