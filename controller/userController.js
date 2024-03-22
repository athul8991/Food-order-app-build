const User=require('../models/userschema');
const Food=require('../models/foodschema');
const Order=require('../models/orderschema');

module.exports.cart=(req,res)=>{
    const {idArray}=req.body;
    Food.find({_id:{$in:idArray}})
    .then(data=>{
        if(!data|| data.length === 0){
           return res.status(200).json({message:'no items '}) 
        }
        return res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'no cart 1'})
    })
}
module.exports.addOrder=async(req,res)=>{
    const orders=req.body
   const userId=req.userData.userId;
   console.log(req.body);
   const findData=await Order.findOne({userId:userId})
   if(findData){
    findData.orders=[...findData.orders,...orders]
    findData.save()
    .then(info=>{
        return res.status(200).json({message:'success',data:info})
    })
    .catch(err=>{
        console.log(err);
    })
   }
   else{

       const newOrder=new Order({
        userId:userId,
        orders:orders,
        isTrue:false
       })
       newOrder.save()
       .then(info=>{
        return res.status(200).json({message:'success',data:info})
       })
       .catch(err=>{
        res.status(200).json({message:'error'})
    })
   }

}
