import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Course_card_admin = (props) => {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    const jwtToken = sessionStorage.getItem("jwtToken");
    console.log(props.courseId);
    try {
      // Make an API call to delete the course using the course ID
      const response = await axios.delete(
        `http://localhost:3000/admin/courses/${props.courseId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
          },
        }
      );

      if (response.status === 200) {
        // Course deleted successfully, you can perform additional actions if needed
        console.log("Course deleted successfully");
      } else {
        // Handle error response from the server
        console.error("Failed to delete course");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.imageLink} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.courseName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          variant="text"
          onClick={() => navigate("/admin_updateCourse")}
        >
          Update
        </Button>
        <Button 
          size="small" 
          variant="text" 
          onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Course_card_admin;
