import { Component, Signal, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../../../services/data.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button/primary-button.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../search.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimaryButtonComponent, ReactiveFormsModule, FormsModule, SearchPipe], // Add ReactiveFormsModule
})
export class ProductListComponent {
  private dataService = inject(MockDataService);
  private cartService = inject(CartService);

  itemCount: Signal<number> = this.cartService.getCartItemCount();
  router = inject(Router);

  // Products Signal
  products: Signal<any[]> = signal(this.dataService.getProducts());

  searchTerm: string = '';

  // // Search Control
  // searchControl = new FormControl('');

  // // Filtered Products Signal
  // filteredProducts = signal<any[]>(this.products());

  // constructor() {
  //   // React to search input changes
  //   this.searchControl.valueChanges
  //     .pipe(
  //       debounceTime(300), // Wait for 300ms after the user stops typing
  //       distinctUntilChanged(), // Only emit if the value has changed
  //       startWith('') // Start with an empty string
  //     )
  //     .subscribe((searchTerm) => {
  //       this.filterProducts(searchTerm || '');
  //     });
  // }

  // Filter products based on search term
  // filterProducts(searchTerm: string) {
  //   const filtered = this.products().filter((product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   this.filteredProducts.set(filtered);
  // }

  // Add to Cart
  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to Cart:', product);
  }
}