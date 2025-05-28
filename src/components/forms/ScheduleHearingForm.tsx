  import React, { useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';
  import { motion } from 'framer-motion';
  import { format } from 'date-fns';
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
  import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
  } from '../ui/popover';
  import { Calendar } from '../ui/calendar';
  import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
  import { Calendar as CalendarIcon, Clock, MapPin, Gavel, Users, FileText, AlertCircle } from 'lucide-react';
  import { cn } from '@/lib/utils';

  const scheduleHearingSchema = z.object({
    hearingType: z.enum(['preliminary', 'trial', 'sentencing', 'appeal', 'motion'], {
      errorMap: () => ({ message: 'Please select a hearing type' })
    }),
    caseId: z.string().min(1, 'Case ID is required'),
    title: z.string().min(1, 'Hearing title is required'),
    date: z.date({
      required_error: 'Please select a date for the hearing'
    }),
    time: z.string().min(1, 'Time is required'),
    duration: z.string().min(1, 'Duration is required'),
    courtroom: z.string().min(1, 'Courtroom is required'),
    judge: z.string().min(1, 'Judge is required'),
    participants: z.string().min(1, 'Participants are required'),
    agenda: z.string().optional(),
    notes: z.string().optional()
  });

  type ScheduleHearingFormData = z.infer<typeof scheduleHearingSchema>;

  const ScheduleHearingForm: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const form = useForm<ScheduleHearingFormData>({
      resolver: zodResolver(scheduleHearingSchema),
      defaultValues: {
        hearingType: 'preliminary',
        caseId: '',
        title: '',
        time: '',
        duration: '',
        courtroom: '',
        judge: '',
        participants: '',
        agenda: '',
        notes: ''
      }
    });

    const handleSubmit = async (data: ScheduleHearingFormData) => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Hearing data:', data);
        form.reset();
        // You can add success notification here
      } catch (error) {
        console.error('Error scheduling hearing:', error);
      } finally {
        setLoading(false);
      }
    };

    const hearingTypeOptions = [
      { value: 'preliminary', label: 'Preliminary Hearing', color: 'bg-blue-500', icon: '📋' },
      { value: 'trial', label: 'Trial', color: 'bg-red-500', icon: '⚖️' },
      { value: 'sentencing', label: 'Sentencing', color: 'bg-purple-500', icon: '📜' },
      { value: 'appeal', label: 'Appeal', color: 'bg-orange-500', icon: '🔄' },
      { value: 'motion', label: 'Motion Hearing', color: 'bg-green-500', icon: '📝' }
    ];

    const timeOptions = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
      '15:00', '15:30', '16:00', '16:30', '17:00'
    ];

    const durationOptions = [
      { value: '30 minutes', label: '30 minutes', color: 'bg-green-100 text-green-800' },
      { value: '1 hour', label: '1 hour', color: 'bg-blue-100 text-blue-800' },
      { value: '1.5 hours', label: '1.5 hours', color: 'bg-yellow-100 text-yellow-800' },
      { value: '2 hours', label: '2 hours', color: 'bg-orange-100 text-orange-800' },
      { value: '2.5 hours', label: '2.5 hours', color: 'bg-red-100 text-red-800' },
      { value: '3 hours', label: '3 hours', color: 'bg-purple-100 text-purple-800' },
      { value: 'Half day', label: 'Half day', color: 'bg-indigo-100 text-indigo-800' },
      { value: 'Full day', label: 'Full day', color: 'bg-gray-100 text-gray-800' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <Gavel className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Schedule Hearing
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Set up court proceedings with comprehensive scheduling details
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Basic Hearing Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <FileText className="h-6 w-6" />
                      <span>Hearing Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="hearingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Hearing Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-purple-500">
                                  <SelectValue placeholder="Select hearing type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hearingTypeOptions.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg">{type.icon}</span>
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
                        name="caseId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Case ID</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter case ID" 
                                className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-700">Hearing Title</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter descriptive hearing title" 
                              className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
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

              {/* Date & Time Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Clock className="h-6 w-6" />
                      <span>Schedule Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-sm font-semibold text-gray-700">Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-12 w-full pl-3 text-left font-normal border-2 border-gray-200 hover:border-blue-500",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      <div className="flex items-center space-x-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{format(field.value, "PPP")}</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center space-x-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>Pick a date</span>
                                      </div>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                  className="p-3"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Time</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4 text-blue-500" />
                                      <span>{time}</span>
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
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-700">Duration</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {durationOptions.map((duration) => (
                                  <SelectItem key={duration.value} value={duration.value}>
                                    <div className="flex items-center space-x-2">
                                      <span className={`px-2 py-1 rounded-full text-xs ${duration.color}`}></span>
                                      <span>{duration.label}</span>
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
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FormField
                  control={form.control}
                  name="courtroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Courtroom</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter courtroom number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="judge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Presiding Judge</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter judge name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Participants</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List all participants (lawyers, witnesses, etc.)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agenda (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter hearing agenda or topics to be covered" 
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
                        placeholder="Enter any additional notes or special instructions" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Scheduling...' : 'Schedule Hearing'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  };

  export default ScheduleHearingForm;
