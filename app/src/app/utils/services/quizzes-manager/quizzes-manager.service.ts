import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { QuizModel } from '../../models/quiz_model';

@Injectable({
  providedIn: 'root'
})

export class QuizzesManagerService {
  #http = inject(HttpClient);
  #QuizzesURL = 'http://localhost:3000/quizzes';
  #topicURL = 'http://localhost:3000/topics';

  #quizzes = signal<QuizModel[]>([]);
  quizzesComputed = computed(() => this.#quizzes());

  filteredQuizzes = signal<QuizModel[]>([]);

  loading = signal<boolean>(false);

  constructor() {
    this.getQuizzesViaRest();
  }

  getQuizzesViaRest() {
    this.#http.get<any>(this.#QuizzesURL).subscribe({
      next: (quizzes) => {
        this.#quizzes.set(quizzes.message);
        this.filteredQuizzes.set(quizzes.message);
      },
      error: (err) => {
        console.error('error fetching quizzes', err);
        throw new Error('Error fetching quizzes');
      }
    }).closed;
    this.loading.set(false);
  }

  filterQuizzesByTitle(title?: string) {
    this.loading.set(true);
    if (title) {
      this.filteredQuizzes.set(
        this.#quizzes().filter((quiz) =>
          quiz.title.toLowerCase().includes(title.toLowerCase())
        )
      );
    } else {
      this.filteredQuizzes.set(this.#quizzes());
    }
    this.loading.set(false);
  }

  filterQuizzesWithExtraFilters(createdby?: string, difficulty?: string, topic?: string) {
    this.loading.set(true);
    let filteredQuizzes = this.#quizzes();
    if (createdby) {
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.created_by.toLowerCase().includes(createdby.toLowerCase())
      );
    }
    if (difficulty) {
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.difficulty.toLowerCase().includes(difficulty.toLowerCase())
      );
    }
    if (topic) {
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.subject_name.toLowerCase().includes(topic.toLowerCase())
      );
    }
    this.filteredQuizzes.set(filteredQuizzes);

    this.loading.set(false);
  }
}
