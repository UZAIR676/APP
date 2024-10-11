import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './pages/Auth/Navigation';
import React, { useState } from 'react';
import Cart from './pages/Auth/cart/cart' // Import your Cart component
import Footer from './pages/Auth/footor'
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className='py-3'>
        <Outlet context={{ cartItems, setCartItems }} />
      </main>
      <Cart cartItems={cartItems} />
      <Footer />
    </>
  );
};

export default App;

