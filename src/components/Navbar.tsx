import React from "react";
// import { useNavigate } from 'react-router-dom';
// import withSplashScreen from './withSplashScreen';

interface NavbarProps {
  onResetSplash: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onResetSplash }) => {
  return (
    <nav>
      <img src="src/assets/logo.webp" alt="logo" className="logo" />
      <div className="text-logo">Frontender.itacademy</div>
      <button className="welcome-return" onClick={onResetSplash}>
        Retorna a la pàgina de benvinguda
      </button>
    </nav>
  );
};

export default Navbar;
