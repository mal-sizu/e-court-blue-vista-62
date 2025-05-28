
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  Calendar,
  TrendingUp
} from 'lucide-react';

const CaseRequestStats = () => {
  const stats = [
    { name: 'Total Requests', value: '156', change: '+12%', icon: FileText },
    { name: 'Pending', value: '23', change: '+5%', icon: Clock },
    { name: 'Approved', value: '98', change: '+8%', icon: CheckCircle },
    { name: 'This Month', value: '34', change: '+15%', icon: Calendar }
  ];

  return (
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
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CaseRequestStats;
