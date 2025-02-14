import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../services/data.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(MockDataService);

  product: any;

  ngOnInit() {
    const productId = this.route.snapshot.params['id']; // Get product ID from the route
    this.dataService.getProductById(productId).subscribe({
      next: (data) => (this.product = data),
      error: (error) => console.error('Error fetching product details:', error),
    });
  }
}