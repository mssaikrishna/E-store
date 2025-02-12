import { Injectable } from '@angular/core';
import { Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Create a signal to hold the cart items
  private cartItems = signal<any[]>([]); 

  // Method to get the cart items
  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount(): Signal<number> {
    return signal(this.cartItems().length); // Return a signal that holds the count
  }

  removeFromCart(product: any) {
    this.cartItems.update(items => items.filter(item => item.id !== product.id));
  }

  // Method to add an item to the cart
  addToCart(product: any) {
    this.cartItems.update((currentItems: any[]) => [...currentItems, product]);
  }

  clearCart() {
    this.cartItems.set([]); // Reset cart items to empty array
  }
}