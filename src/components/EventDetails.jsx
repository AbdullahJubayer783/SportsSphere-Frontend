
import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Clock, AlertCircle, Award, DollarSign } from 'lucide-react';

const EventDetails = () => {
  const detailsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-element').forEach((el, index) => {
              el.style.animationDelay = `${index * 0.1}s`;
              el.classList.add('animate-fade-in');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }
    
    return () => {
      if (detailsRef.current) {
        observer.unobserve(detailsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50" id="event-details">
      <div className="section-container" ref={detailsRef}>
        <div className="fade-in-element opacity-0 max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sport-darkgray mb-4">Event Details</h2>
          <div className="w-20 h-1 bg-sport-blue mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">Join us for the Independence Day 7.5k Virtual Run 2025, a celebration of fitness and national pride.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[
            { 
              label: 'Distance', 
              value: '7.5 KM',
              icon: <Clock className="w-5 h-5" />
            },
            { 
              label: 'Cut Off Time', 
              value: '1 Hour 30 Minutes / 90 Minutes',
              icon: <Clock className="w-5 h-5" />
            },
            { 
              label: 'Place', 
              value: 'Virtual Run (Strava)',
              icon: <MapPin className="w-5 h-5" />
            },
            { 
              label: 'Registration (without Jersey)', 
              value: '650 Taka',
              icon: <DollarSign className="w-5 h-5" />
            },
            { 
              label: 'Registration (with Jersey)', 
              value: '800 Taka',
              icon: <DollarSign className="w-5 h-5" />
            },
            { 
              label: 'Registration Timeline', 
              value: '23 December, 2024 - 24 March, 2025',
              icon: <Calendar className="w-5 h-5" />
            }
          ].map((detail, index) => (
            <div 
              key={index} 
              className="fade-in-element opacity-0 glass-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] border-t-4 border-sport-blue"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-blue-50 text-sport-blue mr-3">
                  {detail.icon}
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">{detail.label}</span>
              </div>
              <span className="text-lg font-bold text-sport-darkgray block">{detail.value}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-20 fade-in-element opacity-0 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-sport-darkgray mb-4">Participant Rewards</h2>
          <div className="w-20 h-1 bg-sport-orange mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 mb-10">Every finisher will receive these exclusive rewards</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {[
            { reward: 'E-BIB Number', icon: '🏷️', description: 'Digital race bib to mark your participation' },
            { reward: 'Completion E-Certificate', icon: '📜', description: 'Digital certificate to celebrate your achievement' },
            { reward: 'Finisher Medal & Jersey', icon: '🏅', description: 'High-quality medal and custom jersey design' },
            { reward: 'Exciting Gifts', icon: '🎁', description: 'Surprise gifts from our sponsors' }
          ].map((item, index) => (
            <div 
              key={index} 
              className="fade-in-element opacity-0 glass-card p-6 text-center flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="font-semibold text-sport-darkgray mb-2">{item.reward}</div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 fade-in-element opacity-0">
          <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-sport-orange mr-3 flex-shrink-0 mt-1" />
              <h2 className="text-xl font-bold text-sport-darkgray">Important Notice</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-sport-blue text-white flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</div>
                <p>SportsSphere Community has the right to change event details at any time and can disqualify any participant if needed.</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-sport-blue text-white flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</div>
                <p><strong>Non-Transferable:</strong> Registrations cannot be transferred to another individual under any circumstances.</p>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-sport-blue text-white flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">3</div>
                <p><strong>Non-Refundable:</strong> Registration fees are non-refundable, regardless of any changes or unforeseen circumstances.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
