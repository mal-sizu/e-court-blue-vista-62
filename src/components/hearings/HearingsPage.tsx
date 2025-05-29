import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { ScheduleHearingForm } from '../forms';
import hearingService from '../../services/hearingService';

const HearingsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hearings, setHearings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMock, setIsMock] = useState(false);

  // Mock hearings data
  const mockHearings = [
    {
      id: 'HEAR-001',
      title: 'Civil Case Hearing: Smith vs. Jones',
      date: '2024-06-10',
      time: '10:00 AM',
      courtroom: 'Courtroom 1',
      judge: 'Hon. Alice Johnson',
      type: 'Civil',
      status: 'Scheduled',
    },
    {
      id: 'HEAR-002',
      title: 'Criminal Case Hearing: State vs. Doe',
      date: '2024-06-12',
      time: '2:00 PM',
      courtroom: 'Courtroom 2',
      judge: 'Hon. Bob Smith',
      type: 'Criminal',
      status: 'In Progress',
    },
    {
      id: 'HEAR-003',
      title: 'Labour Tribunal: Union vs. Factory',
      date: '2024-06-15',
      time: '9:00 AM',
      courtroom: 'Courtroom 3',
      judge: 'Hon. Carol Lee',
      type: 'Labour',
      status: 'Postponed',
    },
    {
      id: 'HEAR-004',
      title: 'Civil Case Hearing: Brown vs. Green',
      date: '2024-06-18',
      time: '11:30 AM',
      courtroom: 'Courtroom 1',
      judge: 'Hon. David Kim',
      type: 'Civil',
      status: 'Completed',
    },
  ];

  useEffect(() => {
    const fetchHearings = async () => {
      setLoading(true);
      setIsMock(false);
      try {
        const data = await hearingService.getAllHearings();
        setHearings(Array.isArray(data) ? data : []);
      } catch (err) {
        setIsMock(true);
        setHearings(mockHearings);
      } finally {
        setLoading(false);
      }
    };
    fetchHearings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-green-100 text-green-800';
      case 'Postponed': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading hearings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isMock && (
        <div className="mb-2 text-sm text-blue-500 bg-blue-50 rounded px-3 py-1 w-fit">Showing mock data</div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hearings</h1>
          <p className="text-gray-600">Schedule and manage court hearings</p>
        </div>

         <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Hearing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ScheduleHearingForm />
          </DialogContent>
        </Dialog>

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
