const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const PORT = 3000;
const mongoose = require("mongoose");
const cookie = require("cookie");
const { authenticatejwt } = require("./middleware/auth");
app.use(cors());
app.use(express.json());

const { Admin } = require("./models/Admin.jsx");
const { Courses } = require("./models/Course.jsx");
const { User } = require("./models/User.jsx");
const { secretKey } = require("./middleware/auth.js");
const Course = require("./models/Course.jsx");

connectDB();

app.post("/user/login", async (req, res) => {
  const { emailId, password, isAdmin } = req.body;
  if (isAdmin) {
    Admin.findOne({ emailId, password }).then((admin) => {
      if (admin) {
        const token = jwt.sign(
          { emailId: emailId, password: password },
          secretKey,
          { expiresIn: "1hr" }
        );
        const jwtCookie = cookie.serialize("jwt", token, {
          httpOnly: true, // Prevent client-side access
          maxAge: 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 hour in this example)
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          path: "/", // Specify the path for which the cookie is valid
        });

        res
          .setHeader("Set-Cookie", jwtCookie)
          .cookie("jwt-tok", token)
          .status(200)
          .json({ message: "Admin logged in successfully.", token });
      } else {
        res.sendStatus(405).json({ message: "Admin didn't exist." });
      }
    });
  } else {
    User.findOne({ emailId, password }).then((User) => {
      if (User) {
        const token = jwt.sign(
          { emailId: emailId, password: password },
          secretKey,
          { expiresIn: "1hr" }
        );
        const jwtCookie = cookie.serialize("jwt", token, {
          httpOnly: true, // Prevent client-side access
          maxAge: 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 hour in this example)
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          path: "/", // Specify the path for which the cookie is valid
        });

        // Set the cookie in the response
        res
          .setHeader("Set-Cookie", jwtCookie)
          .cookie("jwt-tok", token)
          .status(200)
          .json({ message: "User logged in successfully.", token });
      } else {
        res.sendStatus(405).json({ message: "User didn't exist." });
      }
    });
  }
});

app.post("/user/signup", async (req, res) => {
  const { emailId, password, firstName, lastName, phoneNo } = req.body;
  User.findOne({ emailId }).then((user) => {
    if (user) {
      res.sendStatus(405).json({ message: "User already exists." });
    } else {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        emailId: emailId,
        password: password,
      };
      const newUser = new User(obj);
      newUser.save();
      res.status(200).json({ message: "User created successfully." });
    }
  });
});

app.post("/admin/signup", async (req, res) => {
  const { emailId, password, firstName, lastName, phoneNo } = req.body;
  Admin.findOne({ emailId }).then((admin) => {
    if (admin) {
      res.sendStatus(405).json({ message: "Admin already exists." });
    } else {
      const obj = {
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        emailId: emailId,
        password: password,
        about: firstName,
      };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      res.status(200).json({ message: "Admin created successfully." });
    }
  });
});

app.get("/admin/courses", authenticatejwt, async (req, res) => {
  const { emailId, password } = req.user;
  try {
    const admin = await Admin.findOne({ emailId, password }).populate(
      "courses"
    );
    if (admin) {
      res.status(200).json(admin.courses);
    } else {
      res.status(403).json({ message: "No courses added yet." });
    }
  } catch (error) {
    console.error("Error fetching admin and courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/admin/newCourse", authenticatejwt, async (req, res) => {
  const { courseName, description, price, duration, imageLink } = req.body;
  console.log(req.body);
  const { emailId } = req.user;

  try {
      // Check if the course name already exists
      const existingCourse = await Course.findOne({ courseName });

      if (existingCourse) {
          return res.status(403).json({ message: "Course name is already taken. CHANGE NAME OF YOUR COURSE!" });
      }

      // Create a new course
      const newCourse = new Course({
          courseName,
          description,
          price,
          duration,
          imageLink
      });

      // Save the new course
      await newCourse.save();

      // Find the admin and push the new course to admin's courses
      const admin = await Admin.findOne({ emailId });
      admin.courses.push(newCourse);
      await admin.save();

      return res.status(200).json({ message: "Course created successfully." });
  } catch (error) {
      console.error("Error creating new course:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server started at port no. 3000.");
});
