import React from 'react';
import { Trash2 } from 'lucide-react';

// Sample data - in a real app this would come from an API or database
const users = [
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

function Admin() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Data Table</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Division</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jersey Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.division}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.area}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      disabled
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        user.hasJersey
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.hasJersey ? 'With Jersey' : 'Without Jersey'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => alert(`Delete user: ${user.id}`)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;