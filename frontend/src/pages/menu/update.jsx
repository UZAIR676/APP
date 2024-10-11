import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    isAvailable: true,
  });

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`/api/v1/menu/${id}`);
        setMenuItem(response.data);
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: name === 'isAvailable' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/menu/menu${id}`, menuItem);
      navigate('/menu'); // Redirect after update
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Menu Item</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={menuItem.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAvailable"
              checked={menuItem.isAvailable}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Available</span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
