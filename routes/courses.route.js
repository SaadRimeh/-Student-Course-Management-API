const express = require('express');
const {body}= require('express-validator')
const verfiyToken=require('../middleware/verfiyToken')
const router = express.Router();
const allowedTo = require('../middleware/allowedTo');

const coursesController = require('../controllers/courses.controllers');
const userRole = require('../utils/userRoles');

router.route('/')
.get(coursesController.getAllCourse)
.post(
    [
     body('title')
        .notEmpty()
        .withMessage("title is empty")
        .isLength({min : 2})
        .withMessage("title at least is 2 char") ,
        //body for price
     body('code')
        .notEmpty()
        .withMessage("price empty")
        .isLength({min : 2})
        .withMessage("price at least is 2 digit") ,
    body('hours')
        .notEmpty()
        .withMessage("hours empty")
        .isLength({min : 1})
        .withMessage("hours at least is 1 digit") ,
    body('hours')
        .notEmpty()
        .withMessage("hours empty")
        .isLength({min : 1})
        .withMessage("hours at least is 1 digit") ,

     body('pre')
        .notEmpty()
        .withMessage("pre empty")
    ],
    verfiyToken,allowedTo(userRole.MANGER),coursesController.createCourse )

router.route('/:courseId')
    .get(coursesController.getSingleCourse)
    .patch(coursesController.updateCourse)
    .delete(verfiyToken,allowedTo(userRole.ADMIN,userRole.MANGER),coursesController.deleteCourse)

module.exports=router;