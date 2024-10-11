import React from 'react';
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="backdrop-blur-md text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Logo and Description */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-2xl font-bold">FoodieApp</h2>
                    <p className="text-gray-400">
                        Your go-to app for delicious food. Explore our menu, order your favorite dishes, and enjoy exclusive deals and offers.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <AiFillFacebook size={30} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <AiFillTwitterCircle size={30} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <AiFillInstagram size={30} />
                        </a>
                    </div>
                </div>

                {/* Column 2: Quick Links */}
                <div className=" space-x-2">
                    <h2 className="text-xl font-semibold">Quick Links</h2>
                    <Link to="/" className="hover:text-red-500">Home</Link>
                    <Link to="/menu" className="hover:text-red-500">Menu</Link>
                    <Link to="/about" className="hover:text-red-500">About</Link>
                    
                    <Link to="/deals" className="hover:text-red-500">Deals</Link>
                </div>

                {/* Column 3: Contact Information */}
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-semibold">Contact Us</h2>
                    <p className="text-gray-400">123 Food Street, New York, NY</p>
                    <p className="text-gray-400">Email: info@foodieapp.com</p>
                    <p className="text-gray-400">Phone: +1 234 567 8900</p>
                </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-700 mt-8 pt-4">
                <p className="text-center text-gray-500">&copy; 2024 FoodieApp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
