import { dbPool } from "./postgressManager.ts";
import * as quizValidators from "../../utils/validators/quizValidator.ts";

export async function getQuizzes(paginator: quizValidators.paginatorInterface): Promise<quizValidators.quizInterface[]> {
    try {
        // Connect only once
        using dbClient = await dbPool.connect();

        const query = "SELECT q.*, s.username as created_by, t.name as subject_name FROM quizzes q join users s on q.user_id = s.id join topics t on q.topic_id = t.id LIMIT $1 OFFSET $2";
        const result = await dbClient.queryObject<quizValidators.quizInterface>(query, [paginator.perpage, (paginator.page - 1) * paginator.perpage]);

        if (result.rows.length === 0) {
            throw new Error("No quizzes found");
        }

        const parsed_result = quizValidators.quizzes_schema_Validator.parse(result.rows);
        return [parsed_result];
    } catch (err) {
        console.log("Error getting quizzes (quizManager.ts): ", err);
        throw new Error("Error getting quizzes");
    }
}

export async function getTopics() {
    try {
        // Connect only once
        using dbClient = await dbPool.connect();

        const query = "SELECT * FROM topics";
        const result = await dbClient.queryObject<quizValidators.quizTopicsInterface>(query);

        if (result.rows.length === 0) {
            throw new Error("No topics found");
        }

        const parsed_result = quizValidators.quiz_topics_schema_Validator.parse(result.rows);

        return [parsed_result];
    } catch (err) {
        console.log("Error getting topics (quizManager.ts): ", err);
        throw new Error("Error getting topics");
    }
}

export async function getQuiz(id: string): Promise<quizValidators.specificQuizInterface> {
    try {
        // Connect only once
        using dbClient = await dbPool.connect();

        const query = `
        select q.id, q.title as quiz_title, q.description as quiz_description, q.image_link as quiz_image_link,
            q.difficulty as quiz_difficulty, qu.type as question_type, u.username, qu.question as question_value,
            qu.title as question_title, qu.image_link as question_image_url,
            qu.time_limit as question_time_limit, qu.order_question, a.answers, t.id as topic_id, t.name as topic_name
        from quizzes q
            join users u on q.user_id = u.id
            join topics t on q.topic_id = t.id
            join questions qu on qu.quiz_id = q.id
            join answers a on a.question_id = qu.id
        where q.id = $1
        `;
        const result = await dbClient.queryObject<quizValidators.specificQuizInterface>(query, [id]);

        if (result.rows.length === 0) {
            throw new Error("No quiz found");
        }

        const parsed_result = quizValidators.specific_quiz_schema.parse(result.rows[0]);

        return parsed_result;
    } catch (err) {
        console.log("Error getting quiz (quizManager.ts): ", err);
        throw new Error("Error getting quiz");
    }
}