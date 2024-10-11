import Order from '../models/order.js';

// Create a new order
export const createOrder = async (req, res) => {
    const { userId, cartItems, totalPrice } = req.body;

    console.log(req.body); // Log the incoming request

    try {
        const newOrder = new Order({
            user: userId,
            items: cartItems,
            totalPrice,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Confirm an order
export const confirmOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'Confirmed' }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error confirming order', error });
    }
};
