
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseRequestSchema } from '../../schemas/validationSchemas';
import { CaseCategory, CaseType } from '../../constants/dataTypes';
import { MultiStepForm, Step, StepNavigation } from '../ui/MultiStepForm';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Trash2, Plus } from 'lucide-react';
import Modal from '../ui/Modal';

const CaseRequestMultiStepForm = ({ isOpen, onClose, onSuccess }) => {
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

  const handleComplete = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Case Request" size="xl">
      <Form {...form}>
        <MultiStepForm
          onComplete={handleComplete}
          title="Case Request Details"
          description="Please fill in all the required information to create a new case request"
        >
          {/* Step 1: Basic Information */}
          <Step title="Basic Information" description="Enter the basic details of the case">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="court"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Court</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter court name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="caseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter case title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="caseCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select case category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {caseCategoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="caseType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select case type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {caseTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="caseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter detailed case description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <StepNavigation />
          </Step>

          {/* Step 2: Plaintiffs */}
          <Step title="Plaintiffs" description="Add plaintiff information">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Plaintiff Details</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => plaintiffsArray.append({ name: '', address: '', contactNumber: '', nic: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plaintiff
                </Button>
              </div>
              
              {plaintiffsArray.fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`plaintiffs.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter plaintiff name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`plaintiffs.${index}.nic`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIC</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter NIC number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`plaintiffs.${index}.contactNumber`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        {plaintiffsArray.fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => plaintiffsArray.remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="col-span-full">
                        <FormField
                          control={form.control}
                          name={`plaintiffs.${index}.address`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter full address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <StepNavigation />
          </Step>

          {/* Step 3: Lawyers */}
          <Step title="Lawyers" description="Add plaintiff lawyer information">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Plaintiff Lawyers</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => lawyersArray.append({ name: '', barID: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lawyer
                </Button>
              </div>
              
              {lawyersArray.fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`plaintiffsLawyers.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lawyer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter lawyer name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end space-x-2">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`plaintiffsLawyers.${index}.barID`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bar ID</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter Bar ID" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {lawyersArray.fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => lawyersArray.remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <StepNavigation />
          </Step>
        </MultiStepForm>
      </Form>
    </Modal>
  );
};

export default CaseRequestMultiStepForm;
