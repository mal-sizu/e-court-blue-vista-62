
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

interface CaseRequestHeaderProps {
  onCreateRequest: () => void;
}

const CaseRequestHeader = ({ onCreateRequest }: CaseRequestHeaderProps) => {
  return (
    <motion.div 
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Case Requests</h1>
        <p className="text-gray-600 mt-1">Manage and track all case requests efficiently</p>
      </div>
      <Button 
        onClick={onCreateRequest}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Request
      </Button>
    </motion.div>
  );
};

export default CaseRequestHeader;
