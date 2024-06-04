import React from "react";
import axios from "axios";
import UpdateCourseDialog from "./updateCourse";

const Course_card_admin = (props) => {
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

  const courseData = {
    _id: props.courseId,
    courseName: props.courseName,
    description: props.description,
    price: props.price,
    duration: props.duration,
    imageLink: props.imageLink,
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={props.imageLink}
        alt={props.courseName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{props.courseName}</h3>
        <p className="text-gray-700 mb-4">{props.description}</p>
        <div className="flex justify-between items-center">
          <UpdateCourseDialog course={courseData} />
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course_card_admin;