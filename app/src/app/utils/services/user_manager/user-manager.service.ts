import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {
  #http = inject(HttpClient);
  #base_URL = 'http://localhost:3000/user';

  loading = signal<boolean>(false);
  logged = signal<boolean>(false);

  jwt = signal<string>('');

  signup(signupForm: any) {
    this.loading.set(true);

    console.log(signupForm);

    this.#http.post<any>(`${this.#base_URL}/signup`, signupForm).subscribe({
      next: (response) => {
        console.log(response);
        return response;
      },
      error: (error) => {
        console.log(error);
        return error;
      }
    })

    this.loading.set(false);
  }

  login() {
  }

  jwtcheck() {
  }

  logout() {
  }
}
