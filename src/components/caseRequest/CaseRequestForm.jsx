import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseRequestSchema } from '../../schemas/validationSchemas';
import { CaseCategory, CaseType } from '../../constants/dataTypes';
import Input from '../ui/Input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '../ui/Select';
import { Button } from '../ui/button';

const CaseRequestForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
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

  const steps = [
    'Case Details',
    'Plaintiffs',
    'Lawyers',
    'Review'
  ];

  const nextStep = async () => {
    const fieldsToValidate = getStepFields(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const getStepFields = (step) => {
    switch(step) {
      case 0: 
        return ['court', 'city', 'caseTitle', 'caseCategory', 'caseType', 'caseDescription'];
      case 1:
        return ['plaintiffs'];
      case 2:
        return ['plaintiffsLawyers'];
      default:
        return [];
    }
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      }
      form.reset();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error creating case request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Stepper */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className={`flex flex-col items-center w-full`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${
                currentStep === index 
                  ? 'bg-blue-600 text-white' 
                  : currentStep > index 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
              }`}>
                {index + 1}
              </div>
              <span className={`text-sm font-medium ${
                currentStep === index ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 ${
                currentStep > index ? 'bg-green-500' : 'bg-gray-200'
              } mx-2 mt-4`} />
            )}
          </div>
        ))}
      </div>

      <form 
        onSubmit={form.handleSubmit(handleFormSubmit)} 
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="md:col-span-2">
                    <Input
                      label="Case Title"
                      {...form.register('caseTitle')}
                      error={form.formState.errors.caseTitle?.message}
                      placeholder="Enter case title"
                    />
                  </div>

                  {/* Case Category Select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Category
                    </label>
                    <Controller
                      name="caseCategory"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select case category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {caseCategoryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.caseCategory && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.caseCategory.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Case Type Select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Type
                    </label>
                    <Controller
                      name="caseType"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {caseTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.caseType && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.caseType.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
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
                </div>
              )}

              {currentStep === 1 && (
                <div className="border rounded-lg p-4 bg-gray-50">
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
                    <div 
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg mb-4"
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
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="border rounded-lg p-4 bg-gray-50">
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
                    <div 
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg mb-4"
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
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Case Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Court</p>
                        <p className="font-medium">{form.watch('court') || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="font-medium">{form.watch('city') || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Case Title</p>
                        <p className="font-medium">{form.watch('caseTitle') || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Case Category</p>
                        <p className="font-medium">{form.watch('caseCategory') || '-'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Case Type</p>
                        <p className="font-medium">{form.watch('caseType') || '-'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Case Description</p>
                        <p className="font-medium">{form.watch('caseDescription') || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Plaintiffs</h3>
                    {form.watch('plaintiffs')?.map((plaintiff, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{plaintiff.name || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">NIC</p>
                            <p className="font-medium">{plaintiff.nic || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="font-medium">{plaintiff.contactNumber || '-'}</p>
                          </div>
                          <div className="md:col-span-3">
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{plaintiff.address || '-'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Plaintiff Lawyers</h3>
                    {form.watch('plaintiffsLawyers')?.map((lawyer, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{lawyer.name || '-'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bar ID</p>
                            <p className="font-medium">{lawyer.barID || '-'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-4 pt-6 border-t">
          <div>
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
            )}
          </div>
          
          <div className="flex space-x-4">
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                loading={loading}
              >
                Create Case Request
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setCurrentStep(0);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CaseRequestForm;