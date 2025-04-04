import { Component, input } from '@angular/core';
import { QuizModel } from '../models/quiz_model';

@Component({
  selector: 'app-quiz-card',
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css'
})
export class QuizCardComponent {
  quiz_data = input.required<QuizModel>();
  quiz_color = input<string>('blue');
}
