import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader'; // Ensure this Loader component is available

const Del = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/v1/menu/allmenu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError(error.message);
      }
    };

    fetchMenuItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/v1/menu/delete/${itemId}`);
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
      setError(error.message);
    }
  };

  return (
    <div className="p-4 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Menu</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item._id} className="rounded-lg shadow-md p-4">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold text-green-600">${item.price}</p>
                <p className={`mt-2 ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </p>
                {/* Show delete button for everyone */}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="justify-center ml-[45vw] items-center h-screen">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Del;
