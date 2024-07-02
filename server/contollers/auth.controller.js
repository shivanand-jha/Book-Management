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



export const login = async (req, res, next) => {
    try {
        // Attempt to find user by email
        const user = await User.findOne({ email: req.body.email }).populate("roles", "role");

        // Check if user exists
        if (!user) {
            return next(CreateError(404, "User not found"));
        }
        if(user.disable){
            return next(CreateError(403, "Your account has been disabled. Please connect with your admin to resolve the issue."));
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return next(CreateError(400, "Password Incorrect"));
        }

        // Generate JWT token
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            roles: user.roles
        }, process.env.JWT_SECRET);

        // Set cookie with access token and send response
        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            status: 200,
            message: "User Login Successfully",
            data: user
        });

        // Return success message through next middleware
        return next(CreateSuccess(200, "User Login Successfully"));
    } catch (error) {
        // Handle any errors
        console.log(error.toString()); // Log the error for debugging purposes

        // Return internal server error
        return next(CreateError(500, "Internal Server Error"));
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