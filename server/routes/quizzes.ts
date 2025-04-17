import { Hono } from 'hono'
import * as quizManager from '../handlers/postgressHandlers/quizManager.ts'
import { paginator_schema_Validator } from "../utils/validators/quizValidator.ts"
import { ZodError } from "zod";

export const quizzes = new Hono()

// TODO: add the logic to all the quiz paths
// return a json response with quizzes. the treshold is customizable but cant exceed 100
quizzes.get('/', async (c) => {
    // const perpage = c.req.query('perpage')
    // const page = c.req.query('page')

    // TODO: convert into number
    const { page = 1, perpage = 100 } = c.req.queries()

    const data = { page: page, perpage: perpage }

    let validatedPaginator

    try {
        validatedPaginator = paginator_schema_Validator.parse(data)
    } catch (err) {
        console.log(err)
        if (ZodError) {
            return c.json({
                message: err,
            })
        }
        return c.json({
            message: 'error not identified',
        })
    }

    const quizzes = await quizManager.getQuizzes(validatedPaginator)

    return c.json({
        message: quizzes[0],
    })
})

quizzes.get('/getQuiz/:id', async (c) => {
    const id = c.req.param('id')

    if(!id) {
        return c.json({
            message: 'Quiz id not provided',
        }, 400)
    }

    try {
        const quiz = await quizManager.getQuiz(id)
        if (!quiz) {
            return c.json({
                message: 'Quiz not found',
            }, 404)
        }
        return c.json({
            message: quiz,
        })
    } catch (err) {
        return c.json({
            message: 'Error getting quiz',
            error: (err as Error).message,
        }, 500)
    }
})

// add a quiz to the database (only logged in users can add a quiz)
quizzes.post('/', async (_c) => {
})

// delete a quiz from the database (only logged in users and creator of the quiz can delete it)
quizzes.delete('/:id', (c) => {
    const { id } = c.req.param()
    return c.json({
        message: 'Quiz deleted',
        id
    })
})

// get a random quiz from the database
quizzes.get('/random', (c) => {
    return c.json({
        message: 'Random quiz route'
    })
})

quizzes.get('/topics', async (c) => {
    const topics = await quizManager.getTopics()
    if (!topics) {
        return c.json({
            message: 'No topics found'
        })
    }

    return c.json({
        message: topics[0],
    })
})