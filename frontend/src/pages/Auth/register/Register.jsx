import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../redux/features/auth/authSlide'; // Import setCredentials
import { toast } from 'react-toastify'; // Import toast
import { useRegisterMutation } from '../../../redux/api/user';
import Loader from '../../../components/loader';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const userData = await register({ username, email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row items-center justify-center min-h-screen'>
      {/* Image Section */}
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/023/007/593/small_2x/pizza-veggie-italian-pizza-with-mozzarella-olives-sausage-and-vegetables-on-black-background-ai-generated-photo.jpg"
        alt="Pizza"
        className='hidden md:block md:w-[40%] lg:w-[50%] h-auto rounded-lg'
      />
      
      {/* Form Section */}
      <div className='w-full md:w-[60%] lg:w-[50%] p-6 md:p-10'>
        <h1 className='text-2xl font-semibold mb-6 text-center md:text-left'>Register</h1>
        <form className='space-y-6' onSubmit={submitHandler}>
          <div>
            <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
            <input
              type="text"
              id='username'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type="email"
              id='email'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type="password"
              id='password'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700'>Confirm Password</label>
            <input
              type="password"
              id='confirmPassword'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className='bg-red-700 w-full text-white px-4 py-2 rounded hover:bg-red-800'>
            {isLoading ? "registering..." : 'Register'}
          </button>
          {isLoading && <Loader />} {/* Rendering the Loader component if isLoading is true */}
        </form>
        <div className='mt-6 text-center'>
          <p>
            Already have an account? <Link to={`/login?redirect=${redirect}`} className='text-red-700 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
