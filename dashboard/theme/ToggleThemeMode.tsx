"use client";

import { Box, IconButton, type BoxProps } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "./context";

export default function ToggleThemeMode(props: BoxProps) {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box {...props}>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Box>
  );
}
