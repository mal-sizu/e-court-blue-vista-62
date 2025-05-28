
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Calendar, 
  Users, 
  Database,
  Clock,
  Plus
} from 'lucide-react';
import WelcomeHeader from './WelcomeHeader';
import StatsGrid from './StatsGrid';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <WelcomeHeader userName={user?.fullName} />
      
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <RecentActivity activities={recentActivity} />
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
};

export default Dashboard;
