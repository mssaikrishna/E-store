import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button/primary-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [PrimaryButtonComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: any; // Accepts product details
  @Output() addToCart = new EventEmitter<any>(); // Emits event when button clicked
  @Output() viewDetails = new EventEmitter<number>(); // Emits event when "View Details" clicked

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  onViewDetails() {
    this.viewDetails.emit(this.product.id);
  }
}
