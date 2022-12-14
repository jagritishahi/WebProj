const jwt=require("jsonwebtoken");
const User=require("../model/userSchema");
//require("../db/conn")
const express=require("express")
const app=express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const Authenticate=async(req,res,next)=>{
try {
    const token=req.cookies.jwtoken
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens:token":token});
    if(!rootUser)
    {throw new Error("User not found");}

    req.token=token;
    req.rootUser=rootUser;
    req.userId=rootUser._id;
    next();
} catch (error) {
    
    res.status(401).send("Unauthorized: No token provided")
    console.log(error);
}
}
module.exports=Authenticate;