
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface User {
  name: string;
  email: string;
  phone: string;
  division: string;
  district: string;
  area: string;
  address: string;
  hasJersey: boolean;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: User;
  onSubmit: (data: User) => void;
  isEdit?: boolean;
}

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  initialData, 
  onSubmit,
  isEdit = false
}: RegistrationModalProps) => {
  const [formData, setFormData] = useState<User>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      division: 'Dhaka',
      district: '',
      area: '',
      address: '',
      hasJersey: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{isEdit ? 'Edit User' : 'Add New User'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="division">
                Division
              </label>
              <select
                id="division"
                name="division"
                required
                value={formData.division}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">
                District
              </label>
              <input
                id="district"
                name="district"
                type="text"
                required
                value={formData.district}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="area">
                Area
              </label>
              <input
                id="area"
                name="area"
                type="text"
                required
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
              Full Address
            </label>
            <textarea
              id="address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sport-blue focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="hasJersey"
              name="hasJersey"
              type="checkbox"
              checked={formData.hasJersey}
              onChange={handleChange}
              className="h-4 w-4 text-sport-blue focus:ring-sport-blue rounded"
            />
            <label htmlFor="hasJersey" className="ml-2 block text-sm text-gray-700">
              User has a jersey
            </label>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sport-blue text-white rounded-md hover:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
