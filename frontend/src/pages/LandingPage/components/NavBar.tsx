import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Company Logo or Name */}
        <div className="text-2xl font-bold text-gray-800">
          <a href="/" className="flex items-center">
            <img
              src="/path-to-logo.png" // Replace with your logo's path if you have one
              alt="Company Logo"
              className="w-8 h-8 mr-2"
            />
            Company Name
          </a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('product');
            }}
            className="text-gray-800 hover:text-green-600"
          >
            Product
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('solutions');
            }}
            className="text-gray-800 hover:text-green-600"
          >
            Solutions
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('bottom');
            }}
            className="text-gray-800 hover:text-green-600"
          >
            PlaceHolder
          </a>
        </div>

        {/* Sign In/Sign Up buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="text-gray-800 hover:text-green-600 flex items-center">
            Sign in
          </Link>
          <Link to="/signup" className="border-2 border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
