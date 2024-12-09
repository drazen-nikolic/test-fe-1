"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeContextType, ThemeContext } from "./context";
import { createTheme } from "@mui/material/styles";
import { getDesignTokens, type PaletteName } from "./theme";

const clientSideEmotionCache = createCache({ key: "css", prepend: true });

interface ThemeProviderWithEmotionProps {
  children: ReactNode;
  emotionCache?: ReturnType<typeof createCache>;
}

export default function ThemeProviderWithEmotion({
  children,
  emotionCache = clientSideEmotionCache,
}: ThemeProviderWithEmotionProps) {
  const [mode, setMode] = useState<ThemeContextType["mode"]>("light");
  const [palette, setPalette] = useState<PaletteName>("blue");

  useEffect(() => {
    const storedMode = localStorage.getItem(
      "themeMode"
    ) as ThemeContextType["mode"];
    const storedPalette = localStorage.getItem("themePalette") as PaletteName;

    if (storedMode) {
      setMode(storedMode);
    }
    if (storedPalette) {
      setPalette(storedPalette);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };
  const changePalette = (newPalette: PaletteName) => {
    setPalette(newPalette);
    localStorage.setItem("themePalette", newPalette);
  };

  const theme = createTheme(getDesignTokens(mode, palette));

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContext.Provider
        value={{ toggleTheme, changePalette, mode, palette }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  );
}
