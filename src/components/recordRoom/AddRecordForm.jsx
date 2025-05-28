
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MultiStepForm, Step, StepNavigation } from '../ui/MultiStepForm';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Modal from '../ui/Modal';

const AddRecordForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      caseNumber: '',
      recordType: '',
      title: '',
      description: '',
      location: '',
      shelfNumber: '',
      boxNumber: '',
      tags: '',
      notes: ''
    }
  });

  const recordTypes = [
    { value: 'case_file', label: 'Case File' },
    { value: 'evidence', label: 'Evidence Document' },
    { value: 'judgment', label: 'Judgment' },
    { value: 'petition', label: 'Petition' },
    { value: 'motion', label: 'Motion' },
    { value: 'order', label: 'Court Order' }
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Record Data:', data);
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error creating record:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Record" size="lg">
      <Form {...form}>
        <MultiStepForm
          onComplete={handleComplete}
          title="Record Entry"
          description="Add a new record to the system"
        >
          {/* Step 1: Basic Information */}
          <Step title="Basic Information" description="Enter the record's basic details">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="caseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter case number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="recordType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Record Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select record type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {recordTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter record title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter record description" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <StepNavigation />
          </Step>

          {/* Step 2: Storage Information */}
          <Step title="Storage Information" description="Specify where the record is stored">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter storage location (e.g., Building A, Floor 2)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="shelfNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shelf Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter shelf number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="boxNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Box Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter box number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tags separated by commas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter any additional notes" rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <StepNavigation />
          </Step>
        </MultiStepForm>
      </Form>
    </Modal>
  );
};

export default AddRecordForm;
