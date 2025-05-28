
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
import { ArrowLeft, Shield, Mail, Lock, Sparkles } from 'lucide-react';

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Left Side - Enhanced Branding */}
      <motion.div 
        className="hidden lg:flex lg:flex-1 flex-col justify-center px-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 shadow-2xl"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-5xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            E-Court System
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Experience the future of judicial administration with our comprehensive digital court management platform
          </motion.p>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Shield, text: "Enterprise Security" },
              { icon: Sparkles, text: "AI-Powered Insights" },
              { icon: Lock, text: "End-to-End Encryption" }
            ].map((feature, index) => (
              <motion.div 
                key={feature.text}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/90 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-12 left-12 right-12">
          <motion.div 
            className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: step === 'otp' ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <p className="text-white/80 text-sm mt-3 font-medium">
            Step {step === 'login' ? '1' : '2'} of 2 - {step === 'login' ? 'Authentication' : 'Verification'}
          </p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-3 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
              >
                {step === 'login' ? (
                  <Mail className="w-6 h-6 text-white" />
                ) : (
                  <Shield className="w-6 h-6 text-white" />
                )}
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-gray-900">
                {step === 'login' ? 'Welcome Back' : 'Verify Identity'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {step === 'login' 
                  ? 'Sign in to access your dashboard'
                  : `Enter the 6-digit verification code sent to ${email}`
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-8">
              <AnimatePresence mode="wait">
                {step === 'login' ? (
                  <motion.div
                    key="login"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                  >
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                                <Mail className="w-4 h-4" />
                                <span>Email Address</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your email" 
                                  type="email"
                                  className="h-12 border-gray-200 focus:border-blue-500 transition-colors"
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
                              <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                                <Lock className="w-4 h-4" />
                                <span>Password</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your password" 
                                  type="password"
                                  className="h-12 border-gray-200 focus:border-blue-500 transition-colors"
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
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                          >
                            Forgot password?
                          </button>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-200"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="flex items-center space-x-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Signing in...</span>
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
                    transition={{ duration: 0.4 }}
                  >
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(handleOTPVerification)} className="space-y-8">
                        <FormField
                          control={otpForm.control}
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
                            onClick={() => setStep('login')}
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
