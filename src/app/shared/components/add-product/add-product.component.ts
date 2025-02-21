import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { productFormConfig } from '../../../product-form-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<string>();
  form: FormGroup;
  formConfig = productFormConfig;

  constructor(private fb: FormBuilder) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    const group = this.fb.group({});
    this.formConfig.forEach((field) => {
      const validators = [];
      if (field.validation?.required) validators.push(Validators.required);
      if (field.validation?.minLength)
        validators.push(Validators.minLength(field.validation.minLength));
      if (field.validation?.maxLength)
        validators.push(Validators.maxLength(field.validation.maxLength));
      if (field.validation?.min)
        validators.push(Validators.min(field.validation.min));
      group.addControl(field.name, this.fb.control('', validators));
    });
    return group;
  }

  onSubmit() {
    if (this.form.valid) {
      const newProduct = this.form.value;
      newProduct.id = Date.now(); // Generate a unique ID for the product
      this.saveProductToLocalStorage(newProduct);
      this.productAdded.emit('Product added successfully!');
      this.form.reset(); 
    }
  }

  saveProductToLocalStorage(product: any) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }
}
