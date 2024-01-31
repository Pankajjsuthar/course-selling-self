import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eeeeee",
        padding: "15px 10px",
        width: "100vw",
      }}
    >
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ marginRight: "10px" }}>
          Coursera
        </Typography>
        <Typography variant="h6">Sell and Buy Courses </Typography>
      </Box>
      <Box style={{ display: "flex", gap: 2, marginRight: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AccountCircle />}
          sx={{ marginRight: "10px" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToApp />}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
