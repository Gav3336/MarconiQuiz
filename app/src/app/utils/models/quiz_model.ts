export interface QuizModel {
  id: number;
  subject_name: string;
  title: string;
  created_by: string;
  description?: string;
  difficulty: string;
  image_url?: string
}
