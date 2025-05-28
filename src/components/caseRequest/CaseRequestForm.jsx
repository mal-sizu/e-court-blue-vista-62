
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseRequestSchema } from '../../schemas/validationSchemas';
import { CaseCategory, CaseType } from '../../constants/dataTypes';
import { caseRequestAPI } from '../../utils/api';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const CaseRequestForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(caseRequestSchema),
    defaultValues: {
      plaintiffs: [{ name: '', address: '', contactNumber: '', nic: '' }],
      plaintiffsLawyers: [{ name: '', barID: '' }]
    }
  });

  const plaintiffsArray = useFieldArray({
    control: form.control,
    name: 'plaintiffs'
  });

  const lawyersArray = useFieldArray({
    control: form.control,
    name: 'plaintiffsLawyers'
  });

  const caseCategoryOptions = Object.entries(CaseCategory).map(([key, value]) => ({
    value: value,
    label: value
  }));

  const caseTypeOptions = Object.entries(CaseType).map(([key, value]) => ({
    value: value,
    label: value
  }));

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Case Request Data:', data);
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error creating case request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Case Request" size="xl">
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Information */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Input
            label="Court"
            {...form.register('court')}
            error={form.formState.errors.court?.message}
            placeholder="Enter court name"
          />
          
          <Input
            label="City"
            {...form.register('city')}
            error={form.formState.errors.city?.message}
            placeholder="Enter city"
          />
        </motion.div>

        <Input
          label="Case Title"
          {...form.register('caseTitle')}
          error={form.formState.errors.caseTitle?.message}
          placeholder="Enter case title"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Select
            label="Case Category"
            {...form.register('caseCategory')}
            error={form.formState.errors.caseCategory?.message}
            options={caseCategoryOptions}
            placeholder="Select case category"
          />
          
          <Select
            label="Case Type"
            {...form.register('caseType')}
            error={form.formState.errors.caseType?.message}
            options={caseTypeOptions}
            placeholder="Select case type"
          />
        </motion.div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Case Description
          </label>
          <textarea
            {...form.register('caseDescription')}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter detailed case description"
          />
          {form.formState.errors.caseDescription && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.caseDescription.message}
            </p>
          )}
        </div>

        {/* Plaintiffs Section */}
        <motion.div 
          className="border rounded-lg p-4 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Plaintiffs</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => plaintiffsArray.append({ name: '', address: '', contactNumber: '', nic: '' })}
            >
              Add Plaintiff
            </Button>
          </div>
          
          {plaintiffsArray.fields.map((field, index) => (
            <motion.div 
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Input
                label="Name"
                {...form.register(`plaintiffs.${index}.name`)}
                error={form.formState.errors.plaintiffs?.[index]?.name?.message}
                placeholder="Enter plaintiff name"
              />
              
              <Input
                label="NIC"
                {...form.register(`plaintiffs.${index}.nic`)}
                error={form.formState.errors.plaintiffs?.[index]?.nic?.message}
                placeholder="Enter NIC number"
              />
              
              <Input
                label="Contact Number"
                {...form.register(`plaintiffs.${index}.contactNumber`)}
                error={form.formState.errors.plaintiffs?.[index]?.contactNumber?.message}
                placeholder="Enter contact number"
              />
              
              <div className="flex items-end">
                {plaintiffsArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => plaintiffsArray.remove(index)}
                    className="mb-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <div className="col-span-full">
                <Input
                  label="Address"
                  {...form.register(`plaintiffs.${index}.address`)}
                  error={form.formState.errors.plaintiffs?.[index]?.address?.message}
                  placeholder="Enter full address"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lawyers Section */}
        <motion.div 
          className="border rounded-lg p-4 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Plaintiff Lawyers</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => lawyersArray.append({ name: '', barID: '' })}
            >
              Add Lawyer
            </Button>
          </div>
          
          {lawyersArray.fields.map((field, index) => (
            <motion.div 
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Input
                label="Lawyer Name"
                {...form.register(`plaintiffsLawyers.${index}.name`)}
                error={form.formState.errors.plaintiffsLawyers?.[index]?.name?.message}
                placeholder="Enter lawyer name"
              />
              
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    label="Bar ID"
                    {...form.register(`plaintiffsLawyers.${index}.barID`)}
                    error={form.formState.errors.plaintiffsLawyers?.[index]?.barID?.message}
                    placeholder="Enter Bar ID"
                  />
                </div>
                {lawyersArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => lawyersArray.remove(index)}
                    className="mb-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Buttons */}
        <motion.div 
          className="flex justify-end space-x-4 pt-6 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            Create Case Request
          </Button>
        </motion.div>
      </form>
    </Modal>
  );
};

export default CaseRequestForm;
