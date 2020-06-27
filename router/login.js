const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const User = require('../model/user.model');
const jwt =require('jsonwebtoken');


const secret = 'my_ JWT_Secrate';

const myVerifier = async(req,res,next)=>{
   console.log(req.headers)
   let token = req.headers.authorization;
   if(!token){
       return res.json({status:'error', data: " user is not authorized"})
   }
   try {
    let decoded = jwt.verify(token, "secret")
let user = await User.findOne({_id:decoded.id});
req.user= user
    next()
    console.log('user Data after decoded:', decoded)  
   } catch (error) {
    return res.json({status:'error', data:"user not authorized"})
       
   }
}

/*const authorize =(...role)=>{
   return (req,res,next)=>{
   if(role.includes(req.user.role)){ //(user,admin)
       return next();

   }
   return res.json({status:'error', data:" user role is not authenticated to use this route"})
   }
}*/

router.post('/api/login',  async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email || !password){
       return res.json({status:'error', data:'please enter valid email or password'}) 
    }
     let user = await User.findOne({email:email})
     if(!user || password!==user.password){
        return res.json({status:'error', data:'invalid credential'}) 
     }
  // start use JWT to get Token
 let token = await jwt.sign({id:user._id}, 'MyJWTSecret')
 res.status(200).json({token: token})
 console.log("Token from login", token)
})
module.exports = router;