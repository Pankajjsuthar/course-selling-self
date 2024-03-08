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

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar />
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

export default App;
