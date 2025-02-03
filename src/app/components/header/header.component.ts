import { Component,computed, inject,Signal } from '@angular/core';
import { MockDataService } from '../../../services/data.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../primary-button/primary-button/primary-button.component";

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dataService = inject(MockDataService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartLabel: Signal<string> = computed(() => `Cart (${this.cartService.getCartItemCount()()})`);

  goToCart() {
    this.router.navigate(['/cart']);
  }

  rederict(){
    this.router.navigate(['/']);
  }

}
