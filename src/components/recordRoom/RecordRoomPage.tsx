import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Archive, Search, Filter, Plus, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { AddRecordForm } from '../forms';
import { getAllRecords } from '../../services/recordRoomService';

const RecordRoomPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllRecords();
        setRecords(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load records.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Case File': return 'bg-blue-100 text-blue-800';
      case 'Investigation': return 'bg-red-100 text-red-800';
      case 'Labour Record': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Record Room</h1>
          <p className="text-gray-600">Manage physical and digital records</p>
        </div>

         <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddRecordForm />
          </DialogContent>
        </Dialog>

      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search records..." className="pl-10" />
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

      {/* Records Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Archive className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">{record.id}</CardTitle>
                        <Badge variant="outline" className={getTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{record.title}</p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Case:</span>
                      <span className="font-medium text-blue-600">{record.caseId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{record.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pages:</span>
                      <span className="font-medium">{record.pages}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
                    <Calendar className="h-4 w-4 mr-1" />
                    {record.date}
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
                    <th className="text-left p-4 font-medium text-gray-700">Record ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Title</th>
                    <th className="text-left p-4 font-medium text-gray-700">Type</th>
                    <th className="text-left p-4 font-medium text-gray-700">Case</th>
                    <th className="text-left p-4 font-medium text-gray-700">Location</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                    <th className="text-left p-4 font-medium text-gray-700">Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-4 font-medium text-blue-600">{record.id}</td>
                      <td className="p-4">{record.title}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={getTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                      </td>
                      <td className="p-4 text-blue-600 font-medium">{record.caseId}</td>
                      <td className="p-4">{record.location}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                      </td>
                      <td className="p-4">{record.pages}</td>
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

export default RecordRoomPage;
