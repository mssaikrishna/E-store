import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private products = [
    { id: 1, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
    { id: 2, name: 'Broccoli', price: 1.99, discount: 20, image: 'broccolli.jpg', category: 'Vegetables' },
    { id: 3, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' }
  ];

  getProducts() {
    return this.products;
  }
}
