const cors = require('cors');

require('dotenv').config();
const httpStatusText= require('./utils/httpStatusText')
const { statusText } = require('./utils/appError');
const express=require('express');
const app=express();
const path=require('path')

app.use('/upload',express.static(path.join(__dirname,'upload')));
const mongoose = require('mongoose');
const url=process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log("MongoDB server start");
})
app.use(cors());
app.use(express.json())

const coursesRouter=require('./routes/courses.route');
const userRouter=require('./routes/user.route');

app.use('/api/courses',coursesRouter) //localhost / =>api/courses
app.use('/api/users',userRouter)// /api/users

// global middleware for not found router
app.all('*',(req , res , next)=>{

    return res.status(404).json({status: httpStatusText.ERROR , message :'this resource is  unavailable'})
})

//global error handler
app.use((error,req,res,next)=>{
    res.status(error.statusCode ||500 ).json({status:error.statusText ||httpStatusText.ERROR , message:error.message , code : error.statusCode || 500 , data: null})
})

app.listen(process.env.PORT || 4000,"0.0.0.0",()=>{
    console.log("listening on port 5000")
})
