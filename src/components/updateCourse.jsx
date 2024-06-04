import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseCard from "./course_card_admin";

const UpdateCourseDialog = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState({
    // Initialize state for course details with the provided course data
    courseName: course.courseName,
    description: course.description,
    price: course.price,
    duration: course.duration,
    imageLink: course.imageLink,
  });
  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const updateCourse = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `http://localhost:3000/admin/courses/${course._id}`, // Replace with the actual endpoint and course ID
        courseDetails,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        console.log("Course updated successfully.");
        handleClose();
      } else {
        console.log("Error while updating course");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="text" size="small" onClick={handleOpen}>
        Update Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
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
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateCourse} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateCourseDialog;