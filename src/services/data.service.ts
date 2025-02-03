import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private products = [
    { id: 1, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
    { id: 2, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
    { id: 3, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' },
    { id: 4, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
    { id: 5, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
    { id: 6, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' },
    { id: 7, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
    { id: 8, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
    { id: 9, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' }
  ];

  getProducts() {
    return this.products;
  }
}
