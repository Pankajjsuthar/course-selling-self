const mongoose = require("mongoose");

const userSchema= {
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    emailId : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}

const User = mongoose.model("User", userSchema);

module.exports = {User};