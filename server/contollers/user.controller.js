import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import User from "../models/user.models.js"

export const getAllUsers = async (req,res,next)=>{
    try {
        const users = await User.find();
        console.log(users);
        if(!users){
            return next(CreateError(404,"Users Not Found"));
        }
        return next(CreateSuccess(200,"All Users",users));
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    }
};



export const getById = async(req,res,next)=>{
    try {
        const users = await User.findById(req.params.id);
        if(!users){
            return next(CreateError(404,"User Not Found"));
        }
        return next(CreateSuccess(200,"single Users", users));
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    }
};