const multer =require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb)=>{
        const fileName=Date.now() + '-' + file.originalname
        req.imgname=fileName
        cb(null,fileName );

    }
})
const fileFilter=(req,file,cb)=>{
    
    if(file.mimetype ==='image/png'||
    file.mimetype ==='image/jpg'||
    file.mimetype ==='image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

module.exports.upload=multer({storage:storage,fileFilter:fileFilter})