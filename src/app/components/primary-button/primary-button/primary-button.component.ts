import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css'],
  imports: [CommonModule],
})
export class PrimaryButtonComponent {
  @Input() label: string = '';  // Button label
  @Input() itemCount: number = 0;  // Cart item count
  @Output() btnClicked = new EventEmitter<void>();

  // Emit the button click event
  onClick() {
    this.btnClicked.emit();
  }
}
