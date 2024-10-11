import React, { useState } from 'react';
import axios from 'axios';
import './delete.css';

const Delet = () => {
  const [productId, setProductId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`/api/v1/special/delet/${productId}`);
      setSuccessMessage('Product deleted successfully!');
      setProductId(''); // Clear the input field
    } catch (error) {
      setErrorMessage('Error deleting product');
      console.error('Error deleting special product:', error);
    }
  };

  return (
    <div className="delete-special-container">
      <div className='mt-10'>
      <h1 className='text-red-600 text-4xl'>Delete Special Product</h1>
      <form onSubmit={handleDelete} className="delete-special-form">
        <label>
          Product ID:
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Delete Product</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Delet;
