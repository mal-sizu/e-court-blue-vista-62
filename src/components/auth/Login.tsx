import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Mail, Shield } from 'lucide-react';
import BrandingPanel from './BrandingPanel';
import LoginForm from './LoginForm';
import OTPForm from './OTPForm';
import authService from '../../services/authService';
import bcrypt from 'bcryptjs';
import { jwtDecode } from 'jwt-decode';
import dashboardService from '../../services/dashboardService';

const Login = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      // const hashedPassword = await bcrypt.hash(data.password, 12);
      const response = await authService.login({
        emailOffice: data.email,
        password: data.password
      });
      setEmail(data.email);
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
      const response = await authService.verifyOTPLogin({
        emailOffice: email,
        userOTP: data.otp
      });
      const { token } = response;
      // Fetch user info from dashboard stats
      const dashboardData = await dashboardService.getDashboardStats(token);
      const decoded: any = jwtDecode(token);
      const user = {
        id: decoded.id,
        fullName: dashboardData.user.name,
        email: email,
        role: dashboardData.user.role,
        image: dashboardData.user.image || ''
      };
      login(user, token);
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('login');
  };

  return (
    <div className="min-h-screen w-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <BrandingPanel step={step} />

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
                  <LoginForm onSubmit={handleLogin} loading={loading} />
                ) : (
                  <OTPForm 
                    onSubmit={handleOTPVerification}
                    onBack={handleBack}
                    email={email}
                    loading={loading}
                  />
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
