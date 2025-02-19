import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextColor]',
  standalone: true, 
})
export class TextColorDirective implements OnInit {
  @Input() appTextColor = 'blue'; // Default color

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.color = this.appTextColor;
  }
}