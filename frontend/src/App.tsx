// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './pages/Sign Up/SignUp';
import LoginPage from './pages/Log In/LogIn';
import LiveStream from './components/Livestream';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/live" element={<LiveStream />} />

      </Routes>
    </Router>
  );
}

export default App;
