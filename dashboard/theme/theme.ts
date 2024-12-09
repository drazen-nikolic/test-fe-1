import { ThemeContextType } from "./context";

export const palettes = {
  pink: {
    primary: { main: "#e91e63", contrastText: "#ffffff" },
    secondary: { main: "#f06292", contrastText: "#000000" },
  },
  blue: {
    primary: { main: "#2196f3", contrastText: "#ffffff" },
    secondary: { main: "#64b5f6", contrastText: "#000000" },
  },
  green: {
    primary: { main: "#4caf50", contrastText: "#ffffff" },
    secondary: { main: "#81c784", contrastText: "#000000" },
  },
  yellow: {
    primary: { main: "#ffc107", contrastText: "#000000" },
    secondary: { main: "#ffe082", contrastText: "#000000" },
  },
  orange: {
    primary: { main: "#ff9800", contrastText: "#000000" },
    secondary: { main: "#ffb74d", contrastText: "#000000" },
  },
};

export type PaletteName = keyof typeof palettes;

export const getDesignTokens = (
  mode: ThemeContextType["mode"],
  paletteName: PaletteName
) => {
  const selectedPalette = palettes[paletteName] || palettes.blue; // Default to blue

  return {
    palette: {
      mode: mode,
      primary: selectedPalette.primary,
      secondary: selectedPalette.secondary,
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1d1d1d",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
        secondary: mode === "light" ? "#4f4f4f" : "#b0b0b0",
      },
    },
  };
};
