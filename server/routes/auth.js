import express from 'express';
import { register , login, registerAdmin } from '../contollers/auth.controller.js';
const router = express.Router();

router.post("/signup",register);
router.post("/signin",login);
// router.get("/user",);   

router.post("/register-admin",registerAdmin);

export default router;