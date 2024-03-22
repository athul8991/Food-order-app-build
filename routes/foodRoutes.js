const express=require('express');
const router =express.Router();

const foodController=require('../controller/foodController')

router.get('/foods',foodController.getAllFood)
router.get('/food',foodController.getFood)

module.exports=router;