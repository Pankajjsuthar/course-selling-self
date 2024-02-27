import React from "react";
import axios from "axios";
import CourseCard from "./course_card_admin";
import { Typography,Button } from "@mui/material";
import { useState, useEffect } from "react";
import AddCourseForm from "./addCourse";
import { useNavigate } from "react-router-dom";

const Admin_description = (props) => {
  return (
    <div className="desc" style={{ width: "60%", margin: "50px" }}>
      <h2>{props.firstName}</h2>
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

const Course_cards_list = async (props) => {
  const JWTtoken = props.token;
  console.log("JWTtoken");
  console.log(JWTtoken);
  try {
    const response = await axios.get("http://localhost:3000/admin/courses", {
      headers: {
        Authorization: `Bearer ${JWTtoken}`, // Set the Authorization header
      },
    });

    // Check if the response data exists and is an array
    if (Array.isArray(response.data)) {
      return response.data.map((course, index) => (
        <CourseCard
          key={index} // Don't forget to provide a unique key when iterating over an array in React
          imageLink={course.imageLink}
          courseName={course.courseName}
          description={course.description}
        />
      ));
    } else {
      console.error("Response data is not an array:", response.data);
      return null; // Return null if response data is not an array
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return null; // Return null if an error occurs
  }
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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Admin_image
          imageLink={
            "https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
        />
        <Admin_description
          firstName={"Hello dosto"}
          about={
            "You can then use this CourseCard component in your admin panel to display courses. Each course card can be passed the necessary details through props. For example:"
          }
        />
      </div>
      <div style={{
        display:"flex",

      }}>
        <Typography variant="h4" align="center">
          Your Courses
        </Typography>
        <Button variant="text" size="small" onClick={()=>{
          navigate("/addcourse");
        }}>
          Add Course
        </Button>
      </div>
      <div style={{ margin: "30px" }}>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              imageLink={course.imageLink}
              courseName={course.courseName}
              description={course.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Admin_dashboard;
