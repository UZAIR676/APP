import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../redux/features/auth/authSlide';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../redux/api/user';
import Loader from '../../../components/loader';
import './login.css';  // Keeping the existing custom CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center h-screen'>
      {/* Left Section */}
      <div className="left w-full md:w-1/2 p-6  md:pl-10 mt-10 md:mt-0">
        <h1 className='text-2xl font-semibold mb-4 text-center md:text-left'>Sign In</h1>
        <form className='w-full max-w-md mx-auto mr-64' onSubmit={submitHandler}>
          <div className="my-4">
            <label htmlFor="email" className='block text-sm font-medium text-white'>Email Address</label>
            <input
              type="email"
              id='email'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>
            <input
              type="password"
              id='password'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className='bg-red-700 w-full hover:bg-white hover:text-black text-white px-4 py-2 rounded cursor-pointer my-4'
          >
            {isLoading ? "Signing In ..." : "Sign In"}
          </button>
          {isLoading && <Loader />} {/* Loader during signing in */}
        </form>
        <div className='mt-4 text-center md:text-left'>
          <p className='text-white'>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className='text-red-700 hover:underline'>
              Register
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="right hidden md:flex w-full md:w-1/2 justify-center mt-10 md:mt-0">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/984/944/941/burger-french-fries-hamburger-wallpaper-preview.jpg"
          alt="Food Image"
          className='h-80 md:h-[40rem] w-full object-cover rounded-lg'
        />
      </div>
    </div>
  );
};

export default Login;
