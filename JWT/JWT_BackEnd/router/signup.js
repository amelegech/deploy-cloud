const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const User = require('../model/user.model');
const jwt =require('jsonwebtoken');

const secret = 'my_ JWT_Secrate';


router.post('/api/signup',async (req,res,next)=>{
   let token;
    const {name, email, password, role } = req.body;
    let user = await User.findOne({email:email});
    if(user){
       res.json({status:'error', msg: 'user is already exist'}) 
    } 
    else{
  let newUser =  await User.create({ 
        name:name, 
        email:email , 
        password:password, 
        role:role , 
        //date: Date.now()

        }) 
     token = jwt.sign({newUser: req.body}, secret)
     console.log("Token from new user",token);
     res.status(201).json({status:true, data:"New User Added"})
     
    }
    
    return token;
})



module.exports = router;