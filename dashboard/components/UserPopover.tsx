"use client";

import {
  Typography,
  Button,
  Avatar,
  Popover,
  ButtonBase,
  Box,
} from "@mui/material";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserPopoverProps = { user: Partial<User> };

const UserPopover = ({ user }: UserPopoverProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const signOutAndRedirect = async () => {
    const res = await fetch("/api/auth/sign-out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/sign-in");
    }
  };

  return (
    <Box>
      <ButtonBase aria-describedby={id} onClick={handleClick}>
        <Avatar>{user.name?.slice(0, 1)}</Avatar>
      </ButtonBase>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Typography textAlign="center" gutterBottom variant="body1">
            {user.name}
          </Typography>
          <Typography textAlign="center" gutterBottom variant="body2">
            {user.email}
          </Typography>
          <Button variant="contained" fullWidth onClick={signOutAndRedirect}>
            Sign Out
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default UserPopover;
