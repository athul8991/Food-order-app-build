const Food=require('../models/foodschema');

module.exports.getAllFood=(req,res)=>{
    Food.find()
    .then(data=>{
        if(!data){
            return  res.status(200).json({message:'no food 2'})
        }
       return res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'no food 1'})
    })

}
module.exports.getFood=(req,res)=>{
    const foodId =req.query.id
    Food.findOne({_id:foodId})
    .then(data=>{
        if(!data){
            return  res.status(200).json({message:'no food 2'})
        }
         res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        res.status(200).json({message:'no food 1'})
    })
}