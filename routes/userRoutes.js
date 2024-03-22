const express=require('express');
const router=express.Router();

const authController=require('../controller/authController')
const userController=require('../controller/userController')
const verify=require('../middleware/verify')

router.get('/verify',verify.userVerify,
    (req,res)=>{
        res.status(200).json({message:'success'});
    })
router.post('/register',authController.userRegister);
router.post('/login',authController.userLogin)
router.post('/cart',verify.userVerify,userController.cart)
router.post('/order',verify.userVerify,userController.addOrder)


module.exports=router;