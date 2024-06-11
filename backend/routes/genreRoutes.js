import express from 'express'
const router = express.router()


import { createGenre } from '../controllers/genreController';


import { authenticated,authorizeAdmin } from '../middlewares/authMiddleware'
router.route('/').post(authenticated,authorizeAdmin,createGenre);



export default router;