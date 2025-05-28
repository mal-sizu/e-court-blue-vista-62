
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, otpSchema } from '../../schemas/validationSchemas';
import { authAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Login = () => {
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema)
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema)
  });

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      setEmail(data.email);
      // Mock API response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (data) => {
    setLoading(true);
    try {
      // Mock API response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        fullName: 'John Doe',
        email: email,
        role: 'registrar'
      };
      
      login(userData, 'mock-token-123');
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div 
            className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 'login' ? 'Sign in to E-Court' : 'Verify OTP'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'login' 
              ? 'Enter your credentials to access the system'
              : `We've sent a 6-digit code to ${email}`
            }
          </p>
        </div>

        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {step === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                {...loginForm.register('email')}
                error={loginForm.formState.errors.email?.message}
                placeholder="Enter your email"
              />
              
              <Input
                label="Password"
                type="password"
                {...loginForm.register('password')}
                error={loginForm.formState.errors.password?.message}
                placeholder="Enter your password"
              />

              <div className="flex items-center justify-between">
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(handleOTPVerification)} className="space-y-6">
              <Input
                label="OTP Code"
                {...otpForm.register('otp')}
                error={otpForm.formState.errors.otp?.message}
                placeholder="Enter 6-digit code"
                maxLength="6"
              />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep('login')}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  loading={loading}
                >
                  Verify
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
