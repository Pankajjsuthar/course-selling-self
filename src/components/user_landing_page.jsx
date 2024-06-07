import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userlandingimage from "../images/user_dashboard.jpg";

const TruncatedDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = description.split(" ");
  const truncatedWords = isExpanded ? words : words.slice(0, 10);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="text-black">
        {truncatedWords.join(" ")}
        {!isExpanded && words.length > 10 && " ..."}
      </p>
      {words.length > 10 && (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={handleReadMore}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

const CourseCardUser = (props) => {
  return (
    <div className="bg-[#fffefe] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={props.imageLink}
        alt={props.courseName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-black">
            {props.courseName}
          </h3>
          <span className="text-black">{props.duration}</span>
        </div>
        <TruncatedDescription description={props.description} />
        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded-md bg-[#F1D4E5] text-black hover:bg-[#FFF4E0] transition-colors duration-300"
              onClick={props.onClick}
            >
              Add To Cart
            </button>
            <button className="px-4 py-2 rounded-md bg-[#F1D4E5] text-black hover:bg-[#FFF4E0] transition-colors duration-300">
              Buy Now
            </button>
          </div>
          <span className="text-black font-bold">${props.price}</span>
        </div>
      </div>
    </div>
  );
};

const UserLanding = () => {
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
    <div className="container mx-auto p-4 flex flex-col">
      <div className="h-[90vh]">
        <img
          src={userlandingimage}
          alt="landing"
          className="w-full h-full object-cover"
        />
      </div>
      <hr className="mb-8" />
      <hr className="mb-8" />
      <div className="flex flex-wrap mx-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
          >
            <CourseCardUser
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

export default UserLanding;
