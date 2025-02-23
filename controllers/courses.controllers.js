const {validationResult}= require('express-validator')

const Course = require('../models/course.model');
const httpStatusText= require('../utils/httpStatusText');
const asyncWrapper = require('../middleware/asyncWrapper');
const AppErorr=require('../utils/appError');
const appError = require('../utils/appError');


const getAllCourse=asyncWrapper( async (req,res)=>{
const query=req.query;
const limit =query.limit || 2;
const page = query.page || 1 ;
const skip = (page-1)*limit;
   const courses=await Course.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS , data:{courses}});
}
)


const getSingleCourse=asyncWrapper(
    async(req,res,next)=>{

        const course = await Course.findById(req.params.courseId);
        if(!course){

     const  error= appError.create('Not Found Course',404 ,httpStatusText.FAIL )
       return next (error);
        }
        res.json({status:httpStatusText.SUCCESS , data:{course}});

    }
)


const createCourse= asyncWrapper(
     async (req ,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){

         const error =appError.create(errors.array(),404,httpStatusText.FAIL);
         return next(error);
        // return res.status(400).json({status:httpStatusText.FAIL , data:errors.array()});
    }

  const newCourse = new Course(req.body);
 await newCourse.save();
    //201 Success  creating
    res.status(201).json({status:httpStatusText.SUCCESS, data:{newCourse}})
    }
)
const updateCourse=asyncWrapper(
     async (req,res,next)=>{
    const courseId = req.params.courseId;
        const updatedCourse=await Course.updateOne({_id:courseId},{$set:{...req.body}})
        if(!courseId){
            const error=appError.create("Course Not Found ",404,httpStatusText.FAIL);
            return next(error);
          //  return res.status(404).json({status:httpStatusText.FAIL , data:{courses:"Course Not Found "}})
        }
 return   res.status(200).json({status:httpStatusText.SUCCESS, data:{course:updatedCourse}});
    }

)

const deleteCourse=asyncWrapper( async(req , res,next)=>{
    const courseId=req.params.courseId;

    if(!courseId){
        const error=appError.create("Course Not Found ",404,httpStatusText.FAIL);
return next(error);
    }

    const data =  await Course.deleteOne({_id: courseId});
          return res.status(200).json({status:httpStatusText.SUCCESS , data:null});

})

module.exports={
    getAllCourse,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse,
}