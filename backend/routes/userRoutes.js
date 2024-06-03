// userRoutes.js
import express from 'express';
import { createUser, loginUser , logoutCurrentUser, getAllusers} from '../controllers/userController.js'; // Adjust the path based on your project structure

import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllusers);

router.post('/auth',loginUser)
router.post('/logout',logoutCurrentUser)


export default router;
