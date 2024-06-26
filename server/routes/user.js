import express from 'express';
import { getAllUsers,getById } from '../contollers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/user/', verifyAdmin , getAllUsers);
router.get('/user/:id', verifyAdmin , getById);
router.get('/:id', verifyUser , getById);




export default router;