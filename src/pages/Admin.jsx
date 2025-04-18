
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Trash2, Edit, Plus, Search, FileText, User, Download, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/Provider/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DeleteConfirmationModal from '../components/admin/DeleteConfirmationModal';
import RegistrationForm from '../components/admin/AdminRegistrationForm';
import Loader from '../components/ui/Loader';
import { useIsMobile } from '../hooks/use-mobile';

// Initial sample data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "01712345678",
    division: "Dhaka",
    district: "Dhaka",
    area: "Gulshan",
    address: "House 123, Road 12, Block F, Gulshan-1",
    hasJersey: true
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "01812345678",
    division: "Chittagong",
    district: "Chittagong",
    area: "Agrabad",
    address: "Apartment 45, Building B, Agrabad Commercial Area",
    hasJersey: false
  },
];

const Admin = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(initialUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('table');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  const handleAddUser = (userData) => {
    const newUser = {
      ...userData,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      hasJersey: userData.jerseyOption === 'withJersey'
    };
    setUsers([...users, newUser]);
    console.log("Added new user:", newUser);
  };

  const handleEditUser = (userData) => {
    if (selectedUser) {
      const updatedUser = {
        ...userData,
        id: selectedUser.id,
        hasJersey: userData.jerseyOption === 'withJersey'
      };
      
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      console.log("Updated user:", updatedUser);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(u => u.id !== selectedUser.id);
      setUsers(updatedUsers);
      console.log("Deleted user:", selectedUser);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users and registrations</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="bg-sport-blue p-4 text-white flex justify-between items-center">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <h2 className="text-lg font-semibold">User Management</h2>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentView('table')} 
                  className={`p-2 rounded-md transition-colors ${currentView === 'table' ? 'bg-white text-sport-blue' : 'bg-sport-blue/80 text-white'}`}
                >
                  <FileText className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentView('grid')} 
                  className={`p-2 rounded-md transition-colors ${currentView === 'grid' ? 'bg-white text-sport-blue' : 'bg-sport-blue/80 text-white'}`}
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-sport-blue text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add User
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    <Download className="mr-2 h-5 w-5" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            {currentView === 'table' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      {!isMobile && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey Status</th>
                        </>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                        {!isMobile && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.area}, {user.district}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  user.hasJersey
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {user.hasJersey ? 'With Jersey' : 'Without Jersey'}
                              </span>
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                              onClick={() => openEditModal(user)}
                              title="Edit"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                              onClick={() => openDeleteModal(user)}
                              title="Delete"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {user.area}, {user.district}, {user.division}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.hasJersey
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.hasJersey ? 'With Jersey' : 'Without Jersey'}
                      </span>
                    </div>
                    <div className="flex mt-4 space-x-2 justify-end border-t pt-3">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100 transition-colors"
                        onClick={() => openEditModal(user)}
                        title="Edit"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 transition-colors"
                        onClick={() => openDeleteModal(user)}
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Add New User</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <RegistrationForm 
                onSubmit={handleAddUser} 
                onCancel={() => setIsAddModalOpen(false)} 
                isAdmin={true}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <RegistrationForm 
                onSubmit={handleEditUser} 
                onCancel={() => setIsEditModalOpen(false)} 
                initialData={{
                  name: selectedUser?.name || '',
                  email: selectedUser?.email || '',
                  number: selectedUser?.phone || '',
                  division: selectedUser?.division || '',
                  district: selectedUser?.district || '',
                  area: selectedUser?.area || '',
                  address: selectedUser?.address || '',
                  jerseyOption: selectedUser?.hasJersey ? 'withJersey' : 'withoutJersey',
                }}
                isAdmin={true}
                isEdit={true}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ''}
      />
      
      <Footer />
    </div>
  );
};

export default Admin;
