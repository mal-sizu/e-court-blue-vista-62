
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar, 
  Users, 
  Database,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  Plus
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
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      name: 'Pending Requests', 
      value: '23', 
      change: '+5%', 
      trend: 'up',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    { 
      name: 'Today\'s Hearings', 
      value: '8', 
      change: '+2%', 
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      name: 'Evidence Items', 
      value: '342', 
      change: '+18%', 
      trend: 'up',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const recentActivity = [
    { 
      action: 'New case request submitted', 
      time: '2 hours ago', 
      type: 'request',
      status: 'pending',
      priority: 'high'
    },
    { 
      action: 'Hearing scheduled for Case #2024-001', 
      time: '4 hours ago', 
      type: 'hearing',
      status: 'scheduled',
      priority: 'medium'
    },
    { 
      action: 'Evidence uploaded for Case #2024-003', 
      time: '6 hours ago', 
      type: 'evidence',
      status: 'completed',
      priority: 'low'
    },
    { 
      action: 'Case #2024-002 approved', 
      time: '1 day ago', 
      type: 'approval',
      status: 'completed',
      priority: 'medium'
    }
  ];

  const quickActions = [
    {
      title: 'New Case Request',
      description: 'Create and submit new case',
      href: '/case-requests',
      icon: Plus,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Schedule Hearing',
      description: 'Book court hearings',
      href: '/hearings',
      icon: Calendar,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Review Evidence',
      description: 'Manage case evidence',
      href: '/evidence',
      icon: Database,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'User Management',
      description: 'Manage system users',
      href: '/users',
      icon: Users,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <motion.div 
        className="text-center space-y-3 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-light text-gray-900 tracking-tight">
          Welcome back, <span className="font-medium">{user?.fullName}</span>
        </h1>
        <p className="text-lg text-gray-600">
          Here's your court system overview for today
        </p>
      </motion.div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
                        <span className="text-sm text-gray-500">vs last month</span>
                      </div>
                    </div>
                    <div className={`p-4 ${stat.bgColor} rounded-2xl group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`h-8 w-8 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div 
          className="xl:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <Button variant="outline" size="sm" className="text-gray-600">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{activity.action}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <Badge variant="outline" className={`text-xs ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </Badge>
                      </div>
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
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.a
                      key={action.title}
                      href={action.href}
                      className="block p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${action.bgColor} rounded-lg group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-5 w-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {action.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
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
