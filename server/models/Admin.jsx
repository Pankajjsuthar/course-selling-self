const mongoose = require("mongoose");

const adminSchema = {
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    emailId : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    about : {
        type : String,
    },
    courses : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = {Admin};