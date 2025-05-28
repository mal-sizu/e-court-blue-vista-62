
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ApprovalStatus } from '../../constants/dataTypes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import CaseRequestForm from './CaseRequestForm';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  User, 
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react';

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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case ApprovalStatus.Pending:
        return { 
          color: 'bg-amber-100 text-amber-800 border-amber-200', 
          icon: Clock,
          iconColor: 'text-amber-600'
        };
      case ApprovalStatus.Approved:
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case ApprovalStatus.Rejected:
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  const handleCreateSuccess = () => {
    console.log('Case request created successfully');
    setShowCreateForm(false);
  };

  const stats = [
    { name: 'Total Requests', value: '156', change: '+12%', icon: FileText },
    { name: 'Pending', value: '23', change: '+5%', icon: Clock },
    { name: 'Approved', value: '98', change: '+8%', icon: CheckCircle },
    { name: 'This Month', value: '34', change: '+15%', icon: Calendar }
  ];

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
      {/* Header */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Case Requests</h1>
          <p className="text-gray-600 mt-1">Manage and track all case requests efficiently</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Request
        </Button>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by request number or case title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Civil Case">Civil Case</SelectItem>
                    <SelectItem value="Criminal Case">Criminal Case</SelectItem>
                    <SelectItem value="Labour Case">Labour Case</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Case Requests Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Case Requests ({caseRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Request Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category & Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {caseRequests.map((request, index) => {
                    const statusConfig = getStatusConfig(request.status);
                    const StatusIcon = statusConfig.icon;
                    
                    return (
                      <motion.tr 
                        key={request.id}
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-blue-600">{request.requestNumber}</p>
                            <p className="text-sm text-gray-900 font-medium">{request.caseTitle}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <User className="h-3 w-3" />
                              <span>{request.createdBy}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">{request.caseCategory}</p>
                            <p className="text-xs text-gray-500">{request.caseType}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{request.createdDate}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${statusConfig.color} flex items-center space-x-1 w-fit`}>
                            <StatusIcon className="h-3 w-3" />
                            <span>{request.status}</span>
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
