
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ScheduleHearingForm from '@/components/hearings/ScheduleHearingForm';

const HearingFormPage = () => {
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false);
    navigate('/hearings');
  };

  const handleClose = () => {
    navigate('/hearings');
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
          onClick={() => navigate('/hearings')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Hearings
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Schedule Hearing</h1>
          <p className="text-gray-600">Schedule a new court hearing</p>
        </div>
      </motion.div>

      <ScheduleHearingForm
        isOpen={showForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default HearingFormPage;
