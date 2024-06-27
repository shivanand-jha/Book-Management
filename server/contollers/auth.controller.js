import Role from "../models/role.models.js"
import User from "../models/user.models.js"
import bcrypt from "bcryptjs";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import jwt from "jsonwebtoken";





export const register = async (req,res,next)=>{
    const role = await Role.find({role:'IronMan'});
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        email : req.body.email,
        password : (await hashPassword).toString(),
        roles : role
    });
    await newUser.save();
   return next(CreateSuccess(200,"User registerd Successfully"));
}






export const login = async(req,res,next)=>{
    try {
        const user  = await User.findOne({email:req.body.email})
        // .populate("roles","role");
        

        // const {roles} = user;
       
        if (!user) {
             
            return next(CreateError(404,"User not found"));

          }
          
        const isPasswordCorrect  = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect){
            return next(CreateError(400,"password Incorrect"));
        }


        const token = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
            // roles:roles
        },process.env.JWT_SECRET);
        console.log(token);
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({
            status:200,
            message:"User Login Successfully",
            data:user,
            // token:token
        })
        
        return next(CreateSuccess(200,"User Login Successfully"))
    } catch (error) {
       

        const a = error.toString();
        console.log(a);
        return next(CreateError(500,"internal server error"));
    }
}

export const registerAdmin = async (req,res,next)=>{
    const role = await Role.find({role:"Admin"});
    const salt = bcrypt.genSaltSync(10);
    // console.log(req.body);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        email : req.body.email,
        password : hashPassword.toString(),
        isAdmin : true,
        roles : role
    });
    await newUser.save();
   return next(CreateSuccess(200,"Admin registerd Successfully"));
}