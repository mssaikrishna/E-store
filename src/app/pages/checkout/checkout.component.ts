import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

  private router = inject(Router);
  private cartService = inject(CartService);

  constructor(private fb: FormBuilder) {
    // Initialize the form with validation
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)], // Validates 10-digit phone number
      ],
    });
  }

  // Getters for form controls for easy access in the template
  get address() {
    return this.checkoutForm.get('address');
  }

  get phone() {
    return this.checkoutForm.get('phone');
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Process the form submission
      alert('Order placed successfully!');
      this.cartService.clearCart(); // Clear the cart
      this.router.navigate(['/shop']); // Navigate to the shop page
    } else {
      // Trigger validation messages
      this.checkoutForm.markAllAsTouched();
    }
  }
}
