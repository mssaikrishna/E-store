import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  imports: [CommonModule],
})
export class LoaderComponent {
  loaderService = inject(LoaderService);

  constructor() {
    setInterval(() => {
      console.log('Loader Visibility:', this.loaderService.isLoading());
    }, 1000); // Logs every second
  }
} 