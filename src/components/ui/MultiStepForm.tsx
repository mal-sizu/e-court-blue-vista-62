
import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Progress } from './progress';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MultiStepFormContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const MultiStepFormContext = createContext<MultiStepFormContextType | undefined>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error('useMultiStepForm must be used within MultiStepForm');
  }
  return context;
};

interface MultiStepFormProps {
  children: React.ReactNode;
  onComplete?: () => void;
  title?: string;
  description?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  onComplete,
  title,
  description
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const value: MultiStepFormContextType = {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      <Card className="w-full max-w-4xl mx-auto">
        {(title || description) && (
          <CardHeader className="text-center">
            {title && <CardTitle className="text-2xl">{title}</CardTitle>}
            {description && <p className="text-muted-foreground mt-2">{description}</p>}
          </CardHeader>
        )}
        
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep]}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </MultiStepFormContext.Provider>
  );
};

interface StepProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Step: React.FC<StepProps> = ({ children, title, description }) => {
  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export const StepNavigation: React.FC = () => {
  const { currentStep, totalSteps, nextStep, prevStep, isFirstStep, isLastStep } = useMultiStepForm();

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        disabled={isFirstStep}
        className="flex items-center space-x-2"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      <div className="flex space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <Button
        type="button"
        onClick={nextStep}
        className="flex items-center space-x-2"
      >
        <span>{isLastStep ? 'Complete' : 'Next'}</span>
        {!isLastStep && <ChevronRight className="w-4 h-4" />}
      </Button>
    </div>
  );
};
