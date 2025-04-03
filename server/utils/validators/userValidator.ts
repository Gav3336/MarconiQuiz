import { z } from "zod";

export interface userDataInterface {
    username: string;
    password: string;
    email: string;
    salt?: string
    birthday?: Date;
    num_tel?: string;
}

export const loginDataSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8),
})
.refine(data => data.username !== undefined || data.email !== undefined, {
  message: "Either username or email must be provided",
  path: ["username", "email"]
});

export type LoginDataInterface = z.infer<typeof loginDataSchema>;

export const userDataSchema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers and underscores"),
    password: z.string().min(8).max(64).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email must be a valid email address"),
    birthday: z.string().date().optional(),
    num_tel: z.string().optional(),
});