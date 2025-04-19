import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordMatchRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const signupValidator = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email().max(50, { message: 'Email must be less than 50 characters' }).regex(emailRegex, { message: 'Invalid email format' }),
  username: z.string().min(1, { message: 'Username is required' }).max(20, { message: 'Username must be less than 20 characters' }),
  password: z.string().min(1, { message: 'Password is required' }).max(20, { message: 'Password must be less than 20 characters' }).regex(passwordRegex, { message: 'Password must be at least 8 characters long and contain at least one letter and one number' }),
  confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }).max(20, { message: 'Confirm Password must be less than 20 characters' }).regex(passwordMatchRegex, { message: 'Password must be at least 8 characters long and contain at least one letter and one number' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginValidator = z.object({
  email_username: z.string().min(1, { message: 'Email or Username is required' }).max(50, { message: 'Email or Username must be less than 50 characters' }),
  password: z.string().min(1, { message: 'Password is required' }).max(20, { message: 'Password must be less than 20 characters' }).regex(passwordRegex, { message: 'Password must be at least 8 characters long and contain at least one letter and one number' })
});
