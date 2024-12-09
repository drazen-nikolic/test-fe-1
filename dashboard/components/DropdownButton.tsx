"use client";

import React, { useState } from "react";
import { Button, Menu, MenuItem, type ButtonProps } from "@mui/material";
import { WidgetType } from "@/types/widget";

type DropdownButtonProps = {
  children: React.ReactNode;
  options: Partial<WidgetType>[];
  onSelect: (option: Partial<WidgetType>) => void;
} & ButtonProps;

export default function DropdownButton({
  children,
  options,
  onSelect,
  ...buttonProps
}: DropdownButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: Partial<WidgetType>) => {
    onSelect(option);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        aria-controls={open ? "dropdown-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        {...buttonProps}
      >
        {children}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "dropdown-button",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.type} onClick={() => handleSelect(option)}>
            {option.type}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
