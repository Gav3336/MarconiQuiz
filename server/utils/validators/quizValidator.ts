import { z } from 'npm:zod'

export const quizValidator = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().optional()
})