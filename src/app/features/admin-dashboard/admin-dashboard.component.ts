import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
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
    this.dataService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => console.error('Error fetching products:', error),
    });
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter((product) => product.id !== productId);
    // You can also call an API to delete the product from the backend
  }

  // Promote a user to admin
  promoteToAdmin(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);
    if (user) {
      user.role = 'admin';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers(); // Refresh the user list
    }
  }

  // Demote an admin to user
  demoteToUser(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const user = users.find((u) => u.email === email);
    if (user) {
      user.role = 'user';
      localStorage.setItem('users', JSON.stringify(users));
      this.loadUsers(); // Refresh the user list
    }
  }

  // Delete a user
  deleteUser(email: string) {
    const users = this.authService.getUsersFromLocalStorage();
    const updatedUsers = users.filter((u) => u.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    this.loadUsers(); // Refresh the user list
  }
}