  import React, { useState } from 'react';
  import { useForm, useFieldArray } from 'react-hook-form';
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
  import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
  import { FileText, Plus, X, User, Scale, Calendar, Building, Gavel } from 'lucide-react';

  const participantSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.enum(['plaintiff', 'defendant', 'witness', 'lawyer'], {
      errorMap: () => ({ message: 'Please select a valid role' })
    }),
    contactInfo: z.string().optional(),
    address: z.string().optional()
  });

  const newCaseSchema = z.object({
    caseNumber: z.string().min(1, 'Case number is required'),
    title: z.string().min(1, 'Case title is required'),
    caseType: z.enum(['civil', 'criminal', 'family', 'administrative', 'constitutional'], {
      errorMap: () => ({ message: 'Please select a case type' })
    }),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {
      errorMap: () => ({ message: 'Please select a priority level' })
    }),
    court: z.string().min(1, 'Court is required'),
    assignedJudge: z.string().min(1, 'Assigned judge is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    filingDate: z.string().min(1, 'Filing date is required'),
    participants: z.array(participantSchema).min(1, 'At least one participant is required'),
    legalBasis: z.string().optional(),
    notes: z.string().optional()
  });

  type NewCaseFormData = z.infer<typeof newCaseSchema>;

  const NewCaseForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<NewCaseFormData>({
      resolver: zodResolver(newCaseSchema),
      defaultValues: {
        caseNumber: '',
        title: '',
        caseType: 'civil',
        priority: 'medium',
        court: '',
        assignedJudge: '',
        description: '',
        filingDate: '',
        participants: [{ name: '', role: 'plaintiff', contactInfo: '', address: '' }],
        legalBasis: '',
        notes: ''
      }
    });

    const participantsArray = useFieldArray({
      control: form.control,
      name: 'participants'
    });

    const handleSubmit = async (data: NewCaseFormData) => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('New case data:', data);
        form.reset();
        // You can add success notification here
      } catch (error) {
        console.error('Error creating case:', error);
      } finally {
        setLoading(false);
      }
    };

    const caseTypeOptions = [
      { value: 'civil', label: 'Civil Case', color: 'bg-blue-500' },
      { value: 'criminal', label: 'Criminal Case', color: 'bg-red-500' },
      { value: 'family', label: 'Family Law', color: 'bg-green-500' },
      { value: 'administrative', label: 'Administrative', color: 'bg-purple-500' },
      { value: 'constitutional', label: 'Constitutional', color: 'bg-orange-500' }
    ];

    const priorityOptions = [
      { value: 'low', label: 'Low', color: 'bg-gray-500' },
      { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
      { value: 'high', label: 'High', color: 'bg-orange-500' },
      { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
    ];

    const roleOptions = [
      { value: 'plaintiff', label: 'Plaintiff', icon: '⚖️' },
      { value: 'defendant', label: 'Defendant', icon: '🛡️' },
      { value: 'witness', label: 'Witness', icon: '👁️' },
      { value: 'lawyer', label: 'Lawyer', icon: '👨‍💼' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Case
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Enter comprehensive case details to initiate legal proceedings
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Basic Case Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <FileText className="h-6 w-6" />
                      <span>Basic Case Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="caseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Case Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., CV-2024-001" 
                                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="filingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Filing Date</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                {...field} 
                              />
                            </FormControl>
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
                                    <div className="flex items-center space-x-2">
                                      <div className={`w-3 h-3 rounded-full ${priority.color}`}></div>
                                      <span>{priority.label}</span>
                                    </div>
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
                          <FormLabel className="text-sm font-semibold text-gray-700">Case Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter descriptive case title" 
                              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="caseType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Case Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                                  <SelectValue placeholder="Select case type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {caseTypeOptions.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center space-x-2">
                                      <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                                      <span>{type.label}</span>
                                    </div>
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
                        name="court"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>Court</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter court name" 
                                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="assignedJudge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                              <Gavel className="h-4 w-4" />
                              <span>Assigned Judge</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter judge name" 
                                className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Case Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a comprehensive description of the case, including key facts and circumstances" 
                              className="min-h-[120px] border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Participants Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <User className="h-6 w-6" />
                        <span>Case Participants</span>
                      </span>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                        onClick={() => participantsArray.append({ 
                          name: '', 
                          role: 'plaintiff', 
                          contactInfo: '', 
                          address: '' 
                        })}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Participant
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {participantsArray.fields.map((field, index) => (
                      <motion.div 
                        key={field.id}
                        className="p-4 border rounded-lg space-y-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Participant {index + 1}</h4>
                          {participantsArray.fields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => participantsArray.remove(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`participants.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter participant name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`participants.${index}.role`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {roleOptions.map((role) => (
                                      <SelectItem key={role.value} value={role.value}>
                                        {role.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`participants.${index}.contactInfo`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Information</FormLabel>
                                <FormControl>
                                  <Input placeholder="Phone/Email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`participants.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="legalBasis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Basis (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter the legal basis for the case" 
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
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter any additional notes" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating Case...' : 'Create Case'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  };

  export default NewCaseForm;
