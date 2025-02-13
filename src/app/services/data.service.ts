import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) {}

  // private products = [
  //   { id: 1, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
  //   { id: 2, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
  //   { id: 3, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' },
  //   { id: 4, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
  //   { id: 5, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
  //   { id: 6, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' },
  //   { id: 7, name: 'Fresh Carrots', price: 2.99, discount: 25, image: 'carrot.jpg', category: 'Vegetables' },
  //   { id: 8, name: 'Broccoli', price: 1.99, discount: 20, image: 'brocolli.jpg', category: 'Vegetables' },
  //   { id: 9, name: 'Organic Apples', price: 4.99, discount: 15, image: 'apple.jpg', category: 'Fruits' }
  // ];

  // getProducts() {
  //   return this.products;
  //   // return this.http.get('https://jsonplaceholder.typicode.com/posts');
  // }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
