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
  const [isMock, setIsMock] = useState(false);

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

  // Mock data for fallback
  const mockStatsRes = {
    totalCases: { value: 120, change: '+5%', trend: 'up' },
    pendingRequests: { value: 8, change: '-2%', trend: 'down' },
    todaysHearings: { value: 3, change: '+1%', trend: 'up' },
    evidenceItems: { value: 45, change: '+10%', trend: 'up' },
  };
  const mockActivity = [
    { id: 1, type: 'case', description: 'Case #1234 created', date: '2024-06-01' },
    { id: 2, type: 'hearing', description: 'Hearing scheduled for Case #1234', date: '2024-06-02' },
    { id: 3, type: 'evidence', description: 'Evidence uploaded for Case #1234', date: '2024-06-03' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setIsMock(false);
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
        setIsMock(true);
        // Use mock data
        const mappedStats = statConfig.map((cfg) => ({
          name: cfg.name,
          value: mockStatsRes?.[cfg.key]?.value?.toString() || '0',
          change: mockStatsRes?.[cfg.key]?.change || '+0%',
          trend: mockStatsRes?.[cfg.key]?.trend || 'up',
          icon: cfg.icon,
          color: cfg.color,
          bgColor: cfg.bgColor,
          iconColor: cfg.iconColor,
        }));
        setStats(mappedStats);
        setRecentActivity(mockActivity);
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

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <WelcomeHeader userName={user?.fullName} />
      
      {isMock && (
        <div className="mb-2 text-sm text-blue-500 bg-blue-50 rounded px-3 py-1 w-fit">Showing mock data</div>
      )}

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <RecentActivity activities={recentActivity} />
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
};

export default Dashboard;
