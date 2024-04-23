import express from "express";
import { createRole,deleteRole,getAllRoles,updateRole } from "../contollers/role.controller.js";
const router = express.Router();


//create role route for DB
router.post("/create", createRole);


//update role route for DB
router.put('/update/:id',updateRole);


//get role route for DB
router.get('/getAll',getAllRoles);


//delete role route for DB
router.delete("/deleteRole/:id",deleteRole)



export default router;