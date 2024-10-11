import express from 'express';
import {
    createMenu,
    getAllMenu,
    getMenuById,
    updateMenu,
    deleteMenu
} from '../controllers/menuController.js';

const router = express.Router();

// POST: Create a new menu item
router.post('/menu', createMenu);

// GET: Get all menu items
router.get('/allmenu', getAllMenu);

// GET: Get a single menu item by ID
router.get('/:id', getMenuById);

// PUT: Update a menu item by ID (corrected)
router.put('/menu/:id', updateMenu);

// DELETE: Delete a menu item by ID (corrected)
router.delete('/delete/:id', deleteMenu);

export default router;
