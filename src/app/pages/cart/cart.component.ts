import { Component, inject, Signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartService = inject(CartService);

  // Get cart items from the service
  cartItems: Signal<any[]> = this.cartService.getCartItems();
}
