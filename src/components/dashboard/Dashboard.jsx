
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  Users, 
  Database,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      name: 'Total Cases', 
      value: '156', 
      change: '+12%', 
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    { 
      name: 'Pending Requests', 
      value: '23', 
      change: '+5%', 
      trend: 'up',
      icon: Clock,
      color: 'yellow'
    },
    { 
      name: 'Hearings Today', 
      value: '8', 
      change: '+2%', 
      trend: 'up',
      icon: Calendar,
      color: 'green'
    },
    { 
      name: 'Evidence Items', 
      value: '342', 
      change: '+18%', 
      trend: 'up',
      icon: Database,
      color: 'purple'
    }
  ];

  const recentActivity = [
    { 
      action: 'New case request submitted', 
      time: '2 hours ago', 
      type: 'request',
      status: 'pending'
    },
    { 
      action: 'Hearing scheduled for Case #2024-001', 
      time: '4 hours ago', 
      type: 'hearing',
      status: 'scheduled'
    },
    { 
      action: 'Evidence uploaded for Case #2024-003', 
      time: '6 hours ago', 
      type: 'evidence',
      status: 'completed'
    },
    { 
      action: 'Case #2024-002 approved', 
      time: '1 day ago', 
      type: 'approval',
      status: 'completed'
    }
  ];

  const quickActions = [
    {
      title: 'Case Requests',
      description: 'Review and manage case requests',
      href: '/case-requests',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Schedule Hearing',
      description: 'Schedule new court hearings',
      href: '/hearings',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Evidence Review',
      description: 'Review submitted evidence',
      href: '/evidence',
      icon: Database,
      color: 'purple'
    },
    {
      title: 'User Management',
      description: 'Manage system users',
      href: '/users',
      icon: Users,
      color: 'orange'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-light text-gray-900">
          Welcome back, {user?.fullName}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your court system today
        </p>
      </motion.div>

      {/* Statistics Grid */}
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
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.a
                      key={action.title}
                      href={action.href}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-center space-y-2">
                        <div className="mx-auto w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
