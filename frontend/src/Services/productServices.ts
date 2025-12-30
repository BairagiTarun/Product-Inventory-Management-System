import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Product {
  _id?: string;
  productCode: string;
  productName: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addProduct(product: Product): Observable<{ message: string; product: Product }> {
    return this.http
      .post<{ message: string; product: Product }>(this.apiUrl, product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(
    id: string,
    product: Partial<Product>
  ): Observable<{ message: string; product: Product }> {
    return this.http
      .put<{ message: string; product: Product }>(`${this.apiUrl}/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message =
      error.error?.message ||
      error.statusText ||
      'Server error occurred';

    return throwError(() => new Error(message));
  }
}