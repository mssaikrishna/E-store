import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/data.service';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from '../../shared/components/add-product/add-product.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,AddProductComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  users: { email: string; role: string }[] = [];
  products: any[] = [];

  constructor(
    private authService: AuthService,
    private dataService: MockDataService
  ) {
    this.loadUsers();
    this.loadProducts();
  }

  // Load users from localStorage
  loadUsers() {
    const usersJson = localStorage.getItem('users');
    if (usersJson) {
      this.users = JSON.parse(usersJson).map((user: any) => ({
        email: user.email,
        role: user.role,
      }));
    }
  }

  loadProducts() {
    // Load products from local storage
    const localProductsJson = localStorage.getItem('products');
    const localProducts = localProductsJson ? JSON.parse(localProductsJson) : [];
  
    // Fetch products from API
    this.dataService.getProducts().subscribe({
      next: (apiProducts) => {


        const formattedApiProducts = apiProducts.map((product: any) => ({
          ...product,
          category: product.category.name, // Extracting only the category name
        }));
        // Merge API and Local Storage data
        this.products = this.mergeProductLists(localProducts, formattedApiProducts);
  
        // Optionally, update local storage with latest API data
        localStorage.setItem('products', JSON.stringify(this.products));
      },
      error: (error) => console.error('Error fetching products from API:', error),
    });
  
    // Initially set the products from local storage
    this.products = localProducts;
  }
  

  mergeProductLists(localProducts: any[], apiProducts: any[]): any[] {
    const productMap = new Map();
  
    // Add local storage products
    localProducts.forEach((product) => productMap.set(product.id, product));
  
    // Add API products (avoiding duplicates)
    apiProducts.forEach((product) => productMap.set(product.id, product));
  
    // Convert map values back to array
    return Array.from(productMap.values());
  }
  

  onProductAdded() {
    this.loadProducts(); // Refresh the product list
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // Promote a user to admin
  promoteToAdmin(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);
    if (user) {
      user.role = 'admin';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers(); 
    }
  }

  // Demote an admin to user
  demoteToUser(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);
    if (user) {
      user.role = 'user';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers(); 
    }
  }

  // Delete a user
  deleteUser(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const updatedUsers = users.filter((u) => u.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    this.loadUsers();
  }
}