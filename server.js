import  express  from "express";
import connectDB from './config/dbConnection.js'
import userrouter from "./routes/userRoutes.js";
import taskrouter from "./routes/taskRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middleware/error.js";
import cors from "cors"
import cron from 'node-cron';


dotenv.config();
const app=express();
//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true,//necessary to send cookies

}))
app.use(userrouter);
app.use("/user",taskrouter);
app.use(errorMiddleware);


connectDB;



const port=process.env.PORT ||5001
app.listen(port,()=>{
    console.log("server is working")
})