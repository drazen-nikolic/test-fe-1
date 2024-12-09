"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleSignInRedirect = () => {
    router.push("/sign-in");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="h6" paragraph>
        {"We're glad to have you here! Please sign in to get started."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignInRedirect}
      >
        Sign In
      </Button>
    </Box>
  );
}
