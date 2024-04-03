import mongoose from "mongoose";

const connectDB=mongoose.connect("mongodb://0.0.0.0:27017/ToDo").then(()=>{
    console.log("database connection")
}).catch((err)=>{
    console.log(err)
})

export default connectDB;
