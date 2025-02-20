import { Component,computed, inject,Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { PrimaryButtonComponent } from "../primary-button/primary-button/primary-button.component";
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TextColorDirective } from '../../directive/styleDirective/text-color.directive';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent,CommonModule,TextColorDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private router = inject(Router);
  public authService = inject(AuthService);

  cartLabel: Signal<string> = computed(() => `Cart (${this.cartService.getCartItemCount()()})`);

  goToCart() {
    this.router.navigate(['/shop/cart']);
  }

  rederict(){
    this.router.navigate(['/shop']);
  }

  isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect user after logout
  }

}
