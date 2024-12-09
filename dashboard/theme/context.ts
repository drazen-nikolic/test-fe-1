import { createContext, useContext } from "react";
import type { PaletteName } from "./theme";

export type ThemeContextType = {
  toggleTheme: () => void;
  changePalette: (newPalette: PaletteName) => void;
  mode: "light" | "dark";
  palette: PaletteName;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  return context;
};
