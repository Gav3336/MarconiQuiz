import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordMatchRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const signupValidator = z.object({
  email: z.string().min(3, { message: 'Email must be at least 3 characters' }).email().max(50, { message: 'Email must be less than 50 characters' }).regex(emailRegex, { message: 'Invalid email format' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }).max(20, { message: 'Username must be less than 20 characters' }),
  password: z.string({message: "password must be a string"}).min(8).max(64).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
  confirmPassword: z.string({message: "password must be a string"}).min(8).max(64).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginValidator = z.object({
  email_username: z.string().min(1, { message: 'Email or Username is required' }).max(50, { message: 'Email or Username must be less than 50 characters' }),
  password: z.string().min(1, { message: 'Password is required' }).max(20, { message: 'Password must be less than 20 characters' }).regex(passwordRegex, { message: 'Password must be at least 8 characters long and contain at least one letter and one number' })
});
