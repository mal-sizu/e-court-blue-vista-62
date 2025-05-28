
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

const NewCaseForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      caseNumber: '',
      title: '',
      category: '',
      type: '',
      priority: '',
      court: '',
      judge: '',
      filingDate: '',
      summary: '',
      parties: [{ name: '', type: '', address: '', contact: '' }],
      lawyers: [{ name: '', barID: '', party: '', contact: '' }],
      notes: ''
    }
  });

  const partiesArray = useFieldArray({
    control: form.control,
    name: 'parties'
  });

  const lawyersArray = useFieldArray({
    control: form.control,
    name: 'lawyers'
  });

  const caseCategories = [
    { value: 'civil', label: 'Civil' },
    { value: 'criminal', label: 'Criminal' },
    { value: 'family', label: 'Family' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'administrative', label: 'Administrative' }
  ];

  const caseTypes = [
    { value: 'contract', label: 'Contract Dispute' },
    { value: 'tort', label: 'Tort Claim' },
    { value: 'property', label: 'Property Dispute' },
    { value: 'employment', label: 'Employment Issue' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const partyTypes = [
    { value: 'plaintiff', label: 'Plaintiff' },
    { value: 'defendant', label: 'Defendant' },
    { value: 'petitioner', label: 'Petitioner' },
    { value: 'respondent', label: 'Respondent' },
    { value: 'third_party', label: 'Third Party' }
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Case Data:', data);
      onSuccess();
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error creating case:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    form.handleSubmit(handleSubmit)();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Case" size="xl">
      <Form {...form}>
        <MultiStepForm
          onComplete={handleComplete}
          title="New Case Creation"
          description="Create a new case in the system"
        >
          {/* Step 1: Basic Information */}
          <Step title="Basic Information" description="Enter the case basic details">
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
                  name="filingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filing Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                    <FormLabel>Case Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter case title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {caseCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {caseTypes.map((type) => (
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
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  name="judge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Judge</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter judge name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter case summary" rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <StepNavigation />
          </Step>

          {/* Step 2: Parties */}
          <Step title="Parties" description="Add case parties">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Case Parties</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => partiesArray.append({ name: '', type: '', address: '', contact: '' })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Party
                </Button>
              </div>
              
              {partiesArray.fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`parties.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Party Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter party name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`parties.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Party Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {partyTypes.map((type) => (
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
                        name={`parties.${index}.contact`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter contact information" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end">
                        {partiesArray.fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => partiesArray.remove(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="col-span-full">
                        <FormField
                          control={form.control}
                          name={`parties.${index}.address`}
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <StepNavigation />
          </Step>

          {/* Step 3: Legal Representation */}
          <Step title="Legal Representation" description="Add lawyers and legal representatives">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Legal Representatives</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => lawyersArray.append({ name: '', barID: '', party: '', contact: '' })}
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
                        name={`lawyers.${index}.name`}
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
                      
                      <FormField
                        control={form.control}
                        name={`lawyers.${index}.barID`}
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
                      
                      <FormField
                        control={form.control}
                        name={`lawyers.${index}.party`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Representing</FormLabel>
                            <FormControl>
                              <Input placeholder="Which party they represent" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-end space-x-2">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`lawyers.${index}.contact`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter contact information" {...field} />
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

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter any additional notes about the case" rows={4} {...field} />
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

export default NewCaseForm;
