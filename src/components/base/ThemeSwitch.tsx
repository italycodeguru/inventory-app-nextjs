import useDarkTheme from "@/src/context/themeContext";
import { BiSun, BiMoon } from "react-icons/bi";

export const ThemeSwitch = () => {
  const [colorTheme, setTheme] = useDarkTheme();

  return (
    <div
      onClick={() => setTheme(colorTheme)}
      className="flex items-center justify-center rounded-full h-[40px] w-[40px] bg-secondary cursor-pointer"
    >
      {colorTheme == "dark" ? (
        <BiSun className="text-xl" />
      ) : (
        <BiMoon className="text-xl" />
      )}
    </div>
  );
};
