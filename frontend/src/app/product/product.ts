import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService, Product } from '../../Services/productServices';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent implements OnInit {

  productList: Product[] = [];
  productId: string | null = null;
  buttonText = 'Add Product';

  responseMessage = '';
  isError = false;
  isLoading = false;

  product: Product = this.initProduct();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  initProduct(): Product {
    return { productCode: '', productName: '', category: '', price: 0 };
  }

  loadProducts(): void {
    const cached = localStorage.getItem('products_cache');
    if (cached) this.productList = JSON.parse(cached);

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productList = res;
        this.syncCache();
      },
      error: (err) => this.showBackendMessage(err, true)
    });
  }

  submit(form: NgForm): void {
    if (form.invalid || this.isLoading) return;
    const duplicate = this.productList.some(p =>
      p.productCode === this.product.productCode && p._id !== this.productId
    );

    if (duplicate) {
      this.showMessage('Product Code already exists!', true);
      return;
    }

    this.isLoading = true;

    const payload = { ...this.product };
    const id = this.productId;

    if (id) {
      this.updateData(id, payload, form);
    } else {
      this.addData(payload, form);
    }
  }

  private addData(newProd: Product, form: NgForm): void {
    this.productService.addProduct(newProd).subscribe({
      next: (res) => {
        this.productList = [...this.productList, res.product];
        this.syncCache();
        this.showMessage(res.message, false);
        this.reset(form);
      },
      error: (err) => this.showBackendMessage(err, true),
      complete: () => this.isLoading = false
    });
  }

  private updateData(id: string, data: Product, form: NgForm): void {
    this.productService.updateProduct(id, data).subscribe({
      next: (res) => {
        this.productList = this.productList.map(p =>
          p._id === id ? res.product : p
        );
        this.syncCache();
        this.showMessage(res.message, false);
        this.reset(form);
      },
      error: (err) => this.showBackendMessage(err, true),
      complete: () => this.isLoading = false
    });
  }

  delete(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        this.productList = this.productList.filter(p => p._id !== id);
        this.syncCache();
        this.showMessage(res.message, false);
      },
      error: (err) => this.showBackendMessage(err, true)
    });
  }

  edit(product: Product): void {
    this.productId = product._id!;
    this.product = { ...product };
    this.buttonText = 'Update Product';
  }

  reset(form?: NgForm): void {
    this.productId = null;
    this.buttonText = 'Add Product';
    this.product = this.initProduct();
    form?.resetForm(this.product);
  }

  syncCache(): void {
    localStorage.setItem('products_cache', JSON.stringify(this.productList));
  }

  private showBackendMessage(error: any, isErr: boolean): void {
    const msg = error.error?.message || error.message || 'Something went wrong';
    this.showMessage(msg, isErr);
    this.isLoading = false;
  }

  showMessage(msg: string, isErr: boolean): void {
    this.responseMessage = msg;
    this.isError = isErr;
    setTimeout(() => this.responseMessage = '', 2000);
  }
}