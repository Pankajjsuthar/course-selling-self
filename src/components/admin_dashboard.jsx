import React from "react";
import axios from "axios";
import CourseCard from "./course_card_admin";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin_description = (props) => {
  return (
    <div style={{ width: "80%", margin: "50px" }}>
      <h2>{props.firstName}</h2>
      <hr />
      <p>{props.about}</p>
    </div>
  );
};

const Admin_image = (props) => {
  return (
    <div className="img" style={{ width: "33%" }}>
      {/* Assuming the image is a placeholder */}
      <img
        src={props.imageLink}
        alt="Placeholder"
        style={{
          width: "350px",
          height: "350px",
          borderRadius: "20%",
          margin: "20px",
          marginLeft: "200px",
        }}
      />
    </div>
  );
};

const Admin_dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const jwtToken = sessionStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:3000/admin/courses",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
            },
          }
        );
        setCourses(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Admin_image
            imageLink={
              "https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          />
        </Grid>
        <Grid item md={8}>
          <Admin_description
            firstName={"Hello dosto"}
            about={
              "You can then use this CourseCard component in your admin panel to display courses. Each course card can be passed the necessary details through props. For example:"
            }
          />
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",
          display: "flex",
          "justify-content": "center",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 10px",
            width: "90vw",
          }}
        >
          <Typography variant="h4" align="center">
            Your Courses
          </Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              navigate("/addcourse");
            }}
          >
            Add Course
          </Button>
        </Box>
      </div>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <CourseCard
              courseId={course._id}
              imageLink={course.imageLink}
              courseName={course.courseName}
              description={course.description}
              price={course.price}
              duration={course.duration}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Admin_dashboard;
