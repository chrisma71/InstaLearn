// src/pages/LandingPage/components/Landing.tsx
import React from 'react';
import Polygon from './assets/Polygon 1.png';

const Landing: React.FC = () => {
  return (
    <section id="product" className="bg-[#E5D4C0] min-h-screen w-full flex flex-col justify-between font-ubuntu">
      <div className="w-full flex items-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
        <div className="w-full pl-44">
          <h2 className='text-2xl font-bold text-gray-600 tracking-wider'>Company Name Here</h2>
          <h1 className="text-7xl font-bold text-gray-900 tracking-wide">
            Where Learning Meets <br />
            <span className="bg-gradient-to-r from-[#3E885B] to-[#2F4B26] text-transparent bg-clip-text">
              Innovation
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-700 flex flex-col space-y-1 text-left">
            <span>Personalize every lesson.</span>
            <span>Engage students instantly.</span>
            <span>Streamline your teaching process.</span>
            <span>Create interactive experiences.</span>
            <span>Trusted by educators worldwide.</span>
          </p>
        </div>
      </div>
      <div className="w-full object-contain">
        <img src={Polygon} alt="Breaker" className="w-full" />
      </div>
    </section>
  );
};

export default Landing;
