import React, { useState } from "react";
import axios from "axios";
import signupimg from "../images/signup.jpg"
import {
  Button,
  Typography,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    isAdmin: false,
  });

  const [user,setUser] = useRecoilState(userState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isAdmin: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );
      console.log(formData);
      if (response.status === 200) {
        console.log("Login successful.");
        sessionStorage.setItem("jwtToken", response.data.token);
        setUser({
          isLoading : false,
          userEmail : formData.emailId
        })
        if (formData.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/user_courses");
        }
      } else {
        console.log("Error");
      }
    } catch {
      console.error("Error while logging up:", error.message);
    }
  };

  const navigate = useNavigate();

  
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-500">
      <img
        src={signupimg}
        alt="landing"
        className="absolute inset-0 w-full h-full object-cover"
      />
  <div className="w-full z-10 max-w-sm bg-[#FFFFF9] rounded-lg shadow-lg p-6">
    <h5 className="text-center text-xl font-bold mb-6">Log In</h5>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          required
          value={formData.emailId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isAdmin}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Are you an admin?</span>
        </label>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Log In
        </button>
      </div>
    </form>
    <p className="text-center text-sm text-gray-700 mt-4">
      Don't have an account?{" "}
      <button
        className="text-blue-600 hover:underline"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </button>
    </p>
  </div>
</div>

  );
};

export default Login;
