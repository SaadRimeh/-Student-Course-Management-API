const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true,
   },
   hours:{
    type:Number,
    required: true
   },
   code:{
      type:String,
      required:true
   },
   pre:{
      type:[String],
      required:true
   }
})

module.exports=mongoose.model('Course',courseSchema)