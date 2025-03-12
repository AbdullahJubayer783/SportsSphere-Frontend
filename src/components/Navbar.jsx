
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import logo from '../images/logo.png'
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white shadow-md' 
          : 'py-4 bg-transparent'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold mr-2 "  src={logo} alt="LOGO"/>
             
            <span className={`font-bold text-xl ${scrolled ? 'text-sport-darkgray' : 'text-white'}`}>
              SportsSphere
            </span>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-full bg-sport-blue text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Login
          </button>
        </div>
      </nav>
      
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
