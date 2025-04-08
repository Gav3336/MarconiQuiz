import { Hono } from 'hono'
import * as quizManager from '../handlers/postgressHandlers/quizManager.ts'
import { paginator_schema_Validator } from "../utils/validators/quizValidator.ts"

export const quizzes = new Hono()

// TODO: add the logic to all the quiz paths
// return a json response with quizzes. the treshold is customizable but cant exceed 100
quizzes.get('/', async (c) => {
    const data = c.req.query()

    const validatedPaginator = paginator_schema_Validator.parse(data)

    const quizzes = await quizManager.getQuizzes(validatedPaginator)

    return c.json({
        message: quizzes[0],
    })
})

// // return a json response with the quiz with the given id
// quizzes.get('/:id', (c) => {
//     const { id } = c.req.param()
//     return c.json({
//         message: 'Quiz route',
//         id
//     })
// })

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
    console.log('topics route')
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