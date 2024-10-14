import React from "react";
import { useStore } from "../app/store/useStore";
import { Button } from "@mui/material";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <Button onClick={toggleDarkMode} variant="contained">
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  );
};

export default DarkModeToggle;
