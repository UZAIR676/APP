import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js';
import { Provider } from 'react-redux';
import { Navigate, Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PrivateRout from './pages/Auth/PrivateRout.jsx';
import Profile from './pages/User/profile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import GenreList from './pages/Admin/GenreList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateRout />}> {/* Corrected typo */}
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/movies/genre' element={<GenreList />}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
