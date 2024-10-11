import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import Loader from '../../components/loader';
const Home = () => {
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    // Fetch special products from the backend
    const fetchSpecialProducts = async () => {
      try {
        const response = await axios.get('/api/v1/special/allspecialproduct');
        setSpecialProducts(response.data);
      } catch (error) {
        console.error('Error fetching special products:', error);
      }
    };

    fetchSpecialProducts();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="home-content">
          <div className="text-section">
            <h1 className='heading'>Welcome</h1>
            <p className='subheading'>To the game of hunger</p>
            <p className='description'>Delicious meals, delivered with ease – your perfect menu at your fingertips!</p>
            <button className='order-button'>Order Now</button>
          </div>
          <div className="image-section">
            <img className='pizza-image' src='https://img.freepik.com/free-photo/delicious-fresh-pizza-black-background_125540-5050.jpg?t=st=1726413834~exp=1726417434~hmac=e927486fef09e213cb8d0c194a15d9b1891dd941f67096d052f8b914d3457e92&w=996' alt="Delicious Pizza" />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="ml-[43%]" id="sp">
          <h1 className="text-2xl text-red-600 ml-10">Special Offer</h1>
        </div>
        <div className="special-products">
          {specialProducts.length > 0 ? (
            specialProducts.map((product) => (
              <div key={product._id} className="special-product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
              </div>
            ))
          ) : (
          <Loader/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
