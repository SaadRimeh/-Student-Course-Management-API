const express = require('express');
const router = express.Router();

 const multer=require('multer');
const diskStorage= multer.diskStorage({
    destination: function(req , file ,cb){
console.log("file",file)
cb(null,'upload')
    },
    filename:function(req , file ,cb){
        const ext=file.mimetype.split('/')[1];
        const fileName=`user-${Date.now()}.${ext}`
        cb(null,fileName)
    }

}
)
const fileFilter=(req,file , cb)=>{
    const imageType=file.mimetype.split('/')[0];
    if(imageType=='image'){
        return cb(null,true)
    }
    else{
        return cb(appError.create('the file must be an image',400) ,false);
    }
}

  const upload=  multer({storage:diskStorage,
    fileFilter:fileFilter

});





const usersController=require('../controllers/users.controllers')
const verifyToken=require('../middleware/verfiyToken');
const appError = require('../utils/appError');

//get all user
// register
//loginverifyToken,
router.route('/')
    .get(verifyToken,usersController.getAllUsers)

router.route('/register')
     .post(upload.single('avatar'),usersController.register)

router.route('/login')
    .post(usersController.login)

module.exports=router;