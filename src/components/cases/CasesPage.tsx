  import React, { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
  import { Search, Filter, Plus, Calendar, Users, FileText } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Badge } from '@/components/ui/badge';
  import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
  import { NewCaseForm } from '../forms';
  import caseService from '@/services/caseService';

  interface Case {
    id: string;
    title: string;
    type: string;
    status: string;
    priority: string;
    plaintiff: string;
    defendant: string;
    nextHearing: string;
    assignedJudge: string;
  }

  const CasesPage = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all cases on mount
    useEffect(() => {
      fetchCases();
    }, []);

    // Search cases when searchTerm changes
    useEffect(() => {
      if (searchTerm.trim() === '') {
        fetchCases();
      } else {
        searchCases(searchTerm);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const fetchCases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await caseService.getAllCases();
        setCases(response);
      } catch (err) {
        setError('Failed to fetch cases. Please try again.');
        console.error('Error fetching cases:', err);
        // Fallback to mock data if API fails
        setCases([
          {
            id: 'C-2024-001',
            title: 'Contract Dispute Resolution',
            type: 'Civil',
            status: 'Active',
            priority: 'High',
            plaintiff: 'John Smith',
            defendant: 'ABC Corp',
            nextHearing: '2024-06-15',
            assignedJudge: 'Hon. Sarah Johnson'
          },
          {
            id: 'C-2024-002', 
            title: 'Theft Investigation',
            type: 'Criminal',
            status: 'Under Review',
            priority: 'Medium',
            plaintiff: 'State vs.',
            defendant: 'Michael Brown',
            nextHearing: '2024-06-20',
            assignedJudge: 'Hon. Robert Davis'
          },
          {
            id: 'C-2024-003',
            title: 'Employment Discrimination',
            type: 'Labour',
            status: 'Pending',
            priority: 'Low',
            plaintiff: 'Jane Doe',
            defendant: 'XYZ Industries',
            nextHearing: '2024-06-25',
            assignedJudge: 'Hon. Maria Garcia'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    // Backend search
    const searchCases = async (term: string) => {
      try {
        setLoading(true);
        setError(null);
        const response = await caseService.searchCases({ query: term });
        setCases(response);
      } catch (err) {
        setError('Failed to search cases. Please try again.');
        console.error('Error searching cases:', err);
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Under Review': return 'bg-yellow-100 text-yellow-800';
        case 'Pending': return 'bg-blue-100 text-blue-800';
        case 'Closed': return 'bg-gray-100 text-gray-800';
        case 'Dismissed': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'High': return 'bg-red-100 text-red-800';
        case 'Medium': return 'bg-orange-100 text-orange-800';
        case 'Low': return 'bg-green-100 text-green-800';
        case 'Urgent': return 'bg-purple-100 text-purple-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    if (loading) {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
              <p className="text-gray-600">Manage and track all court cases</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Cases</h1>
            <p className="text-gray-600">Manage and track all court cases</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent>
              <NewCaseForm onCaseCreated={fetchCases} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <span className="text-sm">{error}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchCases}
                  className="ml-auto"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search cases..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cases Display */}
        {cases.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating your first case.'}
              </p>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{caseItem.id}</CardTitle>
                      <Badge variant="outline" className={getPriorityColor(caseItem.priority)}>
                        {caseItem.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{caseItem.title}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Status</span>
                      <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{caseItem.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Judge:</span>
                        <span className="font-medium text-xs">{caseItem.assignedJudge}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                      <Calendar className="h-4 w-4 mr-1" />
                      Next: {caseItem.nextHearing}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-700">Case ID</th>
                      <th className="text-left p-4 font-medium text-gray-700">Title</th>
                      <th className="text-left p-4 font-medium text-gray-700">Type</th>
                      <th className="text-left p-4 font-medium text-gray-700">Status</th>
                      <th className="text-left p-4 font-medium text-gray-700">Priority</th>
                      <th className="text-left p-4 font-medium text-gray-700">Judge</th>
                      <th className="text-left p-4 font-medium text-gray-700">Next Hearing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((caseItem, index) => (
                      <motion.tr
                        key={caseItem.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="p-4 font-medium text-blue-600">{caseItem.id}</td>
                        <td className="p-4">{caseItem.title}</td>
                        <td className="p-4">{caseItem.type}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={getPriorityColor(caseItem.priority)}>
                            {caseItem.priority}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">{caseItem.assignedJudge}</td>
                        <td className="p-4 text-sm">{caseItem.nextHearing}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  export default CasesPage;
