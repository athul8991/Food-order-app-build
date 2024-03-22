require('dotenv').config();
require('./conn');
const express = require('express');
const multer=require('multer')
const bodyParser=require('body-parser');
const cors=require('cors');
const path = require('path')

const port=8000;
const app =express();

const adminRoute=require('./routes/adminRoutes')
const userRoute=require('./routes/userRoutes')
const foodRoute=require('./routes/foodRoutes')
const orderRoute=require('./routes/orderRoutes');
const { log } = require('console');

app.use(cors())
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'dist/')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('uploads'));




app.use('/api/admin',adminRoute)
app.use('/api/user',userRoute)

app.use('/api/food',foodRoute);
app.use('/api/order',orderRoute)

app.use('*',(req,res)=>{
    log(__dirname)
    res.sendFile(path.join(__dirname,'./dist/index.html'))
})

app.listen(port,()=>{
    console.log(`server start at the port ${port}`);
})