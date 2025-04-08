import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-page',
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent {
  quizID: string = '';

  @Input()
  set id(heroId: string) {
    this.quizID = heroId;
  }

  constructor() {

  }


}
