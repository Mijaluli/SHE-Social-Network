const express= require ("express");
const router= express.Router();
const mongoose = require ('mongoose')
const User= mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const {JWT_SECRET} = require ('../valueKeys')
const requireLogin=require('../middleware/requireLogin')

router.post("/signup",(req,res)=>{  
    const {name, email,password}=req.body
    if(!name || !email ||!password)
        return res.status(422).json ({error:"Please fill the missing information"})

    User.findOne({email:email}).then((savedUser)=>{
        if (savedUser){
            return res.status(422).json ({error:"User already exists"})
        }
        bcrypt.hash(password,12).then(hashedPassword=>
            {
                const user=new User ({
                    name,
                    email,
                    password:hashedPassword
                })
                user.save().then(user=>{
                    res.json({message:"New user saved successfully"})
                })
                .catch(err=>{
                    console.log(err);
                })
            })
    }) .catch(err=>
        console.log(err)
    )
})

router.post("/login",(req,res)=>{  
    const {email,password}=req.body;
    if(!email ||!password){
        return res.status(422).json ({error:"Please fill the missing information"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if (!savedUser){
            return res.status(422).json ({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //successfully logged in
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id,name,email}=savedUser
                res.json ({token,user:{_id,name,email}})
            }
            else 
                return res.status(422).json ({error:"Invalid email or password"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

router.get("/protected",requireLogin,(req,res)=>{
    res.send("Hello Protected")
})
module.exports=router;