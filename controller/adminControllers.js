const Admin=require('../models/adminschema');
const User=require('../models/userschema');
const Food=require('../models/foodschema');
const Order=require('../models/orderschema');
const path = require('path');
const fs = require('fs')

module.exports.addFood=async (req,res)=>{
    const foodData=JSON.parse(req.body.data)
    const { name ,price} =foodData;
    console.log(foodData);
    const imgname=req.imgname;
    const findFood = await Food.findOne({name:name})
    if(findFood){
        return  res.status(200).json({message:'name already exist'})
    }
    const newfood=new Food({
                    name:name,
                    imgname:imgname,
                    price:price,
                })
                 newfood.save()
                     .then(info=>{
        res.status(200).json({message:'success'})
    })
   .catch(err=>{
    res.status(200).json({message:'add food fail'})
   })

    
}
module.exports.editFood=(req,res)=>{
    const { name ,price} =req.body.data;
    const foodId=req.body.id
    // const imgname=req.imgname
    
    Food.findOne({_id:foodId})
    .then(data=>{
        if(!data){
          return  res.status(200).json({message:'no data 1'})
        }
        data.name=name;
        // data.imgname=imgname;
        data.price=price;

       data.save()
       .then(info=>{
           res.status(200).json({message:'success',data:data})
       }
       )
       .catch(err=>{
        res.status(200).json({message:'no data 2'})
       })
    })
    .catch(err=>{
        res.status(200).json({message:'no data'})
    })
}

module.exports.deleteFood=(req,res)=>{
    const foodId=req.query.id;
    console.log(foodId);
    Food.findByIdAndDelete(foodId)
    .then(data=>{
        if(!data){
           return res.status(200).json({message:'no data 1'})
        }
        const imgPath = path.join(__dirname,'uploads',data.imgname);
        fs.unlink(imgPath,(err)=>{
            console.log(err);
        });
        
        res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'no data'})
    })
}

module.exports.closeOrder=(req,res)=>{
    const {id} =req.query;
    Order.findByIdAndUpdate({_id:id},{isTrue:{$set:true}})
    .then(info=>{
        res.status(200).json({message:'success'})
    })
    .catch(err=>{
        res.status(200).json({message:'error'})
    })

}
