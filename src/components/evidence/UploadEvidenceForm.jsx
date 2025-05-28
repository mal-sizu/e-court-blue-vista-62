
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MultiStepForm, Step, StepNavigation } from '../ui/MultiStepForm';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Modal from '../ui/Modal';

const UploadEvidenceForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const form = useForm({
    defaultValues: {
      caseNumber: '',
      evidenceType: '',
      title: '',
      description: '',
      submittedBy: '',
      dateReceived: '',
      chainOfCustody: '',
      notes: ''
    }
  });

  const evidenceTypes = [
    { value: 'document', label: 'Document' },
    { value: 'photograph', label: 'Photograph' },
    { value: 'video', label: 'Video Recording' },
    { value: 'audio', label: 'Audio Recording' },
    { value: 'physical', label: 'Physical Evidence' },
    { value: 'digital', label: 'Digital Evidence' }
  ];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Evidence Data:', data);
      console.log('Selected Files:', selectedFiles);
      onSuccess();
      onClose();
      form.reset();
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading evidence:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Evidence" size="lg">
      <Form {...form}>
        <MultiStepForm
          onComplete={handleComplete}
          title="Evidence Upload"
          description="Upload and catalog new evidence"
        >
          {/* Step 1: Evidence Information */}
          <Step title="Evidence Information" description="Enter the evidence details">
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
                  name="evidenceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evidence Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select evidence type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {evidenceTypes.map((type) => (
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
                    <FormLabel>Evidence Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter evidence title" {...field} />
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
                      <Textarea placeholder="Describe the evidence in detail" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="submittedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submitted By</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter submitter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateReceived"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Received</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <StepNavigation />
          </Step>

          {/* Step 2: File Upload & Chain of Custody */}
          <Step title="File Upload & Custody" description="Upload files and document chain of custody">
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    Choose Files
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload evidence files (documents, images, videos, etc.)
                  </p>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Selected Files:</h4>
                    <ul className="mt-2 text-sm text-gray-500">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{file.name}</span>
                          <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="chainOfCustody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chain of Custody</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Document the chain of custody for this evidence"
                        rows={4}
                        {...field}
                      />
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
                      <Textarea 
                        placeholder="Enter any additional notes or observations"
                        rows={3}
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
        </MultiStepForm>
      </Form>
    </Modal>
  );
};

export default UploadEvidenceForm;
