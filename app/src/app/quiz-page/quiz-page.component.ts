import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { GameManagerService } from '../utils/services/quiz_game_manager/game-manager.service';

@Component({
  selector: 'app-quiz-page',
  imports: [],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.css'
})
export class QuizPageComponent implements OnInit {
  quizID: string = '';
  gameManager = inject(GameManagerService);

  loading = computed(() => this.gameManager.loading());

  quizData = computed(() => this.gameManager.quizDataComputed());
  @Input()
  set id(pageId: string) {
    this.quizID = pageId;
  }

  ngOnInit(){
    this.gameManager.getQuizDataViaRest(parseInt(this.quizID));
  }


}
