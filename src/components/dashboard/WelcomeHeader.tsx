
import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeHeaderProps {
  userName?: string;
}

const WelcomeHeader = ({ userName }: WelcomeHeaderProps) => {
  return (
    <motion.div 
      className="text-center space-y-3 pb-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-light text-gray-900 tracking-tight">
        Welcome back, <span className="font-medium">{userName}</span>
      </h1>
      <p className="text-lg text-gray-600">
        Here's your court system overview for today
      </p>
    </motion.div>
  );
};

export default WelcomeHeader;
