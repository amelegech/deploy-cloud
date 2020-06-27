const express = require('express');
const bodyParser = require('body-parser');
const mongoos = require('mongoose');
const cors= require('cors');
const userLoginRoute = require('./router/login');
const userSignupRoute = require('./router/signup');
//const restaurantRoute = require('./router/restaurant');




const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//router 
app.use(userLoginRoute);
app.use(userSignupRoute);
//app.use(restaurantRoute);


 
const port = process.env.PORT ||  2020;
mongoos.connect('mongodb://localhost:27017/My_JWT',{
    useNewUrlParser:true, useUnifiedTopology:true
} ).then(()=>{
    console.log('Mongodb is connected')
    app.listen(port, ()=>{
        console.log(`Server is working on port: ${port}`)
    })
}).catch((err)=>{
    console.log('error')
})
