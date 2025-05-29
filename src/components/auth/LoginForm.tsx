
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/validationSchemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  loading: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <motion.div
      key="login"
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Mail className="w-4 h-4" />
                  <span>Office Email </span>
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
            control={form.control}
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
  );
};

export default LoginForm;
