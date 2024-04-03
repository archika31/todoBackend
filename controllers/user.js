import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/cookie.js";

export const registerUser=(async(req,res)=>{
try{
 const {username,email,password}=req.body;
 //checking if user is already registered
 const userAvailable=await User.findOne({email})
 if(userAvailable){
   res.status(404).json({
    success:false,
    message:"user already registered"
   })
 }
 //encrypting password
 const hashedPassword=await bcrypt.hash(password,10)
   const user= await User.create({
    username,email,password:hashedPassword
})
//cookie and token generation 
 sendCookie(res,user,"user successfully registered",201);
}
catch(err){
    next(err);
}
})

export const loginUser=(async(req,res)=>{
    try{
    const {email,password}=req.body;
    //checking whether the email is registered
    const user=await User.findOne({email});
    
    if(!user){
       return res.status(404).json({
           message:"User not registered"
       })
    }
       const isMatch=await bcrypt.compare(password,user.password);
       if(!isMatch){
           return res.status(404).json({
               message:"Invalid Passord"
           })
       }  
       sendCookie(res,user,`${user.username} successfully login`,201)
    }
    catch(err){
        next(err);
    }
    
   })

export const userProfile=(async(req,res)=>{
    try{
    res.status(200).json({
        success:true,
        user:req.user
    })
   }
   catch(err){
    next(err);
   }

   })

export const logout=(async(req,res)=>{
    try{
    res.status(201).cookie("token","",{expires:new Date(Date.now()),
        //sameSite: process.env.NODE_ENV=== "development" ? 'lax' :"none",
        //secure:process.env.NODE_ENV ==="development" ? "false" :"true"
    }).json({
        success:true,
        message:"User get successfully logout"
    
    })
  }
  catch(err){
    next(err);
  }

})