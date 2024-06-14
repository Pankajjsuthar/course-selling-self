import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./course_card_admin";
import AddCourseDialog from "./addCourse";
import { useNavigate } from "react-router-dom";

const AdminDescription = (props) => {
  return (
    <div className="w-4/5 mx-12 my-12">
      <h2 className="text-2xl font-bold mb-4">{props.firstName}</h2>
      <hr className="mb-4" />
      <p className="text-base">{props.about}</p>
    </div>
  );
};

const AdminImage = (props) => {
  return (
    <div className="w-full mx-auto">
      <img
        src={props.imageLink}
        alt="Placeholder"
        className="w-72 h-72 rounded-3xl m-8 mx-auto"
      />
    </div>
  );
};

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async ()=> {
      
    }
    const fetchCourses = async () => {
      try {
        const jwtToken = sessionStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:3000/admin/courses", {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Set the Authorization header
          },
        });
        setCourses(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mb-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <AdminImage
            imageLink={
              "https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
          />
        </div>
        <div className="md:w-2/3">
          <AdminDescription
            firstName={"Hello dosto"}
            about={
              "You can then use this CourseCard component in your admin panel to display courses. Each course card can be passed the necessary details through props. For example:"
            }
          />
        </div>
      </div>
      <hr className="mb-8" />
      <div className="flex justify-between items-center mb-8 mx-7">
        <h4 className="text-2xl font-bold text-center">Your Courses</h4>
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

export default AdminDashboard;
