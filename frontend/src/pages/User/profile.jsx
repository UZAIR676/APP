import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader';
import { useProfileMutation } from '../../redux/api/user';
import { setCredentials } from '../../redux/features/auth/authSlide';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const updatedUser = await updateProfile({ username, email, password }).unwrap();
      dispatch(setCredentials(updatedUser));
      alert('Profile updated successfully');
    } catch (error) {
      alert(error.message || 'Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md p-4 mt-10 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-red-500 font-bold text-white py-2 px-4 rounded hover:bg-red-600 w-full mt-4"
              >
                {loadingUpdateProfile ? 'Updating...' : 'Update'}
              </button>

              {loadingUpdateProfile && <Loader className="ml-4" />}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
