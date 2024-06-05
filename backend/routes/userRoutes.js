// userRoutes.js
import express from 'express';
import { createUser, loginUser , logoutCurrentUser, getAllUsers,getcurrentUser,updateCurrentUserProfile} from '../controllers/userController.js';
import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createUser);

router.route('/',createUser).get(authenticated,authorizeAdmin,getAllUsers)

// Route to authenticate a user
router.post('/auth', loginUser);

// Route to logout a user

router.post('/logout', logoutCurrentUser);

router.route("/profile").get(authenticated,getcurrentUser).put(authenticated,updateCurrentUserProfile)



export default router;
