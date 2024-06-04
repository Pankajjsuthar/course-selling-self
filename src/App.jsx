import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Admin from "./components/admin_dashboard";
import AddCourseForm from "./components/addCourse";
import User_landing from "./components/user_landing_page";
import UpdateCourseForm from "./components/updateCourse";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { userState } from "./store/atoms/user.js";
import {
    RecoilRoot,
    useSetRecoilState
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
        <InitUser/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin_dashboard" element={<Admin/>}/>
          <Route path="/addcourse" element={<AddCourseForm/>}/>
          <Route path="/user_courses" element={<User_landing/>}/>
          <Route path="/admin_updateCourse" element={<UpdateCourseForm/>}/>
          
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async() => {
      try {
          const response = await axios.get("http://localhost:3000/user/me", {
              headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token")
              }
          })

          if (response.data.username) {
              setUser({
                  isLoading: false,
                  userEmail: response.data.username
              })
          } else {
              setUser({
                  isLoading: false,
                  userEmail: null
              })
          }
      } catch (e) {

          setUser({
              isLoading: false,
              userEmail: null
          })
      }
  };

  useEffect(() => {
      init();
  }, []);

  return <></>
}

export default App;
