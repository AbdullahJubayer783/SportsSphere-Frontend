import { useState, useRef, useEffect, useContext } from 'react';
import { typewriter } from '../utils/animations';
import { AuthContext } from './Provider/AuthProvider';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { User } from 'lucide-react';
import Bkash_logo from '../images/BKash-Logo.wine.svg'
import Nagad_logo from '../images/Nagad-Logo.wine.png'
import Rocket_logo from '../images/Rocket-Logo.png'

const divisions = [
  "Barisal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];
const t_shirt_size = [
  "M",
  "L",
  "XL",
  "XXL",
];
const payment_method = [
  "Bkash",
  "Nagad",
  "Rocket",
];
const bangladeshDivisions = {
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Mymensingh: [
    "Jamalpur",
    "Mymensingh",
    "Netrokona",
    "Sherpur",
  ],
  Rajshahi: [
    "Bogra",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Nawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajgonj",
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Barisal: [
    "Barguna",
    "Barisal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chittagong",
    "Comilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Sylhet: [
    "Habiganj",
    "Maulvibazar",
    "Sunamganj",
    "Sylhet",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jessore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
};


const RegistrationForm = () => {
  const {user,createUserEmailPass} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    division: '',
    district: '',
    area: '',
    address: '',
    jerseyOption: '',
    t_size: 'M',
    payment_method: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFocused, setIsFocused] = useState({});
  const [showAmount, setShowAmount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTrue , setTrue] = useState(true);
  const paymentTextRef = useRef(null);
  const formRef = useRef(null);
  
  // Validate form on data change
  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
    formData.name !== '' && 
    formData.email.trim() !== '' && 
    formData.number.trim() !== '' && 
    formData.division.trim() !== '' && 
    formData.district.trim() !== '' && 
    formData.area.trim() !== '' && 
    formData.address.trim() !== '' && 
    formData.jerseyOption !== ''&&
    formData.payment_method.trim() !== '';

    
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
    //----validatition of new fields
    // if (!formData.divisionOption) {
    //   newErrors.division = 'Please select a jersey option';
    // }
    // if (!formData.jerseyOption) {
    //   newErrors.division = 'Please select a jersey option';
    // }
    if (!formData.area.trim()) {
      newErrors.area = 'Area is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Adress is required';
    }
    if (!formData.jerseyOption) {
      newErrors.jerseyOption = 'Please select a jersey option';
    }
    
    if (!formData.payment_method) {
      newErrors.jerseyOption = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  // "name": "John Doe",
  // "email": "john@example.com",
  // "user_email": "account@example.com",
  // "phone_number": "+8801712345678",
  // "division": "Dhaka",
  // "district": "Dhaka",
  // "area": "Mirpur",
  // "address": "123 Street",
  // "with_jersey": true,
  // "transaction_id": "TX123456",
  // "payment_method": "Bkash",
  // "account_number": "123456789012"
  // const handleSubmit =  (e) => {
  //   e.preventDefault();
    
  //   if (validateForm()) {
  //     setIsSubmitting(true);
  //     console.log("submitted succesfully");
  //     // Simulate API call
  //     setLoading(true)
  //     setTimeout(() => {
  //       console.log('Form submitted:', formData);

        
  //       if(user===null){
  //        createUserEmailPass(formData.name , formData.email , formData.password)
  //         .then(res=>{
  //           updateProfile(res.user, {
  //             displayName: formData.name
  //           }).then(() => {
  //             console.log("profile Update!");
  //           }).catch((error) => {
  //             console.log("Some issu occured..!!");
  //           });
  //         })
  //           .then(err=>console.log(err))
  //         }

          
  //            fetch('http://localhost:8000/api/registrations/', {
  //             method: 'POST',
  //             headers: {
  //               'Accept': 'application/json',
  //               'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //               name: formData.name,
  //               email: formData.email,
  //               user_email: user?.email,
  //               phone_number: formData.number,
  //               division: formData.division,
  //               district: formData.district,
  //               area: formData.area,
  //               address: formData.address,
  //               with_jersey: formData.jerseyOption=="withJersey",
  //               account_number:"123456789012",
  //               payment_method:"Nagad",
  //               transaction_id:"rdxt",
  //               })
  //           });
            
  //       setFormData({
  //         name: '',
  //         email: '',
  //         number: '',
  //         division: '',
  //         district: '',
  //         area: '',
  //         address: '',
  //         jerseyOption: ''
  //       });
        
  //       setIsSubmitting(false);
  //       setShowAmount(false);
        
  //       // Show success message
  //       alert('Registration successful! Thank you for participating.');
  //     }, 1500);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    setLoading(true);
  
    try {
      console.log("Submitting form...");
      initiatePayment()
      // User creation logic
      let currentUser = user;
      if (!currentUser) {
        const userCredential = await createUserEmailPass(formData.name, formData.email, formData.password);
        currentUser = userCredential.user;
        
        await updateProfile(currentUser, {
          displayName: formData.name
        });
        console.log("Profile updated!");
      }
  
      // Registration API call
      // const response = await fetch('http://localhost:8000/api/registrations/', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     user_email: currentUser?.email,
      //     phone_number: formData.number,
      //     division: formData.division,
      //     district: formData.district,
      //     area: formData.area,
      //     address: formData.address,
      //     with_jersey: formData.jerseyOption === "withJersey",
      //     t_shirt_size: formData.t_size===''?'NO':formData.t_size,
      //     account_number: "123456789012",
      //     payment_method: formData.payment_method,
      //     transaction_id: "rdxt",
      //   })
      // });
  
      // if (!response.ok) {
      //   throw new Error('Registration failed');
      // }
  
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        number: '',
        division: '',
        district: '',
        area: '',
        address: '',
        jerseyOption: '',
        t_size: `${formData.jerseyOption === "withJersey" && formData.t_size ===''?'M':''}`,
        payment_method: ''
      });
      
      setShowAmount(false);
      alert('Registration successful! Thank you for participating.');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  const initiatePayment = async () => {
    const full_address = formData.address + ',' + formData.area + ',' + formData.district + ',' + formData.division
    const res = await fetch('http://localhost:8000/api/payments/api/create-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_id:'xxx',
        amount: formData.jerseyOption === "withJersey"?800:650,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_address: full_address,
        customer_phone: formData.number.toString(),  // Keep as string
        product_name: "7.5k virtual run" ,
        customer_city: formData.area,
        customer_postcode: '1230',
      }),
    });
  
    const data = await res.json();
    if (data.gateway_url) {
      window.location.href = data.gateway_url
  
        } else {
      alert("Failed to initiate payment");
    }
    console.log(data);
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

              {/* Division */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="division">
        Division
        </label>
        <div className={`relative ${isFocused.division ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
          <select
            id='division'
            name='division'
            value={formData.division}
            onChange={handleChange}
            onFocus={() => setIsFocused({...isFocused, division: true})}
            onBlur={() => setIsFocused({...isFocused, division: false})}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
              errors?.division 
                ? 'ring-2 ring-red-500' 
                : 'focus:ring-2 focus:ring-sport-blue'
            }`}
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors.address && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.address}
              </p>
            )}
          </div>
        </div>
              {/* District */}

              <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
        District
        </label>
        <div className={`relative ${isFocused.district ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
          <select
            id='district'
            name='district'
            value={formData.district}
            onChange={handleChange}
            onFocus={() => setIsFocused({...isFocused, district: true})}
            onBlur={() => setIsFocused({...isFocused, district: false})}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
              errors?.district 
                ? 'ring-2 ring-red-500' 
                : 'focus:ring-2 focus:ring-sport-blue'
            }`}
            disabled={formData.division == ''}
          >
            <option value="">{formData.division == ''?"Select division before select district":"Select District"}</option>
            {bangladeshDivisions[formData.division]?.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
          {errors?.district && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors?.district}
              </p>
            )}
          </div>
        
        </div>
        

        {/* Area */}
        
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="area">
                  Area
        </label>
        <div className={`relative ${isFocused.area ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            onFocus={() => setIsFocused({...isFocused, area: true})}
            onBlur={() => setIsFocused({...isFocused, area: false})}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
              errors.area 
                ? 'ring-2 ring-red-500' 
                : 'focus:ring-2 focus:ring-sport-blue'
            }`}
            placeholder="Your Area name"
          />
          {errors.area && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.area}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
        Address
        </label>
        <div className={`relative ${isFocused.address ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onFocus={() => setIsFocused({...isFocused, address: true})}
            onBlur={() => setIsFocused({...isFocused, address: false})}
            className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
              errors.address 
                ? 'ring-2 ring-red-500' 
                : 'focus:ring-2 focus:ring-sport-blue'
            }`}
            placeholder="Your address name"
          />
          
          </div>
        </div>
              
        
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
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
              {/* if selected jersey size will show */}
              {
                formData.jerseyOption === 'withJersey'?<div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Jersey Size
                </label>
                {/* start */}
                <div className='space-x-2 flex items-center '>
                  {/* first M */}
                  <div className="">
                    <input
                      type="radio"
                      id="M"
                      name="t_size"
                      value="M"
                      checked={formData.t_size === 'M'}
                      onChange={handleChange}
                      className="appearance-none text-sport-blue focus:ring-sport-blue"
                    />
                    <label htmlFor="M" className={formData.t_size === 'M'?"bg-blue-200 px-3 py-1 rounded-2xl border-2 text-gray-700":"px-3 py-1 rounded-2xl border-2 text-gray-700"}>
                      M
                    </label>
                  </div>
                  {/* second L */}
                  <div className="">
                    <input
                      type="radio"
                      id="L"
                      name="t_size"
                      value="L"
                      checked={formData.t_size === 'L'}
                      onChange={handleChange}
                      className="appearance-none text-sport-blue focus:ring-sport-blue"
                    />
                    <label htmlFor="L" className={formData.t_size === 'L'?"bg-blue-200 px-3 py-1 rounded-2xl border-2 text-gray-700":"px-3 py-1 rounded-2xl border-2 text-gray-700"}>
                      L
                    </label>
                  </div>
                  {/* second XL */}
                  <div className="">
                    <input
                      type="radio"
                      id="XL"
                      name="t_size"
                      value="XL"
                      checked={formData.t_size === 'XL'}
                      onChange={handleChange}
                      className="appearance-none text-sport-blue focus:ring-sport-blue"
                    />
                    <label htmlFor="XL" className={formData.t_size === 'XL'?"bg-blue-200 px-3 py-1 rounded-2xl border-2 text-gray-700":"px-3 py-1 rounded-2xl border-2 text-gray-700"}>
                      XL
                    </label>
                  </div>
                  {/* second XXL */}
                  <div className="">
                    <input
                      type="radio"
                      id="XXL"
                      name="t_size"
                      value="XXL"
                      checked={formData.t_size === 'XXL'}
                      onChange={handleChange}
                      className="appearance-none text-sport-blue focus:ring-sport-blue"
                      
                    />
                    <label htmlFor="XXL" className={formData.t_size === 'XXL'?"bg-blue-200 px-3 py-1 rounded-2xl border-2 text-gray-700":"px-3 py-1 rounded-2xl border-2 text-gray-700"}>
                      XXL
                    </label>
                  </div>
                </div>
              </div>:""
              }
              

              {/* Payment Method */}
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="payment_method">
              Payment Method
              </label>
              <div className={`relative ${isFocused.payment_method ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
                <select
                  id='payment_method'
                  name='payment_method'
                  value={formData.payment_method}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({...isFocused, payment_method: true})}
                  onBlur={() => setIsFocused({...isFocused, payment_method: false})}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
                    errors?.payment_method 
                      ? 'ring-2 ring-red-500' 
                      : 'focus:ring-2 focus:ring-sport-blue'
                  }`}
                >
                  <option value="">Select payment method</option>
                  {payment_method.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
                {errors.payment_method && (
                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                      {errors.payment_method}
                    </p>
                  )}
                </div>
              </div>
              {errors.address && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.address}
              </p>
            )}
              {showAmount && (
                <div className="p-4 bg-gray-50 rounded-lg w-full overflow-x-auto">
                  <p 
                    ref={paymentTextRef} 
                    className="font-medium text-sport-blue break-words"
                  ></p>
                </div>
              )}
              
              {/* Password */}
              {
                user===null?<div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Create your password
                </label>
                <div className={`relative ${isFocused.password ? 'transform scale-[1.01] transition-transform duration-300' : ''}`}>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsFocused({...isFocused, password: true})}
                    onBlur={() => setIsFocused({...isFocused, password: false})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 transition-all duration-200 outline-none ${
                      errors.password 
                        ? 'ring-2 ring-red-500' 
                        : 'focus:ring-2 focus:ring-sport-blue'
                    }`}
                    placeholder="Create your password "
                  />
                  {errors.password && (
                      <p className="text-red-500 text-sm mt-1 animate-fade-in">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>:""
              }

              {
                isFormValid&&
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full  rounded-lg font-medium text-white transition-all duration-300 ${
                      isFormValid && !isSubmitting
                        ? 'bg-sport-blue hover:bg-blue-600 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center h-3">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      formData.payment_method === 'Bkash'&&
                      <div className='flex items-center justify-center'>
                        <img className='w-20' src={Bkash_logo} alt="" srcset="" />
                        <p className='font-semibold'>Bkash Payment</p>
                      </div> ||
                      formData.payment_method === 'Nagad'&&
                      <div className='flex items-center justify-center'>
                        <img className='w-20' src={Nagad_logo} alt="" srcset="" />
                        <p className='font-semibold'>Nagad Payment</p>
                      </div> ||
                      formData.payment_method === 'Rocket'&&
                      <div className='flex items-center justify-center'>
                        <img className='w-14' src={Rocket_logo} alt="" srcset="" />
                        <p className='font-semibold'>Rocket Payment</p>
                      </div>
                    

                      
                    )}
                  </button>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
