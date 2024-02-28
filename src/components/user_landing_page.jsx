import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./course_card_admin";
import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
            <CourseCard
              imageLink={course.imageLink}
              courseName={course.courseName}
              description={course.description}
              onClick={() => navigate(`/course/${course.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default User_landing;
