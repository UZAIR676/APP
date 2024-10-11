import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    isAvailable: true,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/menu/menu', formData);
      console.log('Menu item created:', response.data);
      setSuccessMessage('Menu item created successfully!');
      setErrorMessage(''); // Clear any previous errors
      // Optionally reset form after submission
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        isAvailable: true,
      });
    } catch (error) {
      console.error('Error creating menu item:', error.response || error.message);
      setErrorMessage('Error creating menu item. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Create Menu Item</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm  font-medium text-white">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-white">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-white">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="isAvailable" className="block text-sm font-medium text-white">Available:</label>
          <select
            id="isAvailable"
            name="isAvailable"
            value={formData.isAvailable}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700">
          Create Menu Item
        </button>
        <div className="text-red-600">  <Link to="/delo">delete</Link></div>
      </form>
     
    </div>
  );
};

export default CreateMenu;
