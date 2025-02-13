import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     if (this.authService.login(email, password)) {
  //       this.router.navigate(['/shop']);
  //     } else {
  //       alert('Invalid credentials');
  //     }
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            localStorage.setItem('token', this.authService.getToken()!); // Store token
            this.router.navigate(['/shop']); // Navigate to shop
          } else {
            alert('Invalid credentials'); // Show error message
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert('An error occurred while logging in.');
        }
      );
    }
  }
  
}