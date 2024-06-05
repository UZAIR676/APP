import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlide';
import { MdOutlineLocalMovies } from 'react-icons/md';

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Dispatch logout action
        dispatch(logout());
        // Redirect to login or home page after logout
        // navigate('/login'); // If you're using useNavigate from react-router-dom
        // Or
        // window.location.href = '/login'; // Redirect using window location
    };

    return (
        <div className='fixed bottom-10 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded'> 
            <section className="flex justify-between items-center">
                {/* Home and Shop links */}
                <div className='flex items-center mb-[2rem]'>
                    <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
                        <AiOutlineHome className='mr-2 mt-[3rem] custom-icon' size={26} />
                        <span className='hidden nav-item-name mt-[3rem]'>HOME</span>
                    </Link>

                    <Link to='/movies' className='flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]'>
                        <MdOutlineLocalMovies className='mr-2 mt-[3rem] custom-icon' size={26} />
                        <span className='hidden nav-item-name mt-[3rem]'>SHOP</span>
                    </Link>
                </div>

                {/* Dropdown for user information */}
                <div className='relative'>
                    <button onClick={toggleDropdown} className='text-gray-800 focus:outline-none'>
                        {userInfo ? (
                            <span className='text-white'>{userInfo.username}</span>
                        ) : (
                            <></>
                        )}
                        {userInfo && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ml-1 ${
                                    dropdownOpen ? "transform rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                                />
                            </svg>
                        )}
                    </button>

                    {dropdownOpen && userInfo && (
                        <ul className={`absolute right-0 mt-2 mr-14 w-[10] space-y-2 text-grey-600 ${!userInfo.isAdmin ? '-top-20' : '-top-24'}`}>
                            {userInfo.isAdmin && (
                                <>
                                    <li>
                                        <Link to='/admin/movies/dashboard' className='black px-4 py-2 hover:bg-grey-100 '>Dashboard</Link>
                                    </li>
                                </>
                            )}

                            <li>
                                <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button onClick={handleLogout} className='block w-full px-4 py-2 text-left hover:bg-gray-100'>Logout</button>
                            </li>
                        </ul>
                    )}

                    {/* Conditional rendering for login and register links */}
                    {!userInfo && (
                        <ul className='flex'>
                            <li>
                                <Link to='/login' className='flex items-center mt-5 transition-transform transform hover:translate-x-2 mb-[2rem]'>
                                    <AiOutlineLogin className='mr-2 mt-[4px]'size={26}/>
                                    <span className='hidden nav-item-name'>LOGIN</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/register' className='flex items-center mt-5 transition-transform transform hover:translate-x-2 ml-[1rem]'>
                                    <AiOutlineUserAdd size={26}/>
                                    <span className='hidden nav-item-name'>Register</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Navigation;
