import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { setCredentials } from '../../redux/features/auth/authSlide';  // Keep this import
import { toast } from 'react-toastify';

import { useRegisterMutation } from '../../redux/api/user';

const Register = () => {
  const [username, setUsername] = useState('');  // Fixed typo: useState instead of newState
  const [email, setEmail] = useState('');       // Fixed typo: useState instead of newState
  const [password, setPassword] = useState(''); // Fixed typo: useState instead of newState
  const [confirmPassword, setConfirmPassword] = useState(''); // Fixed typo: conformPassword to confirmPassword
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state) => state.auth.userInfo); // Simplified useSelector

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]); // Corrected dependency array format

  return (
    <div className='pl-[10rem] flex-wrap'>
      .mr
    </div>
  );
}

export default Register;
