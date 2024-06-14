import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  // Function to handle user login/logout
  const logOut = () => {
    sessionStorage.setItem("jwtToken", null);
    setUser({
      isLoading: false,
      userEmail: null,
    });
    navigate("/login");
  };

  if (userLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (userEmail) {
    return (
      <div className="bg-[#6741f3] w-full flex justify-center pb-4">
        <div className="flex justify-between items-center py-4 px-5 w-11/12">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2 text-white">Coursite</h1>
            <p className="text-lg text-white">Sell and Buy Courses</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-xl"
              onClick={() => {
                navigate("/cart");
              }}
            >
              🛒
            </button>
            <div className="relative">
              <button
                className="text-xl"
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                👤
              </button>
              {open && (
                <div
                  id="user-menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20"
                >
                  <button
                    onClick={handleClose}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={logOut}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#6741f3] w-full flex justify-center ">
        <div className="flex justify-between items-center py-4 px-5 w-11/12">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-2 text-white">Coursite</h1>
            <p className="text-lg text-white">Sell and Buy Courses</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
