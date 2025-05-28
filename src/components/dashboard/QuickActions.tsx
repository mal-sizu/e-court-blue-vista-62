
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
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
            {actions.map((action, index) => {
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
  );
};

export default QuickActions;
