import express from 'express';
import { createOrder, getAllOrders, confirmOrder } from '../controllers/orderController.js';

const router = express.Router();

// Route to create an order
router.post('/orders', createOrder);

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to confirm an order
router.put('/orders/:orderId', confirmOrder);

export default router;
