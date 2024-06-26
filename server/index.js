import express from 'express';
import mongoose from 'mongoose';
import roleRouter from './routes/role.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import bookRouter from './routes/book.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { seedBooksData } from './seed.js';

dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true,
}));

const connectionMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
       if(process.argv.includes("--seed")){
         await seedBooksData();
       }
        console.log("DB Connection SuccessFul");
    }
    catch (error){
        console.log(error);
    }
} 
app.listen(3000,()=>{
    connectionMongoDB();
    console.log("Connected to Backend");
})

app.use('/api/role', roleRouter);
app.use("/api/auth", authRouter);
app.use('/api/admin', userRouter);
app.use('/api/book', bookRouter);
//Error Handler MiddleWare 

app.use((obj,req,res,next)=>{
    const statusCode = obj.status || 500;
    const message  = obj.message || "Something went wrong";

    return res.status(statusCode).json({
        success:[200,201,204].some(a => a === obj.status)?true:false,
        status:statusCode,
        message:message,
        data :obj.data,
        
    });
})

app.use('/',(req,res)=>{
    return res.send("<h1>Hello Auth<h1>");
})

