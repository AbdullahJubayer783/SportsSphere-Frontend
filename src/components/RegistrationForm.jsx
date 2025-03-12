import { useState, useRef, useEffect } from 'react';
import { typewriter } from '../utils/animations';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    jerseyOption: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const [showAmount, setShowAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const paymentTextRef = useRef(null);
  const formRef = useRef(null);
  
  // Validate form on data change
  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.number.trim() !== '' && 
      formData.jerseyOption !== '';
      
    setIsFormValid(isValid);
  }, [formData]);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // Show amount when jersey option changes
    if (name === 'jerseyOption' && value) {
      setShowAmount(true);
      
      // Use setTimeout to ensure ref is available after state update
      setTimeout(() => {
        if (paymentTextRef.current) {
          const amount = value === 'withoutJersey' ? '650 Taka' : '800 Taka';
          paymentTextRef.current.textContent = `Your payment amount: ${amount}`;
        }
      }, 100);
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.number.replace(/\D/g, ''))) {
      newErrors.number = 'Phone number is invalid';
    }
    
    if (!formData.jerseyOption) {
      newErrors.jerseyOption = 'Please select a jersey option';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          number: '',
          jerseyOption: ''
        });
        
        setIsSubmitting(false);
        setShowAmount(false);
        
        // Show success message
        alert('Registration successful! Thank you for participating.');
      }, 1500);
    }
  };
  
  // Animation for form entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (formRef.current) {
      observer.observe(formRef.current);
    }
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-8 bg-white" id="registration">
      <div className="section-container">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title inline-block">Register Now</h2>
            <p className="text-gray-600 mt-4">
              Join the SportsSphere community for this exciting virtual run event.
            </p>
          </div>
          
          <div 
            ref={formRef} 
            className="bg-white rounded-2xl shadow-xl p-8 opacity-0"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                  Full Name
                </label>
                <div className={`relative ${isFocused.name ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({...isFocused, name: true})}
                    onBlur={() => setIsFocused({...isFocused, name: false})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
                      errors.name 
                        ? 'ring-2 ring-red-500' 
                        : 'focus:ring-2 focus:ring-sport-blue'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email Address
                </label>
                <div className={`relative ${isFocused.email ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({...isFocused, email: true})}
                    onBlur={() => setIsFocused({...isFocused, email: false})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
                      errors.email 
                        ? 'ring-2 ring-red-500' 
                        : 'focus:ring-2 focus:ring-sport-blue'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="number">
                  Phone Number
                </label>
                <div className={`relative ${isFocused.number ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({...isFocused, number: true})}
                    onBlur={() => setIsFocused({...isFocused, number: false})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
                      errors.number 
                        ? 'ring-2 ring-red-500' 
                        : 'focus:ring-2 focus:ring-sport-blue'
                    }`}
                    placeholder="Your phone number"
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.number}
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Jersey Option
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="withoutJersey"
                      name="jerseyOption"
                      value="withoutJersey"
                      checked={formData.jerseyOption === 'withoutJersey'}
                      onChange={handleChange}
                      className="w-5 h-5 text-sport-blue focus:ring-sport-blue"
                    />
                    <label htmlFor="withoutJersey" className="ml-3 text-gray-700">
                      Without Jersey (650 Taka)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="withJersey"
                      name="jerseyOption"
                      value="withJersey"
                      checked={formData.jerseyOption === 'withJersey'}
                      onChange={handleChange}
                      className="w-5 h-5 text-sport-blue focus:ring-sport-blue"
                    />
                    <label htmlFor="withJersey" className="ml-3 text-gray-700">
                      With Jersey (800 Taka)
                    </label>
                  </div>
                  
                  {errors.jerseyOption && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.jerseyOption}
                    </p>
                  )}
                </div>
              </div>
              
              {showAmount && (
                <div className="p-4 bg-gray-50 rounded-lg w-full overflow-x-auto">
                  <p 
                    ref={paymentTextRef} 
                    className="font-medium text-sport-blue break-words"
                  ></p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 rounded-lg font-medium text-white transition-all duration-300 ${
                  isFormValid && !isSubmitting
                    ? 'bg-sport-blue hover:bg-blue-600 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Pay Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
