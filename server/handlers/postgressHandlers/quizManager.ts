import { dbPool } from "./postgressManager.ts";
import * as quizValidators from "../../utils/validators/quizValidator.ts";

export async function getQuizzes(paginator: quizValidators.paginatorInterface): Promise<quizValidators.quizInterface[]> {
    try {
        // Connect only once
        using dbClient = await dbPool.connect();
        
        const query = "SELECT q.*, s.username as created_by, t.name as subject_name FROM quizzes q join users s on q.user_id = s.id join topics t on q.topic_id = t.id LIMIT $1 OFFSET $2";
        const result = await dbClient.queryObject<quizValidators.quizInterface>(query, [paginator.perpage, (paginator.page - 1) * paginator.perpage]);

        if(result.rows.length === 0) {
            throw new Error("No quizzes found");
        }

        const parsed_result = quizValidators.quizzes_schema_Validator.parse(result.rows);
        return [parsed_result];
    } catch (err) {
        console.log("Error getting quizzes (quizManager.ts): ", err);
        throw new Error("Error getting quizzes");
    } finally {
        // Disconnect only at the end
        await dbPool.end();
    }
}

export async function getTopics() {
    try {
        // Connect only once
        using dbClient = await dbPool.connect();
        
        const query = "SELECT * FROM topics";
        const result = await dbClient.queryObject<quizValidators.quizTopicsInterface>(query);

        if(result.rows.length === 0) {
            throw new Error("No topics found");
        }

        const parsed_result = quizValidators.quiz_topics_schema_Validator.parse(result.rows);
        return [parsed_result];
    } catch (err) {
        console.log("Error getting topics (quizManager.ts): ", err);
        throw new Error("Error getting topics");
    } finally {
        // Disconnect only at the end
        await dbPool.end();
    }
}