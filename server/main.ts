import { Hono } from 'hono'
import { initialConnection } from "./handlers/postgressHandlers/postgressManager.ts"

// try connect to the database
// if there is an error, log the error and exit the process
// if the connection is successful, log the success message
async () => {
    try {
        await initialConnection()
        console.log("Connected to the database")
    } catch (err) {
        console.log("Error connecting to the database (main.ts): ", err)
        Deno.exit(1)
    }
}

const app = new Hono()

app.get('/', (c) => c.text('Hello Deno!'))

Deno.serve({ port: 3000 }, app.fetch) 