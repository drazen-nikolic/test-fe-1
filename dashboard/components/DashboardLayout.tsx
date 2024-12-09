"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  AppBar,
  Typography,
} from "@mui/material";
import {
  Menu as IconMenu,
  MenuOpen as IconMenuOpen,
} from "@mui/icons-material";
import { styled, Toolbar } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import Link from "next/link";
import { Dashboard } from "@mui/icons-material";
import { User } from "@prisma/client";
import UserPopover from "./UserPopover";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import ToggleThemeMode from "@/theme/ToggleThemeMode";
import PaletteSwitcher from "@/theme/PaletteSwitcher";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ReactElement;
};

type CustomPropOpen = {
  open: boolean;
};

const drawerWidth = 240;
const menuItems: MenuItem[] = [
  {
    label: "Widgets",
    path: "/dashboard",
    icon: <Dashboard />,
  },
];

const MainView = styled("main")<CustomPropOpen>(
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    padding: "20px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Spacer = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const StyledToolbar = styled(Toolbar)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.primary[theme.palette.mode === "light" ? "main" : "dark"],
}));

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Partial<User>;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(
    menuItems.indexOf(
      menuItems.find((item) => pathname.includes(item.path)) || menuItems[0]
    )
  );

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <AppBar position="fixed">
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 1 }}
          >
            {isDrawerOpen ? <IconMenuOpen /> : <IconMenu />}
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Box>
          <PaletteSwitcher marginRight={2} />
          <ToggleThemeMode marginRight={2} />
          <UserPopover user={user} />
        </StyledToolbar>
      </AppBar>
      <Drawer
        sx={{
          width: isDrawerOpen ? drawerWidth : 0,
          zIndex: 1,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Spacer />
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                href={
                  item.path.includes("dashboard")
                    ? `${item.path}/${user.id}`
                    : item.path
                }
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <MainView open={isDrawerOpen}>
        <Spacer />
        {children}
      </MainView>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{ duration: 3000 }}
      />
    </Box>
  );
}
