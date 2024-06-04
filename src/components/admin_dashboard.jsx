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
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCourseDialog from "./addCourse";


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
          borderRadius: "50%",
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
  <div className="flex flex-col md:flex-row mb-8">
    <div className="md:w-1/3 mb-4 md:mb-0">
      <Admin_image
        imageLink={
          "https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
      />
    </div>
    <div className="md:w-2/3">
      <Admin_description
        firstName={"Hello dosto"}
        about={
          "You can then use this CourseCard component in your admin panel to display courses. Each course card can be passed the necessary details through props. For example:"
        }
      />
    </div>
  </div>
  <hr className="mb-8" />
  <div className="flex justify-between items-center mb-8 mx-7">
    <Typography variant="h4" align="center">
      Your Courses
    </Typography>
    <AddCourseDialog />
  </div>
  <div className="flex flex-wrap mx-4">
    {courses.map((course, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
        <CourseCard
          courseId={course._id}
          imageLink={course.imageLink}
          courseName={course.courseName}
          description={course.description}
          price={course.price}
          duration={course.duration}
        />
      </div>
    ))}
  </div>
</div>
  );
};

export default Admin_dashboard;
