import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { passwordValidator } from '../../shared/validator/validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  showPassword = false;
  showConfirmPassword = false;

  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6),passwordValidator]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     alert('User registered successfully!');
  //     this.router.navigate(['/login']);
  //   }
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
  
      // Get existing users from local storage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
  
      // Check if email already exists
      if (users.some((user: any) => user.email === email)) {
        alert('User with this email already exists!');
        return;
      }
  
      // Add new user to the local storage
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
  
      alert('User registered successfully!');
      this.router.navigate(['/login']);
    }
  }
  
}
