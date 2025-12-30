import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductServices } from '../productServices';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class Product implements OnInit {
  productList: any[] = [];
  productId: string | null = null;
  buttonText = 'Add Product';
  responseMessage = '';
  isError = false;
  isLoading = false;
  product: any = {
    productCode: '',
    productName: '',
    category: '',
    price: null
  };
  constructor(private productService: ProductServices) {}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: res => this.productList = res,
      error: err => this.showMessage(err.error?.message || 'Failed to load products', true),
      complete: () => this.isLoading = false
    });
  }
  submit(): void {
    if (!this.isFormValid()) return;
    this.productId ? this.updateProduct() : this.addProduct();
  }
  addProduct(): void {
  this.productService.addProduct(this.product).subscribe({
    next: (res: any) => {
      this.productList.push(res.product);
      this.showMessage(res.message || 'Product added successfully', false);
    },
    error: err => this.showMessage(err.error?.message || 'Add failed', true)
  });
}
updateProduct(): void {
  if (!this.productId) return;
  this.productService.updateProduct(this.productId, this.product).subscribe({
    next: (res: any) => {
      this.showMessage(res.message || 'Product updated successfully', false);
      this.loadProducts();
    },
    error: err => this.showMessage(err.error?.message || 'Update failed', true)
  });
}
 edit(product: any): void {
  this.product.productName=product.productName;
  this.product.price=product.price;
  this.buttonText = 'Update Product';
  this.productId = product._id;
}
  delete(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (res: any) => {
        this.showMessage(res.message || 'Product deleted successfully', false);
        this.loadProducts();
      },
      error: err => this.showMessage(err.error?.message || 'Delete failed', true)
    });
  }

  isFormValid(): boolean {
    if (!this.product.productCode ||
        !this.product.productName ||
        !this.product.category ||
        this.product.price === null) {
      this.showMessage('All fields are mandatory', true);
      return false;
    }

    if (isNaN(this.product.price) || this.product.price <= 0) {
      this.showMessage('Price must be a valid number', true);
      return false;
    }

    return true;
  }

  reset(): void {
    this.productId = null;
    this.buttonText = 'Add Product';
    this.product = {
      productCode: '',
      productName: '',
      category: '',
      price: null
    };
  }

 showMessage(message: string, isError: boolean): void {
  this.responseMessage = message;
  this.isError = isError;
  setTimeout(() => {
    this.responseMessage = '';
    this.isError = false;
    this.reset();
  }, 1000);
}

}
