import express from 'express';
const router = express.Router(); // Corrected this line

import { createGenre ,updateGenere,deleteGenre,listgenre,readGenre} from '../controllers/genreController.js'; // Ensure correct path and file extension

import { authenticated, authorizeAdmin } from '../middlewares/authMiddleware.js'; // Ensure correct path and file extension

router.route('/').post(authenticated, authorizeAdmin, createGenre);
router.route('/:id').put(authenticated, authorizeAdmin, updateGenere);
router.route("/:id").delete(authenticated, authorizeAdmin, deleteGenre);
router.route("/genre").get(listgenre)
router.route("/:id").get(readGenre);


export default router;
