const mongoose= require('mongoose');

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=new mongoose.model('Food',foodSchema)