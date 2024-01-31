import React, { useState } from "react";
import axios from 'axios';


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

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.confirmPassword !== formData.password){
        alert("passwords didn't match.");
    }
    else{
        {
            try {
                var response;
                if(formData.isAdmin === true){
                    response = await axios.post(
                        "http://localhost:3000/admin/signup",
                        formData
                      );
                }
                else{
                    response = await axios.post(
                        "http://localhost:3000/user/signup",
                        formData
                      );
                }
                if (response.status === 200) {
                  console.log("Signup successful.");
                  navigate("/login");
                } else {
                  console.log("Error");
                }
              } catch (error) {
                console.error("Error while signing up:", error.message);
              }
        }
    }
    
  };
  const navigate = useNavigate();

  const landingStyles = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, #E1E8F5, #FFFCF7)"
  };

  return (
    <div
    style={landingStyles}>

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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  required
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
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
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "20px" }}
          >
            Already have an account?{" "}
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
};

export default Signup;
