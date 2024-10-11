import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/v1/order/orders');
                console.log(response.data); // Log response to check structure
                setOrders(response.data || []);
            } catch (err) {
                setError('Error fetching orders. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>
            {orders.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                            {/* Check if userId exists and is correctly accessed */}
                            <p className="text-gray-600 mb-2">User ID: {order.userId || 'N/A'}</p>
                            <h3 className="font-bold">Items:</h3>
                            <ul>
                                {order.cartItems?.map((item) => (
                                    <li key={item._id} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span>
                                            ${item.price} x {item.quantity} = ${(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <p className="font-bold mt-2">Total Price: ${order.totalPrice.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No orders found.</p>
            )}
        </div>
    );
};

export default Order;
