
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/ui/Loader';
import { Calendar, MapPin, User, Clock } from 'lucide-react';

// Sample ticket data
const sampleTickets = [
  {
    id: 1,
    eventName: "Dhaka Marathon 2023",
    date: "October 15, 2023",
    location: "Hatirjheel, Dhaka",
    ticketNumber: "DM-2023-001",
    type: "Standard Entry"
  },
  {
    id: 2,
    eventName: "Dhaka Night Run",
    date: "November 5, 2023",
    location: "Banani, Dhaka",
    ticketNumber: "DNR-2023-042",
    type: "Premium Entry"
  }
];

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulate API call to get user tickets
    const timer = setTimeout(() => {
      setTickets(sampleTickets);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="mt-2 text-lg text-gray-600">
              View all your marathon tickets here
            </p>
          </div>

          {tickets.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-medium text-gray-700">No tickets found</h2>
              <p className="mt-2 text-gray-500">
                You haven't registered for any marathon events yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-sport-blue px-6 py-4 text-white">
                    <h2 className="text-xl font-bold">{ticket.eventName}</h2>
                    <p className="text-blue-100">{ticket.type}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500">TICKET NUMBER</p>
                      <p className="text-xl font-bold text-gray-800">{ticket.ticketNumber}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-sport-blue mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">DATE</p>
                          <p className="text-gray-800">{ticket.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-sport-blue mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">TIME</p>
                          <p className="text-gray-800">6:00 AM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-sport-blue mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">LOCATION</p>
                          <p className="text-gray-800">{ticket.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="h-5 w-5 text-sport-blue mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">PARTICIPANT</p>
                          <p className="text-gray-800">{user ? user.displayName : 'User'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-end">
                      <button className="px-4 py-2 bg-sport-blue text-white rounded hover:bg-blue-700 transition-colors">
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
