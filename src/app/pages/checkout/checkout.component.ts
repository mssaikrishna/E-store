import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
})
export class CheckoutComponent {
  address: string = '';
  phone: string = '';

  // Validation flags
  addressError: string = '';
  phoneError: string = '';

  private router = inject(Router);
  private cartService = inject(CartService);

  // Validate address dynamically
  validateAddress() {
    if (!this.address) {
      this.addressError = 'Address is required.';
    } else {
      this.addressError = '';
    }
  }

  // Validate phone number dynamically
  validatePhone() {
    if (!this.phone) {
      this.phoneError = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(this.phone)) {
      this.phoneError = 'Phone number must be 10 digits.';
    } else {
      this.phoneError = '';
    }
  }

  onSubmit() {
    // Validate fields before submission
    this.validateAddress();
    this.validatePhone();

    // If no errors, proceed with order placement
    if (!this.addressError && !this.phoneError) {
      alert('Order placed successfully!');
      this.cartService.clearCart(); // Clear the cart
      this.router.navigate(['/shop']); // Navigate to the shop page
    }
  }
}