import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from './assets/Search.svg';
import HomeIcon from './assets/Home.svg';
import DiscoverIcon from './assets/Discover.svg';
import ProfileIcon from './assets/Profile.svg';

const AppNavbar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="bg-white border-b border-3 border-[#DCDCDC]">
            <div className="container mx-auto px-4 py-4 flex justify-center items-center space-x-8">
                
                {/* Search Bar */}
                <div className="flex items-center w-60 relative">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="pl-8 pr-3 py-2 text-sm w-full"
                        style={{
                            boxSizing: 'border-box',
                            background: '#FFFFFF',
                            border: '1px solid #000000',
                            borderRadius: '10px',
                        }} 
                    />
                    <img src={SearchIcon} alt="Search" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                </div>
                
                {/* Centered Icons with Text */}
                <div className="flex space-x-6">
                    <Link to="/" className="flex flex-col items-center">
                        <img src={HomeIcon} alt="Home" className="w-6 h-6" />
                        <span className={`text-sm mt-1 ${location.pathname === '/' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>Home</span>
                    </Link>
                    <Link to="/discover" className="flex flex-col items-center">
                        <img src={DiscoverIcon} alt="Discover" className="w-6 h-6" />
                        <span className={`text-sm mt-1 ${location.pathname === '/discover' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>Discover</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center">
                        <img src={ProfileIcon} alt="Profile" className="w-6 h-6" />
                        <span className={`text-sm mt-1 ${location.pathname === '/profile' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}>Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AppNavbar;
