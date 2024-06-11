import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/features/auth/authSlide'; // Import setCredentials
import { toast } from 'react-toastify'; // Import toast
import { useRegisterMutation } from '../../redux/api/user';
import Loader from '../../components/loader';

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
    <div className='flex'>
      <img
        src="https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=612x612&w=0&k=20&c=0rDtwzMmLbqe_8GuGw2dpjkD0MsXGywJmdmg0jDbMxQ="
        alt=""
        className='h-[40rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg'
      />
      <div className='pl-[10rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Register</h1>
        <form className='container w-[40rem]' onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label htmlFor="username" className='block text-sm font-medium text-white'>Username</label>
            <input
              type="text"
              id='username'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className='block text-sm font-medium text-white'>Email</label>
            <input
              type="email"
              id='email'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>
            <input
              type="password"
              id='password'
              className='mt-1 p-2 border rounded w-full'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className='block text-sm font-medium text-white'>Confirm Password</label>
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
            className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
            {isLoading ? "registering..." : 'Register'}
          </button>
          {isLoading && <Loader />} {/* Rendering the Loader component if isLoading is true */}
        </form>
        <div className='mt-4'>
          <p>
            Already have an account? <Link to={`/login?redirect=${redirect}`} className='text-teal-500 hover:underline'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
