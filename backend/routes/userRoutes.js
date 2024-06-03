// userRoutes.js
import express from 'express';
import { createUser, loginUser } from '../controllers/userController.js'; // Adjust the path based on your project structure

const router = express.Router();

router.route('/').post(createUser);

router.post('/auth',loginUser)

export default router;
