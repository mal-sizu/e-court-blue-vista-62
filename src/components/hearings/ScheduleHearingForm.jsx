
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MultiStepForm, Step, StepNavigation } from '../ui/MultiStepForm';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Trash2, Plus } from 'lucide-react';
import Modal from '../ui/Modal';

const ScheduleHearingForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      caseNumber: '',
      hearingType: '',
      date: '',
      time: '',
      duration: '',
      courtroom: '',
      judge: '',
      participants: [{ name: '', role: '', email: '' }],
      agenda: '',
      notes: ''
    }
  });

  const participantsArray = useFieldArray({
    control: form.control,
    name: 'participants'
  });

  const hearingTypes = [
    { value: 'preliminary', label: 'Preliminary Hearing' },
    { value: 'trial', label: 'Trial' },
    { value: 'sentencing', label: 'Sentencing' },
    { value: 'motion', label: 'Motion Hearing' },
    { value: 'status', label: 'Status Conference' },
    { value: 'mediation', label: 'Mediation' }
  ];

  const participantRoles = [
    { value: 'plaintiff', label: 'Plaintiff' },
    { value: 'defendant', label: 'Defendant' },
    { value: 'lawyer', label: 'Lawyer' },
    { value: 'witness', label: 'Witness' },
    { value: 'expert', label: 'Expert Witness' },
    { value: 'interpreter', label: 'Interpreter' }
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Hearing Data:', data);
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error scheduling hearing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Hearing" size="xl">
      <Form {...form}>
        <MultiStepForm
          onComplete={handleComplete}
          title="Hearing Scheduling"
          description="Schedule a new court hearing"
        >
          {/* Step 1: Basic Information */}
          <Step title="Basic Information" description="Enter the hearing details">
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
                  name="hearingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hearing Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hearing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hearingTypes.map((type) => (
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.5" placeholder="e.g., 2.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="courtroom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Courtroom</FormLabel>
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
              </div>
            </div>
            <StepNavigation />
          </Step>

          {/* Step 2: Participants */}
          <Step title="Participants" description="Add hearing participants">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Hearing Participants</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => participantsArray.append({ name: '', role: '', email: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Participant
                </Button>
              </div>
              
              {participantsArray.fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {participantRoles.map((role) => (
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
                      
                      <div className="flex items-end space-x-2">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`participants.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {participantsArray.fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => participantsArray.remove(index)}
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

          {/* Step 3: Agenda & Notes */}
          <Step title="Agenda & Notes" description="Set the hearing agenda and add notes">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hearing Agenda</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Outline the hearing agenda and topics to be discussed"
                        rows={6}
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
                        placeholder="Enter any additional notes or special instructions"
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
        </MultiStepForm>
      </Form>
    </Modal>
  );
};

export default ScheduleHearingForm;
