import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface MultiStepFormContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isStepComplete: (step: number) => boolean;
  setStepComplete: (step: number, complete: boolean) => void;
}

const MultiStepFormContext = createContext<MultiStepFormContextType | undefined>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error('useMultiStepForm must be used within a MultiStepFormProvider');
  }
  return context;
};

interface MultiStepFormProviderProps {
  children: ReactNode;
  totalSteps: number;
  initialStep?: number;
}

export const MultiStepFormProvider: React.FC<MultiStepFormProviderProps> = ({
  children,
  totalSteps,
  initialStep = 0,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(Array(totalSteps).fill(false));

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
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

  const isStepComplete = (step: number) => {
    return completedSteps[step];
  };

  const setStepComplete = (step: number, complete: boolean) => {
    const newCompletedSteps = [...completedSteps];
    newCompletedSteps[step] = complete;
    setCompletedSteps(newCompletedSteps);
  };

  const value = {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    isStepComplete,
    setStepComplete,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

interface StepProps {
  step: number;
  children: ReactNode;
}

export const Step: React.FC<StepProps> = ({ step, children }) => {
  const { currentStep } = useMultiStepForm();

  if (step !== currentStep) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

interface StepNavigationProps {
  onSubmit?: () => void;
  submitText?: string;
  showBackOnFirstStep?: boolean;
  className?: string;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onSubmit,
  submitText = 'Submit',
  showBackOnFirstStep = false,
  className,
}) => {
  const { nextStep, prevStep, isFirstStep, isLastStep } = useMultiStepForm();

  return (
    <div className={cn('flex justify-between mt-8 pt-4 border-t border-gray-200', className)}>
      {(!isFirstStep || showBackOnFirstStep) && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      <div className="flex-1"></div>
      {isLastStep ? (
        <Button 
          type="button" 
          onClick={onSubmit}
          className="flex items-center bg-blue-600 hover:bg-blue-700"
        >
          {submitText}
          <Check className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={nextStep}
          className="flex items-center bg-blue-600 hover:bg-blue-700"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

interface StepIndicatorProps {
  className?: string;
  labels?: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ className, labels = [] }) => {
  const { currentStep, totalSteps, goToStep, isStepComplete } = useMultiStepForm();

  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = currentStep === index;
          const isComplete = isStepComplete(index);
          const canNavigate = isComplete || index <= currentStep;
          
          return (
            <React.Fragment key={index}>
              <div 
                className={cn(
                  'flex items-center justify-center rounded-full w-10 h-10 text-sm font-medium transition-colors',
                  isActive ? 'bg-blue-600 text-white' : 
                  isComplete ? 'bg-green-100 text-green-800 border border-green-500' :
                  'bg-gray-100 text-gray-500 border border-gray-300',
                  canNavigate && 'cursor-pointer hover:bg-blue-100 hover:text-blue-800'
                )}
                onClick={() => canNavigate && goToStep(index)}
              >
                {isComplete ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div 
                  className={cn(
                    'h-1 w-10 mx-1',
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {labels.length > 0 && (
        <div className="flex items-center justify-center mt-2">
          {labels.map((label, index) => (
            <div 
              key={index} 
              className={cn(
                'text-xs font-medium px-2 text-center',
                currentStep === index ? 'text-blue-600' : 'text-gray-500',
                index === 0 && 'text-left',
                index === labels.length - 1 && 'text-right'
              )}
              style={{ width: `${100 / labels.length}%` }}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};