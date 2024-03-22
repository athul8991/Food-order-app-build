const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orders:[
       { foodId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Food'
        },
        quantity:{
            type:Number,
            required:true
        }
    }
    ],
    isTrue:Boolean
    
   
})

module.exports=new mongoose.model('Orders',orderSchema)