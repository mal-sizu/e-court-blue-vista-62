
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Lock } from 'lucide-react';

interface BrandingPanelProps {
  step: 'login' | 'otp';
}

const BrandingPanel = ({ step }: BrandingPanelProps) => {
  return (
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
  );
};

export default BrandingPanel;
