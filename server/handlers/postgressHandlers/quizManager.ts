import { dbClient } from "./postgressManager.ts";
import * as quizValidators from "../../utils/validators/quizValidator.ts";

export async function getQuizzes(paginator: quizValidators.paginatorInterface): Promise<quizValidators.quizInterface[]> {
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
        const result = await dbClient.queryObject<quizValidators.quizInterface>(query, [paginator.perpage, (paginator.page - 1) * paginator.perpage]);

        if(result.rows.length === 0) {
            throw new Error("No quizzes found");
        }

        try{
            const parsed_result = quizValidators.quizzes_schema_Validator.parse(result.rows);
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

export async function getTopics(){
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
        const query = "SELECT * FROM topics";
        const result = await dbClient.queryObject<quizValidators.quizTopicsInterface>(query);

        if(result.rows.length === 0) {
            throw new Error("No topics found");
        }

        try{
            const parsed_result = quizValidators.quiz_topics_schema_Validator.parse(result.rows);

            return [parsed_result];
        } catch(err) {
            console.log("Error validating topics (quizManager.ts): ", err);
            throw new Error("Error validating topics");
        }
    } catch (err) {
        console.log("Error getting topics (quizManager.ts): ", err);
        throw new Error("Error getting topics");
    } finally {
        await dbClient.end();
    }
}