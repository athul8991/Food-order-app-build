const jwt=require('jsonwebtoken')
const Admin=require('../models/adminschema');
const User=require('../models/userschema')
const bcrypt=require('bcrypt')

///////////////////////////Admin////////////////////////
module.exports.adminRegister=(req,res)=>{
    const {email,username,password}=req.body;
    console.log(req.body);
    bcrypt.hash(password,10)
    .then(hash=>{
        if(!hash){
            return res.status(200).json({message:'fail admin reg'})
        }
        const newAdmin=new Admin ({
            email:email,
            username:username,
            password:hash
        })
        return newAdmin.save()
    })
    .then(info=>{
        res.status(200).json({message:'success admin reg'})
    })
    .catch(err=>{
        res.status(200).json({message:'error'})
    })
}

module.exports.adminLogin=(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    Admin.findOne({email:email})
    .then(data=>{
        if(!data){
          return  res.status(200).json({message:'login fail 2'})
        }
        bcrypt.compare(password,data.password)
        .then(info=>{
            if(!info){
              return  res.status(200).json({message:'login fail 4'})
            }
            jwt.sign({name:data.username,adminId:data._id,isAdmin:true},'iamadmin',(err,token)=>{
                if(err){
                    console.log(err);
                    return res.status(200).json({message:'login fail 5'})
                }
                return res.status(200).json({message:'success',token:token})
            })

        })
        .catch(err=>{
            res.status(200).json({message:'login fail 3'})
        })
    })
    .catch(err=>{
        res.status(200).json({message:'login fail 1'})
    })
}

///////////////////////////User////////////////////////

module.exports.userRegister=(req,res)=>{
    const{username,mobile,password,address,email} =req.body;
    console.log(req.body);
    User.findOne({mobile:mobile})
    .then(data=>{
        if(data){
          return  res.status(200).json({message:'already a user'})
        }
        bcrypt.hash(password,10)
        .then(hash=>{
            if(!hash){
                return  res.status(200).json({message:'register fail 3'})
            }
            const newUser=new User({
                username:username,
                mobile:mobile,
                email:email,
                password:hash,
                address:address
            })
            return newUser.save();
        })
        .then(info=>{
            res.status(200).json({message:'success'})
        })
        .catch(err=>{
            console.log(err);
            res.status(200).json({message:'register fail 2'})
        })
    })
    .catch(err=>{
        res.status(200).json({message:'register fail 1'})
    })
}

module.exports.userLogin=(req,res)=>{
    const {email ,password}=req.body;
    console.log(req.body);
    User.findOne({email})
    .then(data=>{
        if(!data){
          return  res.status(200).json({message:'no user exist'})
        }
        bcrypt.compare(password,data.password)
        .then(info=>{
            if(!info){
                return res.status(200).json({message:'login fail 3'})
            }
            jwt.sign({userId:data._id,isUser:true},'iamuser',(err,token)=>{
                if(err){
                    return  res.status(200).json({message:'login fail 4'})
                }
                return res.status(200).json({message:'success',token:token,username:data.username})
            })
        })
        .catch(err=>{
            res.status(200).json({message:'login fail 2'})
        })
    })
    .catch(err=>{
        res.status(200).json({message:'login fail 1'})
    })

}