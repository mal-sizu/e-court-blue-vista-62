  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import { motion } from 'framer-motion';
  import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
  } from '../ui/form';
  import { Input } from '../ui/input';
  import { Button } from '../ui/button';
  import { Textarea } from '../ui/textarea';
  import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from '../ui/select';
  import { FileText, User, Save, RotateCcw } from 'lucide-react';
  import { useToast } from '../ui/use-toast';

  const addRecordSchema = z.object({
    recordType: z.enum(['hearing', 'document', 'evidence', 'correspondence', 'order'], {
      errorMap: () => ({ message: 'Please select a valid record type' })
    }),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    caseId: z.string().min(1, 'Case ID is required'),
    createdBy: z.string().min(1, 'Created by is required'),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {
      errorMap: () => ({ message: 'Please select a priority level' })
    }),
    tags: z.string().optional(),
    notes: z.string().optional()
  });

  type AddRecordFormData = z.infer<typeof addRecordSchema>;

  const AddRecordForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<AddRecordFormData>({
      resolver: zodResolver(addRecordSchema),
      defaultValues: {
        recordType: 'document',
        title: '',
        description: '',
        caseId: '',
        createdBy: '',
        priority: 'medium',
        tags: '',
        notes: ''
      }
    });

    const handleSubmit = async (data: AddRecordFormData) => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('New record data:', data);
      
        toast({
          title: "Record Added Successfully",
          description: `${data.title} has been added to the system.`,
        });
      
        form.reset();
      } catch (error) {
        console.error('Error adding record:', error);
        toast({
          title: "Error",
          description: "Failed to add record. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    const handleReset = () => {
      form.reset();
    };

    const recordTypeOptions = [
      { value: 'hearing', label: 'Hearing Record' },
      { value: 'document', label: 'Document' },
      { value: 'evidence', label: 'Evidence' },
      { value: 'correspondence', label: 'Correspondence' },
      { value: 'order', label: 'Court Order' }
    ];

    const priorityOptions = [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ];

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Record</h1>
          </div>
          <p className="text-gray-600">Create a new court record with detailed information</p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FormField
                control={form.control}
                name="recordType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Record Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="Select record type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recordTypeOptions.map((type) => (
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

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Priority Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              priority.value === 'urgent' ? 'bg-red-100 text-red-800' :
                              priority.value === 'high' ? 'bg-orange-100 text-orange-800' :
                              priority.value === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {priority.label}
                            </span>
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
                name="caseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Case ID</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter case ID" 
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Record Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a descriptive title for the record" 
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <User className="h-4 w-4" />
                      <span>Created By</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter creator name or ID" 
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a detailed description of the record, including relevant context and information" 
                        className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., urgent, evidence, witness, document" 
                        className="h-12 border-2 border-gray-200 focus:border-blue-500"
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
                    <FormLabel className="text-sm font-semibold text-gray-700">Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional notes or comments" 
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div 
              className="flex justify-end space-x-4 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Form
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Adding Record...' : 'Add Record'}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    );
  };

  export default AddRecordForm;
