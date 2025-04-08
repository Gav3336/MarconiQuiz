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

  quizManager = inject(QuizzesManagerService);
  loading = computed(() => this.quizManager.loading());

  // TODO: resolve the initial quizzes showned
  filteredQuizzes = computed(() => this.quizManager.filteredQuizzes());

  constructor() {
    this.title.valueChanges.subscribe((value) => {
      this.quizManager.filterQuizzesByTitle(value || '');
    });

    this.extraFilters.valueChanges.subscribe((value) => {
      this.quizManager.filterQuizzesWithExtraFilters(value.createdby || '', value.difficulty || '', value.topic || '');
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  resetExtraFilters() {
    console.log('resetting extra filters');
    this.extraFilters.reset();
    this.quizManager.filterQuizzesWithExtraFilters('', '', '');
  }
}
