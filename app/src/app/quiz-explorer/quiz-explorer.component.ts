import { Component, inject, OnInit } from '@angular/core';
import { QuizzesManagerService } from '../utils/services/quizzes-manager/quizzes-manager.service';
import { QuizCardComponent } from "../utils/quiz-card/quiz-card.component";
import { RouterLink } from '@angular/router';
import { LoginSignupComponentsComponent } from "../login-signup-components/login-signup-components.component";

@Component({
  selector: 'app-quiz-explorer',
  imports: [QuizCardComponent, RouterLink, LoginSignupComponentsComponent],
  templateUrl: './quiz-explorer.component.html',
  styleUrl: './quiz-explorer.component.css',
  standalone: true,
})
export class QuizExplorerComponent {
  quizManager = inject(QuizzesManagerService);
  quizzes = this.quizManager.quizzesComputed;
}
