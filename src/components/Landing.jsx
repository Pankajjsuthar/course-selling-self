import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import landing_image from "../images/landing_page.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-500">
      <img
        src={landing_image}
        alt="landing"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex h-[200px] items-start max-w-screen-lg  px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-6xl font-extrabold text-gray-900 mr-4">
            COURSITE
          </h1>
        </div>
        <div className="h-full w-full flex  items-center">
          <h2 className="text-4xl font-semibold flex justify-center text-gray-700 ml-5">
            Your journey starts here.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Landing;
