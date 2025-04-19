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

    // this.#http.post<any>(`${this.#base_URL}/signup`, { email, password }).subscribe({
    //   next: (response) => {
    //     // Handle success
    //   },
    //   error: (error) => {
    //     // Handle error
    //   }
    // })

    this.loading.set(false);
  }

  login() {
  }

  jwtcheck() {
  }

  logout() {
  }
}
