const express =require('express');
const router=express.Router();

const authController=require('../controller/authController')
const verify=require('../middleware/verify')
const upload=require('../middleware/imgupload')
const admin=require('../controller/adminControllers')

router.get('/verify',verify.adminVerify,
    (req,res)=>{
        res.status(200).json({message:'success'});
    })
router.post('/register',authController.adminRegister);
router.post('/login',authController.adminLogin)
router.post('/upload',verify.adminVerify,upload.upload.single('file'),admin.addFood)
router.put('/update',verify.adminVerify,upload.upload.single('file'),admin.editFood)
router.delete('/delete',verify.adminVerify,admin.deleteFood)
router.put('/close-order',verify.adminVerify,admin.closeOrder)

module.exports=router;