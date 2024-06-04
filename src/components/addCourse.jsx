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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const AddCourseDialog = () => {
  const [open, setOpen] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState(0);

  const addCourse = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:3000/admin/newCourse",
        {
          courseName: courseName,
          description: description,
          imageLink: image,
          duration: duration,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        console.log("Course added successfully.");
        handleClose();
      } else {
        console.log("Error while adding course");
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
        Add Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Course</DialogTitle>
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
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} row={12}>
                <TextField
                  label="Course Description"
                  variant="outlined"
                  fullWidth
                  required
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Price of the course"
                  variant="outlined"
                  fullWidth
                  required
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Duration of the course"
                  variant="outlined"
                  fullWidth
                  required
                  name="duration"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image Link"
                  variant="outlined"
                  fullWidth
                  required
                  name="imageLink"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCourse} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddCourseDialog;
 