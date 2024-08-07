import express from 'express';
import { getAllUsers,getByUserId,updateUser} from '../contollers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/user',  getAllUsers);
router.get('/user/:id',  getByUserId);
router.get('/:id',  getByUserId);
router.put('/updateuser/:id',  updateUser);



export default router;