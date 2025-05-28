
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CaseRequestHeader from './CaseRequestHeader';
import CaseRequestStats from './CaseRequestStats';
import CaseRequestFilters from './CaseRequestFilters';
import CaseRequestTable from './CaseRequestTable';

interface CaseRequest {
  id: string;
  requestNumber: string;
  caseTitle: string;
  caseCategory: string;
  caseType: string;
  createdDate: string;
  status: string;
  createdBy: string;
}

const CaseRequestDashboard = () => {
  const [caseRequests, setCaseRequests] = useState<CaseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Mock data
  const mockData: CaseRequest[] = [
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

  const handleCreateSuccess = () => {
    console.log('Case request created successfully');
    setShowCreateForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case requests...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <CaseRequestHeader />
      
      <CaseRequestStats />
      
      <CaseRequestFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      
      <CaseRequestTable caseRequests={caseRequests} />

    </div>
  );
};

export default CaseRequestDashboard;
