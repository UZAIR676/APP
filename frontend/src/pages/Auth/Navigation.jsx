import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineMenu, AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai';
import { FaPizzaSlice, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlide';


const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="backdrop-blur-md text-white p-4 shadow-lg fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold hover:text-red-500 flex items-center">
                    <AiOutlineHome size={24} className="mr-2" />
                    FoodieApp
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-xl font-semibold hover:text-red-600">Home</Link>
                    <Link to="/menu" className="text-xl font-semibold hover:text-red-600">Menu</Link>
                    <Link to="/about" className="text-xl font-semibold hover:text-red-600">About</Link>
                </div>

                {/* Cart and User Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/cart" className="text-xl font-semibold hover:text-red-600 flex items-center">
                        <FaShoppingCart size={24} className="mr-2" />
                        Cart
                    </Link>
                    {userInfo ? (
                        <div className="relative">
                            <button onClick={toggleMenu} className="text-lg font-semibold flex items-center">
                                {userInfo.username}
                                <AiOutlineMenu className="ml-2" />
                            </button>
                            {/* Dropdown Menu */}
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 bg-black rounded shadow-lg w-48 py-2">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-red-600">Profile</Link>
                                    {userInfo.isAdmin && (
                                        <>
                                            <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-red-600">Admin Dashboard</Link>
                                            <Link to="/createspecial" className="block px-4 py-2 hover:bg-red-600">Special Offers</Link>
                                            <Link to="/op" className="block px-4 py-2 hover:bg-red-600">menu managment </Link>
                                            <Link to="/order" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">orders</Link>
                                        </>
                                    )}
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-600">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-xl font-semibold hover:text-red-600 flex items-center">
                                <AiOutlineLogin size={24} className="mr-2" />
                                Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-white hover:text-red-300">
                        <AiOutlineMenu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden backdrop-blur-md text-white space-y-2 py-4">
                    <Link to="/" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">Home</Link>
                    <Link to="/menu" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">Menu</Link>
                    <Link to="/about" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">About</Link>
                    
                    <Link to="/cart" className="text-xl font-semibold hover:bg-red-500 px-4 py-2 flex items-center">
                        <FaShoppingCart size={24} className="mr-2" />
                        Cart
                    </Link>
                    {userInfo ? (
                        <>
                            <Link to="/profile" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">Profile</Link>
                            {userInfo.isAdmin && (
                                <>
                                    <Link to="/admin/dashboard" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">Admin Dashboard</Link>
                                    <Link to="/createspecial" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">Special Offers</Link>
                                    <Link to="/order" className="block text-xl font-semibold hover:bg-red-500 px-4 py-2">orders</Link>
                                </>
                            )}
                            <button onClick={handleLogout} className="block text-left w-full text-xl font-semibold hover:bg-red-500 px-4 py-2">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="text-xl font-semibold hover:bg-red-500 px-4 py-2 flex items-center">
                            <AiOutlineLogin size={24} className="mr-2" />
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
