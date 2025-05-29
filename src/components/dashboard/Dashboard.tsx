import React, { useEffect, useState } from 'react';
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
import dashboardService from '../../services/dashboardService';

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map API stats keys to UI config
  const statConfig = [
    {
      key: 'totalCases',
      name: 'Total Cases',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      key: 'pendingRequests',
      name: 'Pending Requests',
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      key: 'todaysHearings',
      name: "Today's Hearings",
      icon: Calendar,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      key: 'evidenceItems',
      name: 'Evidence Items',
      icon: Database,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch stats and activity in parallel
        const [statsRes, activityRes] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getActivityTimeline(),
        ]);

        // Map stats to UI format
        const mappedStats = statConfig.map((cfg) => ({
          name: cfg.name,
          value: statsRes?.[cfg.key]?.value?.toString() || '0',
          change: statsRes?.[cfg.key]?.change || '+0%',
          trend: statsRes?.[cfg.key]?.trend || 'up',
          icon: cfg.icon,
          color: cfg.color,
          bgColor: cfg.bgColor,
          iconColor: cfg.iconColor,
        }));
        setStats(mappedStats);

        // Map activity to UI format (fallback to empty array)
        setRecentActivity(
          Array.isArray(activityRes) ? activityRes : []
        );
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: 'New Case Request',
      description: 'Create and submit new case',
      href: '/case-requests',
      icon: Plus,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Schedule Hearing',
      description: 'Book court hearings',
      href: '/hearings',
      icon: Calendar,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Review Evidence',
      description: 'Manage case evidence',
      href: '/evidence',
      icon: Database,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'User Management',
      description: 'Manage system users',
      href: '/users',
      icon: Users,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
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
