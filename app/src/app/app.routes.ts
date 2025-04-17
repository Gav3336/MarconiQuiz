import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizExplorerComponent } from './quiz-explorer/quiz-explorer.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'explore_quizzes', component: QuizExplorerComponent},
  {path: 'login', component: LoginSignupComponent},
  {path: 'quiz/:id', loadComponent: () => import('./quiz-page/quiz-page.component').then(m => m.QuizPageComponent)},
];
