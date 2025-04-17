import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

const POOL_CONNECTIONS = 20;

export const dbPool = new Pool(
    {
        user: "admin",
        database: "marconiquiz",
        hostname: "localhost",
        password: "cisco",
        port: 5432,
    },
    POOL_CONNECTIONS,
);


/**
 * * Connect to the database and test the connection
 * @returns {Promise<void>}
 * @throws {Error} If there is an error connecting to the database
 * @description This function connects to the database and tests the connection. if the connection is successful, it will return void. If there is an error, it will throw an error.
 */
export async function initialConnection(): Promise<void> {
    try {
        // test the connection to the database
        await dbPool.connect()
    }
    catch (err) {
        // if there is an error, log the error and throw an error
        console.log("errore durante la connessiona al database (postgressManager.ts): ", err)
        throw new Error("Error connecting to the database")
        // disconnect the client at the end (both in case of success and error)
    } finally {
        await dbPool.end()
    }
}