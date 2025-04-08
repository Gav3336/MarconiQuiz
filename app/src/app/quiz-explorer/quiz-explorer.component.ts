import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { QuizzesManagerService } from '../utils/services/quizzes-manager/quizzes-manager.service';
import { QuizCardComponent } from "../utils/quiz-card/quiz-card.component";
import { NavbarComponent } from "../utils/components/navbar/navbar.component";
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { QuizModel } from '../utils/models/quiz_model';

@Component({
  selector: 'app-quiz-explorer',
  imports: [QuizCardComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './quiz-explorer.component.html',
  styleUrl: './quiz-explorer.component.css',
  standalone: true,
})
export class QuizExplorerComponent {
  title = new FormControl('');
  quizManager = inject(QuizzesManagerService);
  loading = computed(() => this.quizManager.loading());

  filteredQuizzes = signal<QuizModel[]>(this.quizManager.quizzesComputed());

  constructor() {
    this.title.valueChanges.subscribe((value) => {
      if(!value) {
        this.filteredQuizzes.set(this.quizManager.quizzesComputed());
        return;
      }
      this.quizManager.filterQuizzesByTitle(value);
      this.filteredQuizzes.set(this.quizManager.filteredQuizzes());
    });
  }
}
