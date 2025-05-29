'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { MultiStepFormProvider, Step, StepIndicator, StepNavigation, useMultiStepForm } from '@/components/ui/multi-step-form';

export default function FormDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    caseType: '',
    caseDescription: '',
    hearingDate: '',
    documents: [],
    agreeToTerms: false
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Multi-Step Form Demo</h1>
      
      <div className="max-w-3xl mx-auto">
        <MultiStepFormProvider totalSteps={4}>
          <FormContent 
            formData={formData} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
          />
        </MultiStepFormProvider>
      </div>
    </div>
  );
}

interface FormContentProps {
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleSubmit: () => void;
}

function FormContent({ formData, handleChange, handleSubmit }: FormContentProps) {
  const { currentStep, setStepComplete } = useMultiStepForm();

  // Update step completion status when values change
  React.useEffect(() => {
    // Step 1 validation
    const isStep1Complete = !!formData.firstName && !!formData.lastName && !!formData.email;
    setStepComplete(0, isStep1Complete);

    // Step 2 validation
    const isStep2Complete = !!formData.address && !!formData.city && !!formData.state;
    setStepComplete(1, isStep2Complete);

    // Step 3 validation
    const isStep3Complete = !!formData.caseType && !!formData.caseDescription;
    setStepComplete(2, isStep3Complete);

    // Step 4 validation
    const isStep4Complete = formData.agreeToTerms;
    setStepComplete(3, isStep4Complete);
  }, [formData, setStepComplete]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>E-Court Filing Application</CardTitle>
        <CardDescription>Please complete all required information</CardDescription>
      </CardHeader>
      
      <StepIndicator 
        labels={['Personal Info', 'Contact Details', 'Case Information', 'Review & Submit']} 
        className="px-6"
      />
      
      <CardContent>
        <Step step={0}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName} 
                  onChange={(e) => handleChange('firstName', e.target.value)} 
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName} 
                  onChange={(e) => handleChange('lastName', e.target.value)} 
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={(e) => handleChange('phone', e.target.value)} 
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </Step>
        
        <Step step={1}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={formData.address} 
                onChange={(e) => handleChange('address', e.target.value)} 
                placeholder="123 Main St"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  value={formData.city} 
                  onChange={(e) => handleChange('city', e.target.value)} 
                  placeholder="Anytown"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select 
                  value={formData.state} 
                  onValueChange={(value) => handleChange('state', value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input 
                id="zip" 
                value={formData.zip} 
                onChange={(e) => handleChange('zip', e.target.value)} 
                placeholder="12345"
              />
            </div>
          </div>
        </Step>
        
        <Step step={2}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="caseType">Case Type</Label>
              <RadioGroup 
                value={formData.caseType} 
                onValueChange={(value) => handleChange('caseType', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="civil" id="civil" />
                  <Label htmlFor="civil">Civil</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="criminal" id="criminal" />
                  <Label htmlFor="criminal">Criminal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family">Family</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="probate" id="probate" />
                  <Label htmlFor="probate">Probate</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseDescription">Case Description</Label>
              <Textarea 
                id="caseDescription" 
                value={formData.caseDescription} 
                onChange={(e) => handleChange('caseDescription', e.target.value)} 
                placeholder="Please provide a brief description of your case..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hearingDate">Preferred Hearing Date (if applicable)</Label>
              <Input 
                id="hearingDate" 
                type="date" 
                value={formData.hearingDate} 
                onChange={(e) => handleChange('hearingDate', e.target.value)} 
              />
            </div>
          </div>
        </Step>
        
        <Step step={3}>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-medium">Name:</div>
                <div>{formData.firstName} {formData.lastName}</div>
                <div className="font-medium">Email:</div>
                <div>{formData.email}</div>
                <div className="font-medium">Phone:</div>
                <div>{formData.phone}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Contact Details</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-medium">Address:</div>
                <div>{formData.address}</div>
                <div className="font-medium">City:</div>
                <div>{formData.city}</div>
                <div className="font-medium">State:</div>
                <div>{formData.state}</div>
                <div className="font-medium">ZIP:</div>
                <div>{formData.zip}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Case Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="font-medium">Case Type:</div>
                <div className="capitalize">{formData.caseType}</div>
                <div className="font-medium">Description:</div>
                <div>{formData.caseDescription}</div>
                <div className="font-medium">Hearing Date:</div>
                <div>{formData.hearingDate || 'Not specified'}</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agreeToTerms} 
                  onCheckedChange={(checked) => handleChange('agreeToTerms', checked)} 
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and certify that all information provided is accurate and complete.
                </Label>
              </div>
            </div>
          </div>
        </Step>
      </CardContent>
      
      <CardFooter>
        <StepNavigation 
          onSubmit={handleSubmit} 
          submitText="Submit Application" 
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}