import React, { useState } from 'react';
import axios from 'axios';

const CartPage = ({ cartItems = [] }) => {
    const [notification, setNotification] = useState('');
    const userId = '64d91e5d44d5b2e9d6b9876a'; // Replace with an actual user ID from your database

    const handleOrderSubmit = async () => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        const orderData = {
            userId,
            cartItems,
            totalPrice,
        };

        try {
            const response = await axios.post('/api/v1/order/orders', orderData);
            console.log('Order created:', response.data);
            setNotification('Your order has been placed successfully!');
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            setNotification('Error placing order. Please try again.');
        }
    };

    return (
        <div className="p-4 mt-12">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Your <span className="text-red-600">Cart</span>
            </h1>
            {notification && (
                <div className="mb-4 text-center">
                    <p className={`font-semibold ${notification.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {notification}
                    </p>
                </div>
            )}
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="border p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600 mb-2">{item.description}</p>
                            <p className="text-lg font-bold text-green-600">
                                ${item.price} x {item.quantity}
                            </p>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <button
                        onClick={handleOrderSubmit}
                        className="mt-4 bg-red-600 hover:bg-red-900 text-white py-2 px-4 rounded"
                    >
                        Place Order
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default CartPage;
