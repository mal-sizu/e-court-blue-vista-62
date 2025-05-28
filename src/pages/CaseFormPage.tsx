
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import NewCaseForm from '@/components/cases/NewCaseForm';

const CaseFormPage = () => {
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false);
    navigate('/cases');
  };

  const handleClose = () => {
    navigate('/cases');
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/cases')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cases
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Create New Case</h1>
          <p className="text-gray-600">Create a new case in the system</p>
        </div>
      </motion.div>

      <NewCaseForm
        isOpen={showForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default CaseFormPage;
