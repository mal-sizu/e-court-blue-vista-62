
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema } from '../../schemas/validationSchemas';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ArrowLeft } from 'lucide-react';

interface OTPFormProps {
  onSubmit: (data: { otp: string }) => Promise<void>;
  onBack: () => void;
  email: string;
  loading: boolean;
}

const OTPForm = ({ onSubmit, onBack, email, loading }: OTPFormProps) => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <motion.div
      key="otp"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center space-y-6">
                <FormLabel className="text-center text-gray-700 font-medium">
                  Enter 6-Digit Verification Code
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-3">
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                      <InputOTPSlot index={4} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                      <InputOTPSlot index={5} className="w-12 h-12 text-lg border-gray-200 focus:border-blue-500" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Didn't receive the code? Resend
            </button>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify & Continue'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default OTPForm;
