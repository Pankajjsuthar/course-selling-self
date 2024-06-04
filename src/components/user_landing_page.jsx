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

const TruncatedDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = description.split(" ");
  const truncatedWords = isExpanded ? words : words.slice(0, 10);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Typography variant="body2" color="text.secondary">
        {truncatedWords.join(" ")}
        {!isExpanded && words.length > 10 && " ..."}
      </Typography>
      {words.length > 10 && (
        <Button size="small" onClick={handleReadMore}>
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
};

const Course_card_user = (props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={props.imageLink}
        alt={props.courseName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{props.courseName}</h3>
          <span className="text-gray-600">{props.duration}</span>
        </div>
        <TruncatedDescription description={props.description} />
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
              onClick={props.onClick}
            >
              Add To Cart
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
              Buy Now
            </button>
          </div>
          <span className="text-gray-800 font-bold">${props.price}</span>
        </div>
      </div>
    </div>
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
    <div className="flex flex-wrap justify-center mx-4">
      {courses.map((course, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
          <Course_card_user
            imageLink={course.imageLink}
            courseName={course.courseName}
            description={course.description}
            price={course.price}
            duration={course.duration}
            onClick={() => navigate(`/course/${course.id}`)}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default User_landing;
