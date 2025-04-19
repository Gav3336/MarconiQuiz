import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { QuizModel } from '../../models/quiz_model';
import { TopicModel } from '../../models/topic_model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class QuizzesManagerService {
  #http = inject(HttpClient);
  #QuizzesURL = 'http://localhost:3000/quizzes';
  #topicURL = 'http://localhost:3000/quizzes/topics';

  router = inject(Router);

  #topics = signal<TopicModel[]>([]);
  topicsComputed = computed(() => this.#topics());

  #quizzes = signal<QuizModel[]>([]);
  quizzesComputed = computed(() => this.#quizzes());

  filteredQuizzes = signal<QuizModel[]>([]);

  loading = signal<boolean>(false);
  errors = signal<string[]>([]);

  constructor() {
    this.getQuizzesViaRest();
    this.getTopicsViaRest();
  }

  getQuizzesViaRest() {
    this.loading.set(true);
    this.#http.get<any>(this.#QuizzesURL).subscribe({
      next: (quizzes) => {
        this.#quizzes.set(quizzes.message);
        this.filteredQuizzes.set(quizzes.message);
      },
      error: (err) => {
        console.error('error fetching quizzes', err);
        this.errors.set(['Error fetching quizzes']);

      }
    }).closed;
    this.loading.set(false);
  }

  getTopicsViaRest() {
    this.#http.get<any>(this.#topicURL).subscribe({
      next: (topics) => {
        this.#topics.set(topics.message);
      }
      , error: (err) => {
        console.error('error fetching topics', err);
        this.errors.set(['Error fetching topics']);
      }
    }).closed;
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

  // clean all filters
  resetFilters() {
    this.loading.set(true);
    this.filteredQuizzes.set(this.#quizzes());
    this.loading.set(false);
  }
}
