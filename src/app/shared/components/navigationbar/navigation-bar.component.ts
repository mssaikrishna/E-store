import { Component,computed, inject,Signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from '../primary-button/primary-button/primary-button.component';
import { TextColorDirective } from '../../directive/styleDirective/text-color.directive';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule,PrimaryButtonComponent,TextColorDirective],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {

  private cartService = inject(CartService);
  private router = inject(Router);
  public authService = inject(AuthService);

  cartLabel: Signal<string> = computed(() => `Cart (${this.cartService.getCartItemCount()()})`);

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  goToCart() {
    this.router.navigate(['/shop/cart']);
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  // Logout the user
  logout() {
    this.authService.logout();
  }
}