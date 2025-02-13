import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
  // private token = signal<string | null>(localStorage.getItem('token'));

  private token: string | null = null;
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient, private router: Router) {}

  // login(email: string, password: string): boolean {
  //   if (email === 'test@test.com' && password === 'password@123') {
  //     this.isAuthenticated.set(true);
  //     this.token.set('fake-jwt-token');
  //     localStorage.setItem('token', 'fake-jwt-token'); // Store token in localStorage
  //     return true;
  //   }
  //   return false;
  // }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response) => {
        this.token = response.access_token; // Store the token
        localStorage.setItem('token', this.token); // Store token in localStorage
        this.isAuthenticated.set(true); 
        return true; // Login successful
      }),
      catchError(() => {
        this.token = null; // Clear the token on error
        localStorage.removeItem('token'); 
        return of(false); // Login failed
      })
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token'); // Clear token
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  // logout() {
  //   this.isAuthenticated.set(false);
  //   this.token.set(null);
  //   localStorage.removeItem('token'); // Remove token from storage
  // }


  isLoggedIn() {
    return this.isAuthenticated();
  }

  getToken(): string | null {
    return this.token;
  }


  // getToken() {
  //   return this.token();
  // }
}
