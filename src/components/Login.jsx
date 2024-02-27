import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isAdmin: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );
      if (response.status === 200) {
        console.log("Login successful.");
        sessionStorage.setItem("jwtToken", response.data.token);
        if (formData.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user_courses");
        }
      } else {
        console.log("Error");
      }
    } catch {
      console.error("Error while logging up:", error.message);
    }
  };

  const navigate = useNavigate();

  const landingStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, #E1E8F5, #FFFCF7)",
  };
  return (
    <div style={landingStyles}>
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Card>
          <CardContent>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
              }}
            >
              Log In
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Checkbox for admin status */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isAdmin}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label="Are you an admin?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Typography
              variant="body2"
              align="center"
              style={{ marginTop: "20px" }}
            >
              Don't have an account?{" "}
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
