import React, { useState } from 'react';
import axios from 'axios';
import './create.css';
import { Link } from 'react-router-dom';

const CreateSpecial = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/v1/special/special', {
        name,
        description,
        price,
        image
      });
      setSuccessMessage('Product created successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (error) {
      setErrorMessage('Error creating product');
      console.error('Error creating special product:', error);
    }
  };

  return (
    <div className="create-special-container">
      <div className="mt-10">
      <h1 className="text-4xl text-red-600">Create Special Product</h1>
      <form onSubmit={handleSubmit} className="create-special-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Product</button>
        <br />
        <Link to="/deletespecial" >delete</Link>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  );
};

export default CreateSpecial;
