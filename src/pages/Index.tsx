
import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import EventDetails from "../components/EventDetails";
import VideoSection from "../components/VideoSection";
import RegistrationForm from "../components/RegistrationForm";
import Footer from "../components/Footer";
import { setupFadeInOnScroll } from '../utils/animations';

const Index = () => {
  useEffect(() => {
    // Initialize fade-in animations on scroll
    setupFadeInOnScroll();
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        const element = document.querySelector(id);
        if (element) {
          const navbarHeight = 80; // Approximate navbar height
          const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Banner />
      <EventDetails />
      <VideoSection />
      <RegistrationForm />
      <Footer />
    </div>
  );
};

export default Index;
