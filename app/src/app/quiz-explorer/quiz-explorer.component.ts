import { Component, computed, inject } from '@angular/core';
import { QuizzesManagerService } from '../utils/services/quizzes-manager/quizzes-manager.service';
import { QuizCardComponent } from '../utils/components/quiz-card/quiz-card.component';
import { NavbarComponent } from "../utils/components/navbar/navbar.component";
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-explorer',
  imports: [QuizCardComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './quiz-explorer.component.html',
  styleUrl: './quiz-explorer.component.css',
  standalone: true,
})
export class QuizExplorerComponent {
  title = new FormControl('');

  extraFilters = new FormGroup({
    createdby: new FormControl(''),
    difficulty: new FormControl(''),
    topic: new FormControl(''),
  });

  error = computed(() => this.quizManager.errors());

  quizManager = inject(QuizzesManagerService);
  loading = computed(() => this.quizManager.loading());

  filteredQuizzes = computed(() => this.quizManager.filteredQuizzes());
  topics = computed(() => this.quizManager.topicsComputed());

  constructor() {
    this.title.valueChanges.subscribe((value) => {
      this.quizManager.filterQuizzesByTitle(value || '');
    });

    this.extraFilters.valueChanges.subscribe((value) => {
      this.quizManager.filterQuizzesWithExtraFilters(value.createdby || '', value.difficulty || '', value.topic || '');
    });
  }

  resetExtraFilters() {
    this.extraFilters.reset();
    this.quizManager.filterQuizzesWithExtraFilters('', '', '');
    this.title.setValue('');
    this.quizManager.filterQuizzesByTitle('');
  }

  // when the user navigates away from the component, reset the filters
  ngOnDestroy() {
    this.quizManager.resetFilters();
  }
}
