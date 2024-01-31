import React from "react";
import CourseCard from "./course_card_admin";
import { Typography } from "@mui/material";

const Admin_description = (props) => {
  return(
  <div className="desc" style={{ width: "60%", margin: "50px" }}>
    <h2>{props.firstName}</h2>
    <p>
      {props.about}
    </p>
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



const admin_dashboard = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", }}>
        <Admin_image imageLink = {"https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"}/>
        <Admin_description firstName = {"Hello dosto"} about = {"You can then use this CourseCard component in your admin panel to display courses. Each course card can be passed the necessary details through props. For example:"} />
      </div>
      <Typography variant="h4" align="center">
        Your Courses
      </Typography>
      <div
        style={{
          margin: "30px",
        }}
      >
        <CourseCard
          imageLink={
            "https://images.pexels.com/photos/2105416/pexels-photo-2105416.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          courseName={"System paad denge"}
          description={
            "We define a functional component CourseCard that accepts props: name, description, and imageLink.The component uses Material-UI's Card and CardContent components to structure the card layout."
          }
        />
      </div>
    </div>
  );
};

export default admin_dashboard;
