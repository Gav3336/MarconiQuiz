export interface SpecificQuizModel {

  id: number;
  quiz_title: string,
  quiz_description: string,
  quiz_image_link?: string,
  quiz_difficulty: string,
  question_type: string,
  username: string
  question_value: string
  question_title: string
  question_image_url?: string
  question_time_limit: number
  order_question: number
  answers?: string[]
  topic_id: number
  topic_name: string
}

export const tmpData = {
    id: -1,
    quiz_title: 'not found',
    quiz_description: 'not_found',
    quiz_image_link: 'not found',
    quiz_difficulty: 'not found',
    question_type: 'multiple_choice',
    username: 'not found',
    question_value: 'not found',
    question_title: 'not found',
    question_image_url: 'not found',
    question_time_limit: 0,
    order_question: 0,
    answers: ['not found'],
    topic_id: -1,
    topic_name: 'not found'
}
