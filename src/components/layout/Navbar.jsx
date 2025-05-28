
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../constants/dataTypes';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', roles: Object.values(UserRole) },
    { name: 'Case Requests', path: '/case-requests', roles: [UserRole.Registrar, UserRole.CourtClerk] },
    { name: 'Cases', path: '/cases', roles: Object.values(UserRole) },
    { name: 'Hearings', path: '/hearings', roles: Object.values(UserRole) },
    { name: 'Evidence', path: '/evidence', roles: Object.values(UserRole) },
    { name: 'Record Room', path: '/record-room', roles: Object.values(UserRole) },
    { name: 'Users', path: '/users', roles: [UserRole.Registrar] }
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <motion.nav 
      className="bg-white shadow-lg border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">E-Court</span>
            </motion.div>

            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {filteredNavItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-700">Welcome, </span>
              <span className="font-medium text-blue-600">{user?.fullName}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
