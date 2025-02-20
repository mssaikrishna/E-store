import { Component, inject,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../../shared/validator/validators';
import { DynamicHostDirective } from '../../shared/directive/alertDirective/dynamic-host.directive';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule,DynamicHostDirective],
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  showPassword = false;
  showConfirmPassword = false;
  errorMessage: string | null = null; 

  @ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective;

  signupForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),passwordValidator]],
      confirmPassword: ['', Validators.required],
      role: ['user', Validators.required], 
    },
    { validators: this.passwordMatchValidator }
  );

  ngAfterViewInit() {
    // Ensures dynamicHost is available before use
    if (!this.dynamicHost) {
      console.error('DynamicHostDirective is not found');
    }
  }

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
  get role() {
    return this.signupForm.get('role');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     const { email, password,role } = this.signupForm.value;
  //     this.authService.signup(email, password,role); // Save user to localStorage
  //     this.showAlert('User registered successfully!', 'success');
  //     this.router.navigate(['/login']);
  //   }
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, role } = this.signupForm.value;

      // Check if the email is already taken
      if (this.authService.isEmailTaken(email)) {
        // this.errorMessage = 'Email is already registered.';
        this.showAlert('Email is already registered.', 'danger');

        setTimeout(() => {
          this.dynamicHost.viewContainerRef.clear();
        }, 3000);
        
        return;
      }

      // Register the user
      const isRegistered = this.authService.signup(email, password, role);
      if (isRegistered) {
        this.showAlert('User registered successfully!', 'success');
        // this.router.navigate(['/login']);
        setTimeout(() => {
          this.dynamicHost.viewContainerRef.clear();
        }, 3000);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
        this.showAlert('Registration failed. Please try again.', 'danger');
      }
    }
  }

  // showAlert(message: string, type: string) {
  //   alert(message); // Replace with a proper alert/notification system
  // }

  showAlert(message: string, type: 'success' | 'danger' | 'warning') {
    debugger
    if (this.dynamicHost) {
      const viewContainerRef = this.dynamicHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(AlertComponent);
      componentRef.instance.message = message;
      componentRef.instance.type = type;
    }
  }
}