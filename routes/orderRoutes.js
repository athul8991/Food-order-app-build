const express= require('express');
const router=express.Router();

const orderController=require('../controller/orderController')
const verify=require('../middleware/verify')

router.get('/orders',verify.adminVerify,orderController.getAllOrder)
router.get('/order',verify.userVerify,orderController.getOrder)

module.exports=router