import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { passwordValidator } from '../../shared/validator/validators';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
      password: ['', [Validators.required, Validators.minLength(6),passwordValidator]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const isLoggedIn = this.authService.login(email, password); // Authenticate from localStorage

      if (isLoggedIn) {
        this.router.navigate(['/shop']); // Navigate to shop
      } else {
        alert('Invalid credentials'); // Show error message
      }
    }
  }
}