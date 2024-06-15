import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { Box, Stack } from "@mui/material";

function App() {
  return (
    <Stack>
      <AppRoutes />
    </Stack>
  );
}

export default App;
