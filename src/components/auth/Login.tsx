
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, otpSchema } from '../../schemas/validationSchemas';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Shield, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  const handleLogin = async (data: { email: string; password: string }) => {
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

  const handleOTPVerification = async (data: { otp: string }) => {
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

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-white">
      {/* Left Side - Branding */}
      <motion.div 
        className="hidden lg:flex lg:flex-1 flex-col justify-center px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8"
          >
            <Shield className="w-8 h-8" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            E-Court System
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Streamline your judicial processes with our comprehensive digital court management platform
          </motion.p>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-blue-100">Secure Authentication</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-blue-100">Case Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-blue-100">Digital Records</span>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-8 right-8">
          <motion.div 
            className="h-1 bg-white/20 rounded-full overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step === 'otp' ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <p className="text-blue-100 text-sm mt-2">
            Step {step === 'login' ? '1' : '2'} of 2
          </p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center space-y-2 pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {step === 'login' ? 'Welcome Back' : 'Verify Your Identity'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {step === 'login' 
                  ? 'Sign in to access your E-Court dashboard'
                  : `Enter the 6-digit code sent to ${email}`
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <AnimatePresence mode="wait">
                {step === 'login' ? (
                  <motion.div
                    key="login"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>Email Address</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email" 
                                  type="email"
                                  className="h-12"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center space-x-2">
                                <Lock className="w-4 h-4" />
                                <span>Password</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your password" 
                                  type="password"
                                  className="h-12"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                          >
                            Forgot your password?
                          </button>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Signing In...</span>
                            </div>
                          ) : (
                            'Sign In'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="otp"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(handleOTPVerification)} className="space-y-6">
                        <FormField
                          control={otpForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem className="flex flex-col items-center space-y-4">
                              <FormLabel className="text-center">
                                Enter Verification Code
                              </FormLabel>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup className="gap-2">
                                    <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                                    <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                                    <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                                    <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                                    <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                                    <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
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
                            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                          >
                            Didn't receive the code? Resend
                          </button>
                        </div>

                        <div className="flex space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1 h-12"
                            onClick={() => setStep('login')}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
