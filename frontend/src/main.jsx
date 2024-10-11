import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { Navigate, Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../src/pages/home/Home.jsx';
import Login from './pages/Auth/login/Login.jsx';
import Register from './pages/Auth/register/Register.jsx';

import PrivateRout from './pages/Auth/PrivateRout.jsx';  // Fixed the typo in PrivateRoute
import Profile from './pages/User/profile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import GenreList from './pages/Admin/GenreList.jsx';
import Menu from './pages/menu/menu.jsx';
import About from './pages/about/about.jsx';
import Deals from './pages/deals/deals.jsx';
import Cent from './pages/Auth/cart/cent.jsx';

import CreateSpecial from './pages/home/createspecial.jsx';
import Delet from './pages/home/delet.jsx';
import CreateMenu from './pages/menu/createMenu.jsx'; // Keep only one import of CreateMenu
import Del from './pages/menu/del.jsx';
import Cart from './pages/Auth/cart/cart.jsx';
import Erpa from './pages/erpa.jsx';
import Order from './pages/order/order.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/op' element={<CreateMenu />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/menucreate' element={<CreateMenu />} />
      <Route path='/delo' element={<Del />} />
      <Route path='/cart' element={<Cent />} />
      <Route path='/order' element={<Order />} />


      <Route path='/createspecial' element={<CreateSpecial />} />
      <Route path='/deletespecial' element={<Delet />} />
      <Route path='/login' element={<Login />} />
      <Route path='/deals' element={<Deals />} />
      <Route path='/about' element={<About />} />
      <Route path='/bigL' element={<Cart />} />
      <Route path='/register' element={<Register />} />
       <Route path='/*' element={<Erpa />} /> 

      <Route path='' element={<PrivateRout />}> {/* Corrected typo */}
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/movies/genre' element={<GenreList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
