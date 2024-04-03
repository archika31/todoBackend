import express from 'express'
import { isAuthenticated } from '../middleware/auth.js';
import { registerUser,loginUser, userProfile, logout } from '../controllers/user.js';

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Working")
})
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",isAuthenticated,userProfile)
router.get("/logout",logout)
 

export default router