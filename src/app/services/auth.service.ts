import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isAuthenticated = signal<boolean>(!!localStorage.getItem('token'));
  private isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private token: string | null = localStorage.getItem('token');
  // private token = signal<string | null>(localStorage.getItem('token'));

  // private token: string | null = null;
  private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  authStatus$ = this.isAuthenticated.asObservable();

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        this.token = response.access_token;
        localStorage.setItem('token', this.token);
        this.isAuthenticated.next(true);  // Emit new authentication state
        return true;
      }),
      catchError(() => {
        this.token = null;
        localStorage.removeItem('token');
        this.isAuthenticated.next(false);  // Notify subscribers of logout state
        return of(false);
      })
    );
  }



  // login(email: string, password: string) {
  //   return this.http.post<{ access_token: string }>(this.apiUrl, { email, password }).pipe(
  //     map((response) => {
  //       this.token = response.access_token; // Store the token
  //       localStorage.setItem('token', this.token); // Store token in localStorage
  //       this.isAuthenticated.set(true); 
  //       return true; // Login successful
  //     }),
  //     catchError(() => {                                                              //Signal
  //       this.token = null; // Clear the token on error
  //       localStorage.removeItem('token'); 
  //       return of(false); // Login failed
  //     })
  //   );
  // }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  // logout() {
  //   this.token = null;
  //   localStorage.removeItem('token'); // Clear token    //Signal
  //   this.isAuthenticated.set(false);
  //   this.router.navigate(['/login']);
  // }

  isLoggedIn() {
    return this.isAuthenticated.value; // Get the latest auth state
  }


  // isLoggedIn() {
  //   return this.isAuthenticated();                      //Signal
  // }

  getToken(): string | null {
    return this.token;
  }

}
