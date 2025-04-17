import { string, z, infer as zodInfer } from 'npm:zod'

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

export const quiz_topic_schema_Validator = z.object({
    id: z.number(),
    name: z.string().min(3).max(20)
})

export const quiz_topics_schema_Validator = z.array(quiz_topic_schema_Validator)

export type quizTopicsInterface = z.infer<typeof quiz_topics_schema_Validator>

export const paginator_schema_Validator = z.object({
    page: z.number({message: 'not a valid number page'}).min(1, {message: 'the minimum page is 1'}).optional().default(1),
    perpage: z.number({message: 'not a valid perpage number'}).min(1, {message: 'the minimum per page is 1'}).max(100, {message: 'the maximum per page is 100'}).optional().default(100)
})

export type paginatorInterface = z.infer<typeof paginator_schema_Validator>


export const specific_quiz_schema = z.object({
    id: z.number(),
    quiz_title: z.string(),
    quiz_description: z.string(),
    quiz_image_link: z.string().url(),
    quiz_difficulty: z.enum(['easy', 'medium', 'hard']),
    question_type: z.enum(['multiple_choice', 'trueFalse']),
    username: z.string(),
    question_value: z.string(),
    question_title: z.string(),
    question_image_url: z.string().url(),
    question_time_limit: z.number(),
    order_question: z.number(),
    answers: z.string().array().optional(),
    topic_id: z.number(),
    topic_name: z.string()
})

export type specificQuizInterface = zodInfer<typeof specific_quiz_schema>