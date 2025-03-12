
import { useEffect, useRef } from 'react';

const Banner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!bannerRef.current) return;
      
      const scrollPosition = window.scrollY;
      bannerRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        ref={bannerRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://img.freepik.com/free-photo/healthy-lifestyle-running-outdoors_23-2151847293.jpg?t=st=1741775355~exp=1741778955~hmac=370c4d3de0dc26ae3e31d42e0dabcac1394bb6463bf22541fa68c29f06e2133d&w=1380)', 
          transform: 'scale(1.1)'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <div className="inline-block mb-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Independence Day - March 2025
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Virtual Run 7.5K
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Join the SportsSphere community for our virtual running event celebrating independence day.
        </p>
        
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <a 
            href="#registration"
            className="inline-block px-8 py-3 bg-sport-orange text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
