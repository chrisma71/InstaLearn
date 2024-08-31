// src/pages/LandingPage/LandingPage.tsx
import React from 'react';
import Landing from './components/Landing';
import Features from './components/Features';

const LandingPage: React.FC = () => {
  return (
    <div className='w-screen'>
      <Landing />
      <Features />
    </div>
  );
};

export default LandingPage;
