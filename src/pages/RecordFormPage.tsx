
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AddRecordForm from '@/components/recordRoom/AddRecordForm';

const RecordFormPage = () => {
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false);
    navigate('/record-room');
  };

  const handleClose = () => {
    navigate('/record-room');
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
          onClick={() => navigate('/record-room')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Records
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add New Record</h1>
          <p className="text-gray-600">Add a new record to the system</p>
        </div>
      </motion.div>

      <AddRecordForm
        isOpen={showForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default RecordFormPage;
