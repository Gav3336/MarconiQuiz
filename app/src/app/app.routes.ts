import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizExplorerComponent } from './quiz-explorer/quiz-explorer.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'explore_quizzes', component: QuizExplorerComponent},
];
