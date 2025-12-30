import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  private apiUrl = 'http://localhost:3000/api/products';
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }
  addProduct(product: any) {
    return this.http.post(this.apiUrl, product);
  }
  updateProduct(id: string, product: any) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getProductById(id: string) {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

}
