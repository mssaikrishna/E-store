import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  imports:[CommonModule],
})
export class AlertComponent {
  @Input() message = 'Alert!';
  @Input() type: 'success' | 'danger' | 'warning' = 'success';
  @Input() dismissible = true;

  closeAlert() {
    this.message = '';
  }
}
