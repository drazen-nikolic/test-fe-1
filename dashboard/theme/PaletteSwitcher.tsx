import React from "react";
import { useThemeContext } from "./context";
import { Button, Box, Menu, MenuItem, BoxProps } from "@mui/material";
import { palettes, PaletteName } from "./theme";

export default function PaletteSwitcher(props: BoxProps) {
  const { palette, changePalette } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedPalette?: PaletteName) => {
    setAnchorEl(null);
    if (selectedPalette) {
      changePalette(selectedPalette);
    }
  };

  return (
    <Box {...props}>
      <Button
        variant="text"
        onClick={handleClick}
        sx={(theme) => ({ color: theme.palette.common.white })}
      >
        {palette}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "palette-selector-button",
        }}
      >
        {Object.keys(palettes).map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleClose(option as PaletteName)}
            selected={option === palette}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
