import express from 'express';
import { getAllUsers,getByUserId,updateUser} from '../contollers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/user/', verifyAdmin , getAllUsers);
router.get('/user/:id', verifyAdmin , getByUserId);
router.get('/:id', verifyUser , getByUserId);
router.put('/updateuser/:userId', verifyAdmin, updateUser);



export default router;