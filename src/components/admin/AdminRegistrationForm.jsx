
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, Home, Check } from 'lucide-react';

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

const bangladeshDivisions = {
  Dhaka: [
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur",
    "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: [
    "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajgonj",
  ],
  Rangpur: [
    "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
  ],
  Barisal: ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Chattogram: [
    "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar",
    "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati",
  ],
  Sylhet: ["Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"],
  Khulna: [
    "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia",
    "Magura", "Meherpur", "Narail", "Satkhira",
  ],
};

const AdminRegistrationForm = ({ onSubmit, onCancel, initialData, isAdmin = false, isEdit = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      email: '',
      number: '',
      division: '',
      district: '',
      area: '',
      address: '',
      jerseyOption: '',
      t_size: 'M',
    }
  );
  
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate form on data change
  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.number.trim() !== '' && 
      formData.division.trim() !== '' && 
      formData.district.trim() !== '' && 
      formData.area.trim() !== '' && 
      formData.address.trim() !== '' && 
      formData.jerseyOption !== '';
    
    setIsFormValid(isValid);
  }, [formData]);
  
  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
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
    
    if (!formData.area.trim()) {
      newErrors.area = 'Area is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
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
      console.log("Form is valid, submitting:", formData);
      onSubmit(formData);
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-0">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
                placeholder="User's full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="number">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.number ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
                placeholder="Phone number"
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>
          </div>
          
          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="division">
              Division
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="division"
                name="division"
                value={formData.division}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.division ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
              >
                <option value="">Select Division</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-red-500 text-sm mt-1">{errors.division}</p>
              )}
            </div>
          </div>
          
          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
              District
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.district ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
                disabled={formData.division === ''}
              >
                <option value="">
                  {formData.division === '' ? "Select division first" : "Select District"}
                </option>
                {bangladeshDivisions[formData.division]?.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">{errors.district}</p>
              )}
            </div>
          </div>
          
          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="area">
              Area
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg bg-gray-50 border ${
                  errors.area ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
                placeholder="Area name"
              />
              {errors.area && (
                <p className="text-red-500 text-sm mt-1">{errors.area}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
            Full Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-sport-blue focus:border-transparent`}
            placeholder="Full address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        
        {/* Jersey Option */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jersey Status
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="withoutJersey"
                name="jerseyOption"
                value="withoutJersey"
                checked={formData.jerseyOption === 'withoutJersey'}
                onChange={handleChange}
                className="h-4 w-4 text-sport-blue focus:ring-sport-blue border-gray-300"
              />
              <label htmlFor="withoutJersey" className="ml-2 block text-sm text-gray-700">
                Without Jersey
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
                className="h-4 w-4 text-sport-blue focus:ring-sport-blue border-gray-300"
              />
              <label htmlFor="withJersey" className="ml-2 block text-sm text-gray-700">
                With Jersey
              </label>
            </div>
            
            {errors.jerseyOption && (
              <p className="text-red-500 text-sm mt-1">{errors.jerseyOption}</p>
            )}
          </div>
        </div>
        
        {/* T-Shirt Size - Only shown when jersey is selected */}
        {formData.jerseyOption === 'withJersey' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jersey Size
            </label>
            <div className="flex space-x-3">
              {['M', 'L', 'XL', 'XXL'].map(size => (
                <div key={size} className="flex items-center">
                  <input
                    type="radio"
                    id={size}
                    name="t_size"
                    value={size}
                    checked={formData.t_size === size}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor={size}
                    className={`cursor-pointer px-4 py-2 rounded-md border-2 ${
                      formData.t_size === size
                        ? 'border-sport-blue bg-blue-50 text-sport-blue font-medium'
                        : 'border-gray-300 text-gray-700'
                    } hover:bg-gray-50 transition-colors`}
                  >
                    {size}
                    {formData.t_size === size && (
                      <Check className="inline-block ml-1 h-4 w-4" />
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-4 py-2 rounded-md font-medium text-white ${
              isFormValid
                ? 'bg-sport-blue hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {isEdit ? 'Update User' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
