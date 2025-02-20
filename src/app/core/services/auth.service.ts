import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private token: string | null = localStorage.getItem('token');
  private role: string | null = localStorage.getItem('role'); // Store user role

  constructor(private router: Router) {}

  authStatus$ = this.isAuthenticated.asObservable();

  // Login using localStorage
  login(email: string, password: string): boolean {
    const users = this.getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      this.token = 'fake-token'; // Simulate a token
      this.role = user.role; // Set the user's role
      localStorage.setItem('token', this.token);
      localStorage.setItem('role', this.role); // Store role in localStorage
      this.isAuthenticated.next(true);
      return true; // Login successful
    } else {
      this.token = null;
      this.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.isAuthenticated.next(false);
      return false; // Login failed
    }
  }

  // Logout
  logout() {
    this.token = null;
    this.role = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  // Get the token
  getToken(): string | null {
    return this.token;
  }

  // Get the role
  getRole(): string | null {
    return this.role;
  }

  isEmailTaken(email: string): boolean {
    const users = this.getUsersFromLocalStorage();
    return users.some((user) => user.email === email);
  }

  // Save user to localStorage during signup
  signup(email: string, password: string, role: string = 'user'): boolean {
    if (this.isEmailTaken(email)) {
      return false; // Email already exists
    }

    const users = this.getUsersFromLocalStorage();
    users.push({ email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    return true; // User registered successfully
  }

  // Get users from localStorage
  public getUsersFromLocalStorage(): { email: string; password: string; role: string }[] {
    const usersJson = localStorage.getItem('users');
    return usersJson ? JSON.parse(usersJson) : [];
  }
}