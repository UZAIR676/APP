// userRoutes.js
import express from 'express';
import { createUser, loginUser , logoutCurrentUser, getAllUsers,getcurrentUser} from '../controllers/userController.js';
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/',createUser).get(authenticated,authorizeAdmin,getAllUsers)

// Route to authenticate a user
router.post('/auth', loginUser);

// Route to logout a user

router.post('/logout', logoutCurrentUser);

router.route("/profile").get(authenticated,getcurrentUser)
export default router;
