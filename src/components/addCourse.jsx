import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Box,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
  const [courseDetails, setCourseDetails] = useState({
    // Initialize state for course details
    // Example: title, description, etc.
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const addCourse = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:3000/admin/newCourse",
        courseDetails,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        console.log("Course added successfully.");
        navigate("/admin");
      } else {
        console.log("Error while adding course");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
      <Container>
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
              Add Course
            </Typography>
            <form>
              <Grid container spacing={{ xs: 1, md: 2 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Course Title"
                    variant="outlined"
                    fullWidth
                    required
                    name="courseName"
                    value={courseDetails.courseName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} row={12}>
                  <TextField
                    label="Course Description"
                    variant="outlined"
                    fullWidth
                    required
                    name="description"
                    value={courseDetails.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Price of the course"
                    variant="outlined"
                    fullWidth
                    required
                    name="price"
                    value={courseDetails.price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Duration of the course"
                    variant="outlined"
                    fullWidth
                    required
                    name="duration"
                    value={courseDetails.duration}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image Link"
                    variant="outlined"
                    fullWidth
                    required
                    name="imageLink"
                    value={courseDetails.imageLink}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={addCourse}
                  >
                    Add +
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AddCourseForm;
