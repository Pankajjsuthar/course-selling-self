import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Course_card_user = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={props.imageLink} />
      <CardContent style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <div>
          <Typography variant="h5" gutterBottom>
          {props.courseName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        </div>

        <Typography variant="body3" gutterBottom>
          {props.duration}
        </Typography>
      </CardContent>

      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button size="small" variant="text">
            Add To Cart
          </Button>
          <Button size="small" variant="text">
            Buy Now
          </Button>
        </div>

        <Typography variant="h6" gutterBottom>
          ${props.price}
        </Typography>
      </CardActions>
    </Card>
  );
};

const User_landing = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Available Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Course_card_user
              imageLink={course.imageLink}
              courseName={course.courseName}
              description={course.description}
              price={course.price}
              duration={course.duration}
              onClick={() => navigate(`/course/${course.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default User_landing;
