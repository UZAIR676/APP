import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Loader from '../../components/loader'; // Ensure this Loader component is available
import { useOutletContext } from 'react-router';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { cartItems, setCartItems } = useOutletContext(); // Access the cart context

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/v1/menu/allmenu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="p-4 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Our <span className="text-red-600">Menu</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item._id} className="rounded-lg shadow-md p-4 border-inherit">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-bold text-green-600">${item.price}</p>
              <button 
                onClick={() => handleAddToCart(item)}
                className="bg-red-600 text-white px-4 py-2 mt-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div className="justify-center ml-[45vw] items-center h-screen m-80">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
