import { z } from 'npm:zod'

const quiz_schema_Validator = z.object({
    id: z.number(),
    title: z.string().min(3).max(20),
    description: z.string().min(10).max(50).optional(),
    image_link: z.string().url().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    subject_name: z.string().min(3).max(20).optional(),
    created_by: z.string().optional()
})

export const quizzes_schema_Validator = z.array(quiz_schema_Validator)

export type quizInterface = z.infer<typeof quizzes_schema_Validator>