import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { SpecificQuizModel, tmpData } from '../../models/specific_quiz_model';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  #http = inject(HttpClient);
  #quiz_URL = 'http://localhost:3000/quizzes/getQuiz';

  #quizData = signal<SpecificQuizModel>(tmpData);
  quizDataComputed = computed(() => this.#quizData());

  loading = signal<boolean>(false);

  getQuizDataViaRest(quizId: number) {
    this.loading.set(true);
    this.#http.get<any>(`${this.#quiz_URL}/${quizId}`).subscribe({
      next: (quiz) => {
        this.#quizData.set(quiz.message);
      },
      error: (err) => {
        this.#quizData.set(tmpData);
        // console.error('error fetching quiz data', err);
      }
    }).closed;
    this.loading.set(false);
  }
}
