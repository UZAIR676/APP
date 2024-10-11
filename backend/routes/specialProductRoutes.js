import express from 'express';
import {
    createSpecialProduct,
    getAllSpecialProducts,
    getSpecialProductById,
    updateSpecialProduct,
    deleteSpecialProduct
} from '../controllers/specialProductController.js';

const router = express.Router();

// POST: Create a new special product
router.post('/special', createSpecialProduct);

// GET: Get all special products
router.get('/allspecialproduct', getAllSpecialProducts);

// GET: Get a single special product by ID
router.get('/:id', getSpecialProductById);

// PUT: Update a special product by ID
router.put('/special/:id', updateSpecialProduct);

// DELETE: Delete a special product by ID
router.delete('/delet/:id', deleteSpecialProduct);

export default router;
