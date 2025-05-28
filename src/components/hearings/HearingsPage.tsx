
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HearingsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const hearings = [
    {
      id: 'H-2024-001',
      caseId: 'C-2024-001',
      title: 'Contract Dispute - Initial Hearing',
      date: '2024-06-15',
      time: '10:00 AM',
      courtroom: 'Courtroom A',
      judge: 'Hon. Sarah Johnson',
      status: 'Scheduled',
      type: 'Initial Hearing'
    },
    {
      id: 'H-2024-002',
      caseId: 'C-2024-002',
      title: 'Theft Case - Evidence Review',
      date: '2024-06-20',
      time: '2:00 PM',
      courtroom: 'Courtroom B',
      judge: 'Hon. Robert Davis',
      status: 'In Progress',
      type: 'Evidence Review'
    },
    {
      id: 'H-2024-003',
      caseId: 'C-2024-003',
      title: 'Employment Dispute - Settlement Conference',
      date: '2024-06-25',
      time: '9:00 AM',
      courtroom: 'Conference Room 1',
      judge: 'Hon. Maria Garcia',
      status: 'Postponed',
      type: 'Settlement'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-green-100 text-green-800';
      case 'Postponed': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hearings</h1>
          <p className="text-gray-600">Schedule and manage court hearings</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Hearing
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search hearings..." className="pl-10" />
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

      {/* Hearings Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hearings.map((hearing, index) => (
            <motion.div
              key={hearing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">{hearing.id}</CardTitle>
                    <Badge className={getStatusColor(hearing.status)}>{hearing.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{hearing.title}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {hearing.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {hearing.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hearing.courtroom}
                  </div>
                  <div className="text-sm space-y-1 pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Judge:</span>
                      <span className="font-medium text-xs">{hearing.judge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{hearing.type}</span>
                    </div>
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
                    <th className="text-left p-4 font-medium text-gray-700">Hearing ID</th>
                    <th className="text-left p-4 font-medium text-gray-700">Title</th>
                    <th className="text-left p-4 font-medium text-gray-700">Date</th>
                    <th className="text-left p-4 font-medium text-gray-700">Time</th>
                    <th className="text-left p-4 font-medium text-gray-700">Courtroom</th>
                    <th className="text-left p-4 font-medium text-gray-700">Judge</th>
                    <th className="text-left p-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {hearings.map((hearing, index) => (
                    <motion.tr
                      key={hearing.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <td className="p-4 font-medium text-blue-600">{hearing.id}</td>
                      <td className="p-4">{hearing.title}</td>
                      <td className="p-4">{hearing.date}</td>
                      <td className="p-4">{hearing.time}</td>
                      <td className="p-4">{hearing.courtroom}</td>
                      <td className="p-4 text-sm">{hearing.judge}</td>
                      <td className="p-4">
                        <Badge className={getStatusColor(hearing.status)}>{hearing.status}</Badge>
                      </td>
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

export default HearingsPage;
