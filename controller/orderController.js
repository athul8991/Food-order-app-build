const Order=require('../models/orderschema');
module.exports.getAllOrder=(req,res)=>{
    const {userId,orderId}=req.query;
    
    Order.find().populate([
        {path:'userId',model:'User',select:['username','mobile','address']},
        {path:'orders.foodId',model:'Food'}
    ]).then(data=>{
        if(data.length <= 0){
          return  res.status(200).json({message:'error 1'})
        }
        res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'error'})
    })
}
module.exports.getOrder=(req,res)=>{
    const userId= req.userData.userId;
    Order.findOne({userId:userId})
    .populate({path:'orders.foodId',model:'Food'})
    .then(data=>{
        console.log(data);
        res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'error'})
    })
}


