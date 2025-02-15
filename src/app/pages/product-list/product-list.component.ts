import {
  Component,
  Signal,
  inject,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button/primary-button.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { FilterPipe } from '../../pipes/filter.pipe';
import { toSignal } from '@angular/core/rxjs-interop'; // Convert observable to signal
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    SearchPipe,
    FilterPipe
  ], // Add ReactiveFormsModule
})
export class ProductListComponent {
  private dataService = inject(MockDataService);
  private cartService = inject(CartService);

  itemCount: Signal<number> = this.cartService.getCartItemCount();
  router = inject(Router);

  searchTerm: string = '';
  filterTerm: string = '';

  products = toSignal(
    this.dataService.getProducts().pipe(
      catchError(() => of([])) // Handle errors by returning an empty array
    ),
    { initialValue: [] }
  );

  // Add to Cart
  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to Cart:', product);
  }

  // Add categories signal
  categories = computed(() => {
    const uniqueCategories = new Set(this.products().map(product => 
      JSON.stringify(product.category)
    ));
    return Array.from(uniqueCategories).map(cat => JSON.parse(cat));
  });

  viewDetails(productId: number) {
    this.router.navigate(['/shop/product-details', productId]);
  }
}
