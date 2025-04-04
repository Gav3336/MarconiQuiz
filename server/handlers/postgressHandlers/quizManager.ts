import { dbClient } from "./postgressManager.ts";
import { quizInterface, quizzes_schema_Validator } from "../../utils/validators/quizValidator.ts";

export async function getQuizzes(page: number, perpage: number): Promise<quizInterface[]> {
    // check db connection
    try {
        await dbClient.connect()

    } catch (err) {
        console.log("Error connecting to the database (userManager.ts): ", err)
        throw new Error("Error connecting to the database")
    } finally {
        await dbClient.end()
    }

    try {
        await dbClient.connect();
        const query = "SELECT q.*, s.username as created_by, t.name as subject_name FROM quizzes q join users s on q.user_id = s.id join topics t on q.topic_id = t.id LIMIT $1 OFFSET $2";
        const result = await dbClient.queryObject<quizInterface>(query, [perpage, (page - 1) * perpage]);

        if(result.rows.length === 0) {
            throw new Error("No quizzes found");
        }

        try{
            const parsed_result = quizzes_schema_Validator.parse(result.rows);
            console.log(result.rows);
            console.log("Parsed result: ", parsed_result);

            return [parsed_result];
        } catch(err) {
            console.log("Error validating quizzes (quizManager.ts): ", err);
            throw new Error("Error validating quizzes");
        }
    } catch (err) {
        console.log("Error getting quizzes (quizManager.ts): ", err);
        throw new Error("Error getting quizzes");
    } finally {
        await dbClient.end();
    }
}