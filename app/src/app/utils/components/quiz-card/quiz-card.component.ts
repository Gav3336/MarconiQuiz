import { NgClass } from '@angular/common';
import { QuizModel } from './../../models/quiz_model';
import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [NgClass, RouterLink],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css'
})
export class QuizCardComponent {
  quiz_data = input.required<QuizModel>();
}
