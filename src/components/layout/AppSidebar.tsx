import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  FolderOpen, 
  Database,
  LogOut,
  User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../constants/dataTypes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AppSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      roles: Object.values(UserRole) 
    },
    { 
      name: 'Case Requests', 
      path: '/case-requests', 
      icon: FileText, 
      roles: [UserRole.Registrar, UserRole.CourtClerk] 
    },
    { 
      name: 'Cases', 
      path: '/cases', 
      icon: FolderOpen, 
      roles: Object.values(UserRole) 
    },
    { 
      name: 'Hearings', 
      path: '/hearings', 
      icon: Calendar, 
      roles: Object.values(UserRole) 
    },
    { 
      name: 'Evidence', 
      path: '/evidence', 
      icon: Database, 
      roles: Object.values(UserRole) 
    },
    { 
      name: 'Record Room', 
      path: '/record-room', 
      icon: FolderOpen, 
      roles: Object.values(UserRole) 
    },
    { 
      name: 'Users', 
      path: '/users', 
      icon: Users, 
      roles: [UserRole.Registrar] 
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role?.toLowerCase())
  );

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar className="border-r border-blue-200 bg-white shadow-lg">
      <SidebarHeader className="border-b border-blue-100 bg-gradient-to-r from-blue-600 to-blue-700">
        <motion.div 
          className="flex items-center gap-3 p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white text-blue-600 p-2 rounded-lg shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">E-Court</h1>
            <p className="text-blue-100 text-sm">Case Management</p>
          </div>
        </motion.div>
        <div className="px-4 pb-4">
          <SidebarTrigger className="text-white hover:bg-blue-500/20" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.path)}
                        isActive={isActive}
                        className={`w-full justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-blue-100">
            <Avatar className="h-10 w-10 bg-blue-600">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-blue-600 text-white font-semibold">
                  {user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-blue-600 capitalize">
                {user?.role?.replace(/([A-Z])/g, ' $1').trim()}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={logout}
            className="w-full justify-start gap-3 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
