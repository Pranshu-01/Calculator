const express=require('express');
const app=express();
const port=8080;
const authRoute=require('./routes/auth');
const historyRoute=require('./routes/history');

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const cors=require('cors');

app.use(cors({
    origin:'*',  
}));

const dotenv=require('dotenv');
dotenv.config();

const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Datebase Connected Successfully');
})
.catch((err)=>{
    console.log(err);
})


app.use('/api/auth',authRoute);
app.use('/api/history',historyRoute);


app.listen(process.env.PORT || port,()=>{
    console.log(`Server Running at port ${port}`);
})