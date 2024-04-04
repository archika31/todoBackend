import mongoose from "mongoose";

const connectDB = ()=>{
   mongoose.connect(process.env.CONNECTION_STRING).then((c)=>{
    console.log(`database connected with ${c.connection.host}`)
   })
    .catch((err)=>{
        console.log(err)
    })}

export default connectDB;
