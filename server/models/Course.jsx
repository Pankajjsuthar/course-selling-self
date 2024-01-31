const mongoose = require("mongoose");

const courseSchema = {
    courseName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    duration : {
        type : String,// in hours like 5.5 hours, 
        required : true,
    },
    imageLink : {
        type : String,
        required : true,
    }
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;