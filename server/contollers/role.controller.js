import Role from "../models/role.models.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";







export const createRole = async (req, res, next) => {
    try {
      if (req.body.role && req.body.role !== "") {
        const newRole = new Role(req.body);
        await newRole.save();
        return next(CreateSuccess(200,"Role Added"));
      } else {
        return next(CreateError(400,"Bad Request"));
        // return res.status(400).send("Bad Request");
      }
    } catch (err) {
      console.log(err);
      return next(CreateError(500,"Internal Server Error"));
    //   res.status(500).send("Internal Server Error");
    }
  };





  export const updateRole = async (req,res,next) =>{
    try {
      const role = await Role.findById({_id:req.params.id});
      if(role){
        const newData = await Role.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        return next(CreateSuccess(200,"Role Updated Successfully"));  
      }
      else{
        return next(CreateError(404,"Role Not Found"));
        
      }
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    //   return res.status(500).send("Internal Server Error");
    }
  };






  export const getAllRoles = async (req,res,next)=>{
    try {
      const roles = await Role.find({});
      if(roles){
        return next(CreateSuccess(200,"Got Roles Successfully",roles));
      }
    else{
        return next(CreateError(404,"No Roles Found"));
        // return res.status(404).send("No Roles Found");
    }
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    //   return res.status(500).send("Internal Server Error");
    }
  };






  export const deleteRole = async (req,res,next)=>{
    try{
        const roleId = req.params.id;
        const role = await Role.findById({_id:roleId})
        if(role){
            await Role.findByIdAndDelete({_id:roleId});
            return next(CreateSuccess(200,"Role Deleted Successfully"));
        }
        else{
        return next(CreateError(404,"Role Not Found"));
        // return res.status(404).send("Role Not Found");
        }
    }catch(err){
        return next(CreateError(500,"Internal Server Error"));
        // return res.status(500).send("Internal Server Error");
    }
  };