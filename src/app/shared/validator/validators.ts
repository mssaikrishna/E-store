import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom validator to check if the password contains at least one special character
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    if (!value) return null; // If password is empty, let required validator handle it.
  
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
    const errors: ValidationErrors = {};
  
    if (!hasUpperCase) {
      errors['uppercase'] = 'Password must contain at least one uppercase letter.';
    }
  
    if (!hasLowerCase) {
      errors['lowercase'] = 'Password must contain at least one lowercase letter.';
    }
  
    if (!hasSpecialCharacter) {
      errors['specialCharacter'] = 'Password must contain at least one special character.';
    }
  
    return Object.keys(errors).length ? errors : null;
  }