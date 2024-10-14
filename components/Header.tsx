import { Box, Button, Typography } from "@mui/material";
import React from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";

function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        padding: "1rem 2rem",
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 2px lightgrey",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
        Where in the world
      </Typography>
      <Button>
        <NightlightRoundIcon />
        Dark Mode
      </Button>
    </Box>
  );
}

export default Header;
