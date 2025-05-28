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
  import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from '../ui/select';
  import { User, Mail, Phone, Shield, Building, IdCard } from 'lucide-react';
  import { useToast } from '../ui/use-toast';

  const addUserSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    role: z.enum(['admin', 'judge', 'clerk', 'lawyer', 'user'], {
      errorMap: () => ({ message: 'Please select a valid role' })
    }),
    department: z.string().min(1, 'Department is required'),
    employeeId: z.string().optional()
  });

  type AddUserFormData = z.infer<typeof addUserSchema>;

  const AddUserForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<AddUserFormData>({
      resolver: zodResolver(addUserSchema),
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'user',
        department: '',
        employeeId: ''
      }
    });

    const handleSubmit = async (data: AddUserFormData) => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('New user data:', data);
      
        toast({
          title: "Success",
          description: `User ${data.firstName} ${data.lastName} has been added successfully`,
        });
      
        form.reset();
      } catch (error) {
        console.error('Error adding user:', error);
        toast({
          title: "Error",
          description: "Failed to add user. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    const roleOptions = [
      { value: 'admin', label: 'Administrator', icon: Shield },
      { value: 'judge', label: 'Judge', icon: User },
      { value: 'clerk', label: 'Court Clerk', icon: User },
      { value: 'lawyer', label: 'Lawyer', icon: User },
      { value: 'user', label: 'General User', icon: User }
    ];

    const departmentOptions = [
      'Civil Court',
      'Criminal Court',
      'Family Court',
      'Commercial Court',
      'Administrative',
      'IT Department',
      'Legal Affairs',
      'Registry'
    ];

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
              <p className="text-gray-600">Create a new user account for the e-court system</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-lg border"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter first name" 
                          className="h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter last name" 
                          className="h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>

            {/* Contact Information Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg border"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Contact Information
              </h3>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-base font-semibold">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>Email Address</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Enter email address" 
                          className="h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-base font-semibold">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>Phone Number</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter phone number" 
                          className="h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>

            {/* Professional Information Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg border"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Professional Information
              </h3>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-base font-semibold">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span>User Role</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select user role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center space-x-2">
                                <role.icon className="h-4 w-4" />
                                <span>{role.label}</span>
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
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-base font-semibold">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>Department</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departmentOptions.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-base font-semibold">
                        <IdCard className="h-4 w-4 text-gray-500" />
                        <span>Employee ID (Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter employee ID" 
                          className="h-12 max-w-md"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end space-x-4 pt-8 border-t border-gray-200"
            >
              <Button 
                type="button" 
                variant="outline" 
                size="lg"
                onClick={() => form.reset()}
                className="px-8"
              >
                Clear Form
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                size="lg"
                className="px-8 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding User...
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 mr-2" />
                    Add User
                  </>
                )}
              </Button>
            </motion.div>

            {/* Form Summary */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-blue-50 p-4 rounded-lg border border-blue-200"
            >
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Once created, the user will receive login credentials via email. 
                They will be required to change their password on first login for security purposes.
              </p>
            </motion.div>
          </form>
        </Form>
      </div>
    );
  };

  export default AddUserForm;
