import { Hono } from 'hono'
import { initialConnection } from "./handlers/postgressHandlers/postgressManager.ts"
import { signup, login, tokenChecker } from "./handlers/postgressHandlers/userManager.ts"
import { userDataSchema, userDataInterface, loginDataSchema } from "./utils/validators/userValidator.ts"
import { quizzes } from "./routes/quizzes.ts"

// try connect to the database
// if there is an error, log the error and exit the process
// if the connection is successful, log the success message
(async () => {
    try {
        await initialConnection()
        console.log("Connected to the database")
    } catch (err) {
        console.log("Error connecting to the database (main.ts): ", err)
        Deno.exit(1)
    }
})()


const app = new Hono()

app.post('/signup', async (c) => {
    const userData = await c.req.parseBody()

    try {
        userDataSchema.parse(userData)
    } catch (err) {
        console.log("Error validating user data (main.ts): ", err)
        return c.json({ message: 'Invalid user data', error: err }, 400)
    }

    try {
        await signup(userData as unknown as userDataInterface)
    } catch (err) {
        console.log("Error signing up user (main.ts): ", err)
        if (err instanceof Error)
            return c.json({ message: 'Error signing up user', error: err.message }, 500)
    }

    return c.json({
        message: 'User created successfully',
        data: userData
    })
})

app.post('/login', async (c) => {
    const loginData = await c.req.parseBody()

    try {
        loginDataSchema.parse(loginData)
    } catch (err) {
        console.log("Error validating user data (main.ts): ", err)
        return c.json({ message: 'Invalid user data', error: err }, 400)
    }

    // check if the user exists
    try {
        const token = await login(loginData as unknown as userDataInterface)

        return c.json({
            message: 'User logged in successfully',
            data: token
        })
    } catch (err) {
        console.log("Error logging in user (main.ts): ", err)
        if (err instanceof Error)
            return c.json({ message: 'Error logging in user', error: err.message }, 500)
    }
})

app.post('/check', async (c) => {
    const token = c.req.header('Authorization')
    if (!token) {
        return c.json({ message: 'No token provided' }, 401)
    }

    try {
        const valid = await tokenChecker(token)

        if (!valid) {
            return c.json({ message: 'Error while validating' }, 500)
        }

        // token is valid :)
        return c.json({
            message: 'Token is valid',
            data: valid
        })
    } catch (err) {
        console.log("Error checking token (main.ts): ", err)
        return c.json({ message: 'Error checking token', error: (err as Error).message }, 500)
    }
})

app.route('/quizzes', quizzes)

// catch all route that are not defined
app.all('*', (c) => {
    return c.json({ message: '404 Not Found' }, 404)
})


Deno.serve({ port: 3000 }, app.fetch) 