import jwt from 'jsonwebtoken'
export const sendCookie=((res,user,message,statusCode)=>{
    const token=jwt.sign({_id:user._id},process.env.SECRET_TOKEN,{expiresIn:'1h'});
    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:60*60*1000,
       // sameSite: process.env.NODE_ENV=== "development" ? 'lax' :"none",
        //secure:process.env.NODE_ENV ==="development" ? "false" :"true"
     }).json({
        success:true,
        message
     })
})