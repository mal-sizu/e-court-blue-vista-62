
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ApprovalStatus } from '../../constants/dataTypes';
import Button from '../ui/Button';
import CaseRequestForm from './CaseRequestForm';

const CaseRequestDashboard = () => {
  const [caseRequests, setCaseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data - replace with actual API call
  const mockData = [
    {
      id: '1',
      requestNumber: 'CR-2024-001',
      caseTitle: 'Contract Dispute Case',
      caseCategory: 'Civil Case',
      caseType: 'Money Recovery (MR)',
      createdDate: '2024-01-15',
      status: 'Pending',
      createdBy: 'John Doe'
    },
    {
      id: '2',
      requestNumber: 'CR-2024-002',
      caseTitle: 'Theft Investigation',
      caseCategory: 'Criminal Case',
      caseType: 'Criminal (CR)',
      createdDate: '2024-01-16',
      status: 'Approved',
      createdBy: 'Jane Smith'
    },
    {
      id: '3',
      requestNumber: 'CR-2024-003',
      caseTitle: 'Employment Dispute',
      caseCategory: 'Labour Case',
      caseType: 'Labour Tribunal (LT)',
      createdDate: '2024-01-17',
      status: 'Rejected',
      createdBy: 'Mike Johnson'
    }
  ];

  useEffect(() => {
    const fetchCaseRequests = async () => {
      setLoading(true);
      try {
        // Mock API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCaseRequests(mockData);
      } catch (error) {
        console.error('Error fetching case requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseRequests();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case ApprovalStatus.Pending:
        return 'bg-yellow-100 text-yellow-800';
      case ApprovalStatus.Approved:
        return 'bg-green-100 text-green-800';
      case ApprovalStatus.Rejected:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateSuccess = () => {
    // Refresh the data
    console.log('Case request created successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Requests</h1>
          <p className="text-gray-600">Manage and track all case requests</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          Create New Request
        </Button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by request number..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="Civil Case">Civil Case</option>
            <option value="Criminal Case">Criminal Case</option>
            <option value="Labour Case">Labour Case</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button variant="outline">
            Search
          </Button>
        </div>
      </motion.div>

      {/* Case Requests Table */}
      <motion.div 
        className="bg-white shadow rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {caseRequests.map((request, index) => (
                <motion.tr 
                  key={request.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {request.requestNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.caseTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.caseCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.caseType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.createdDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Create Case Request Modal */}
      <CaseRequestForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default CaseRequestDashboard;
