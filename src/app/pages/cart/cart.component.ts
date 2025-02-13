import { Component, inject, Signal, computed } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Get cart items from the service
  cartItems: Signal<any[]> = this.cartService.getCartItems();
  hasItems = computed(() => this.cartItems().length > 0);

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }
  proceedToCheckout() {
    this.router.navigate(['/shop/checkout']);
  }
}
