const mongoose = require("mongoose")

const db = "mongodb+srv://pankajsuthar27302:mongodb@cluster0.3zeabpo.mongodb.net/";

const connectDB = async()=>{
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected.");
    }
    catch{
        console.log("Failed to connect with MongoDB.");
    }
};

module.exports = connectDB;