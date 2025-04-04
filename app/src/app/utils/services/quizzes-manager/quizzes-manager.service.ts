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

  constructor() {
    this.getQuizzesViaRest();
  }

  getQuizzesViaRest() {
    this.#http.get<any>(this.#url).subscribe({
      next: (quizzes) => {
        this.#quizzes.set(quizzes.message);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
