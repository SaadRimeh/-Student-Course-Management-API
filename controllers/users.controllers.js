const asyncWrapper = require('../middleware/asyncWrapper');
const User=require('../models/user.models');
const appError = require('../utils/appError');
const httpStatusText=require('../utils/httpStatusText');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');



const getAllUsers=asyncWrapper( async (req,res)=>{

const query=req.query;
const limit =query.limit || 2;
const page = query.page || 1 ;
const skip = (page-1)*limit;

   const users=await User
   .find({},{"__v":false,'password':false}).limit(limit).skip(skip);

    res.json({status:httpStatusText.SUCCESS , data:{users}});
}
)


const register=asyncWrapper(async (req,res,next)=>{
    //console.log(req.body)

const {firstName ,lastName, email,password,role} = req.body;

const oldUser =await User.findOne({email:email})
if(oldUser){
    const error = appError.create('user already exists' , 400 , httpStatusText.FAIL)

    return next(error);
}

// password hashing
const hashPassword= await bcrypt.hash(password,10);

const newUser= new User({
    firstName,
    lastName,
    email,
    password:hashPassword,
    role,
    avatar:req.file.filename

})
// generate JWT token

const token=await generateJWT({email:newUser.email,id:newUser._id , role:newUser.role});
newUser.token=token;


await newUser.save();

return res.status(201)
.json({status : httpStatusText.SUCCESS , data:{user : newUser}})
})



const login=asyncWrapper(
    async(req,res,next)=>{
    const {email , password}=req.body
if(!email && !password){
    const error = appError.create('Email and password are required ' , 400 , httpStatusText.FAIL)

    return next(error);
}
const  user = await User.findOne({email:email});
if(!user){
    const error = appError.create('User not found ' , 404 , httpStatusText.ERROR)

    return next(error);
}
const matchedPassword=await bcrypt.compare(password,user.password)

if(user && matchedPassword){

    // logged ins successfully
const token=await generateJWT({email:user.email,id:user._id , role:user.role});
 return   res.json({status:httpStatusText.SUCCESS , data:{token}});

}
else{
    const error = appError.create('Email or password not correct ' , 500 , httpStatusText.ERROR)

    return next(error);
}
})

module.exports={
    getAllUsers,
    register,
    login
}