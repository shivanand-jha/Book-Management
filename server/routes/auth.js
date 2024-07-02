import express from 'express';
import {  login, registerAdmin, registerUser } from '../contollers/auth.controller.js';
const router = express.Router();

router.post("/signup",registerUser);
router.post("/signin",login);
// router.get("/user",);   

router.post("/register-admin",registerAdmin);

export default router;