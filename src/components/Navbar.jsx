import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
} from "@mui/material";
import { AccountCircle, ExitToApp, Menu } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  // const [userEmail, setUserEmail] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  console.log(userEmail);
  const setUser = useSetRecoilState(userState);

  const navbarstyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#FFFFF9",
  };

  // Function to handle user login/logout
  const logOut = () => {
    sessionStorage.setItem("jwtToken", null);
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/login");
  };

  if (userLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (userEmail) {
    return (
      <div style={navbarstyle}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 10px",
            width: "90vw",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ marginRight: "10px" }}>
              Coursite
            </Typography>
            <Typography variant="h6">Sell and Buy Courses </Typography>
          </Box>
          <Box style={{ display: "flex", gap: 2, marginRight: "30px" }}>
            <IconButton>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <PersonIcon fontSize="large" />
            </IconButton>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>Dashboard</MenuItem>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </div>
    );
  } else {
    return (
      <div style={navbarstyle}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 10px",
            width: "90vw",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ marginRight: "10px" }}>
              Coursite
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
      </div>
    );
  }
};

export default Navbar;
