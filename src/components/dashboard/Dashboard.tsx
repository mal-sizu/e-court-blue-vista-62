
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Plus,
  ArrowRight,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Cases',
      value: '2,847',
      change: '+12.3%',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Hearings',
      value: '156',
      change: '+8.1%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Requests',
      value: '89',
      change: '-5.2%',
      changeType: 'negative',
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'Evidence Items',
      value: '1,234',
      change: '+15.7%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case',
      title: 'New case filed: Contract Dispute',
      time: '2 hours ago',
      status: 'new',
      caseId: 'C-2024-001'
    },
    {
      id: 2,
      type: 'hearing',
      title: 'Hearing scheduled for Employment Case',
      time: '4 hours ago',
      status: 'scheduled',
      caseId: 'C-2024-002'
    },
    {
      id: 3,
      type: 'evidence',
      title: 'Evidence uploaded for Theft Case',
      time: '6 hours ago',
      status: 'uploaded',
      caseId: 'C-2024-003'
    },
    {
      id: 4,
      type: 'case',
      title: 'Case approved: Labor Dispute',
      time: '1 day ago',
      status: 'approved',
      caseId: 'C-2024-004'
    }
  ];

  const upcomingHearings = [
    {
      id: 1,
      caseId: 'C-2024-001',
      title: 'Contract Dispute - Initial Hearing',
      date: '2024-06-15',
      time: '10:00 AM',
      courtroom: 'Courtroom A',
      judge: 'Hon. Sarah Johnson'
    },
    {
      id: 2,
      caseId: 'C-2024-002',
      title: 'Employment Issue - Settlement',
      date: '2024-06-16',
      time: '2:00 PM',
      courtroom: 'Courtroom B',
      judge: 'Hon. Robert Davis'
    },
    {
      id: 3,
      caseId: 'C-2024-003',
      title: 'Property Dispute - Evidence Review',
      date: '2024-06-17',
      time: '9:30 AM',
      courtroom: 'Courtroom C',
      judge: 'Hon. Maria Garcia'
    }
  ];

  const quickActions = [
    {
      title: 'New Case Request',
      description: 'Create a new case request',
      icon: FileText,
      action: () => navigate('/case-requests'),
      color: 'bg-blue-500'
    },
    {
      title: 'Schedule Hearing',
      description: 'Schedule a new hearing',
      icon: Calendar,
      action: () => navigate('/hearing'),
      color: 'bg-green-500'
    },
    {
      title: 'Upload Evidence',
      description: 'Add new evidence',
      icon: Activity,
      action: () => navigate('/evidence-form'),
      color: 'bg-purple-500'
    },
    {
      title: 'Add User',
      description: 'Create new user account',
      icon: Users,
      action: () => navigate('/user'),
      color: 'bg-orange-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'uploaded': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your legal management system.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`h-4 w-4 mr-1 ${
                        stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-auto p-4 hover:shadow-md transition-shadow"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-md ${action.color} mr-3`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="xl:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <span className="text-sm text-blue-600 font-medium">{activity.caseId}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Upcoming Hearings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Hearings</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate('/hearings')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Case ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Courtroom</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Judge</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingHearings.map((hearing, index) => (
                    <motion.tr
                      key={hearing.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <td className="py-3 px-4 font-medium text-blue-600">{hearing.caseId}</td>
                      <td className="py-3 px-4">{hearing.title}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{hearing.date}</p>
                          <p className="text-sm text-gray-500">{hearing.time}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{hearing.courtroom}</td>
                      <td className="py-3 px-4 text-sm">{hearing.judge}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
