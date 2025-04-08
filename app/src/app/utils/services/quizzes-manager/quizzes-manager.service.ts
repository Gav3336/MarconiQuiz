import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { QuizModel } from '../../models/quiz_model';

@Injectable({
  providedIn: 'root'
})

export class QuizzesManagerService {
  #http = inject(HttpClient);
  #url = 'http://localhost:3000/quizzes';

  #quizzes = signal<QuizModel[]>([]);
  quizzesComputed = computed(() => this.#quizzes());

  filteredQuizzes = signal<QuizModel[]>([]);

  loading = signal<boolean>(true);

  constructor() {
    this.getQuizzesViaRest();
  }

  getQuizzesViaRest() {
    this.#http.get<any>(this.#url).subscribe({
      next: (quizzes) => {
        this.loading.set(false);
        this.#quizzes.set(quizzes.message);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  filterQuizzesByTitle(title: string) {
    if (title) {
      this.filteredQuizzes.set(
        this.#quizzes().filter((quiz) =>
          quiz.title.toLowerCase().includes(title.toLowerCase())
        )
      );
    } else {
      this.filteredQuizzes.set(this.#quizzes());
    }
  }
}
