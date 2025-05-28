
import { z } from 'zod';
import { CaseCategory, CaseType } from '../constants/dataTypes';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits')
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const participantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  contactNumber: z.string().optional(),
  nic: z.string().optional()
});

const lawyerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  barID: z.string().min(1, 'Bar ID is required')
});

export const caseRequestSchema = z.object({
  court: z.string().min(1, 'Court is required'),
  city: z.string().min(1, 'City is required'),
  caseTitle: z.string().min(1, 'Case title is required'),
  caseCategory: z.enum(Object.values(CaseCategory), {
    errorMap: () => ({ message: 'Please select a valid case category' })
  }),
  caseType: z.enum(Object.values(CaseType), {
    errorMap: () => ({ message: 'Please select a valid case type' })
  }),
  caseDescription: z.string().min(10, 'Case description must be at least 10 characters'),
  plaintiffs: z.array(participantSchema).min(1, 'At least one plaintiff is required'),
  plaintiffsLawyers: z.array(lawyerSchema).min(1, 'At least one plaintiff lawyer is required')
});
