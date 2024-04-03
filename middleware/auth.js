import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const isAuthenticated=(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(201).json({
            success:false,
            message:"login first"
        })
    }
    const decoded= jwt.verify(token,process.env.SECRET_TOKEN);
    const user=await User.findById(decoded._id)
    req.user=user;
    next();
}
)