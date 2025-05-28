
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AddUserForm from '@/components/users/AddUserForm';

const UserFormPage = () => {
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setShowForm(false);
    navigate('/users');
  };

  const handleClose = () => {
    navigate('/users');
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
          onClick={() => navigate('/users')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Add New User</h1>
          <p className="text-gray-600">Create a new user account in the system</p>
        </div>
      </motion.div>

      <AddUserForm
        isOpen={showForm}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default UserFormPage;
