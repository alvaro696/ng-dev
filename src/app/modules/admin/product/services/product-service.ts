import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse } from '../../types/pagination.interface';
import { Product } from '../types/product.interface';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.apiUrl;
  private _refresh = new Subject<void>();

  private http = inject(HttpClient);

  get refresh() {
    return this._refresh;
  }

  public paginatedProducts(page: number, take: number, isActive: boolean = true, search: string = '') {
    // return this.http.get(`${this.apiUrl}/product?page=${page}&take=${take}&search=${search}&isActive=${isActive}`);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('take', take.toString());

    if (search) {
      params = params.set('search', search);
    }

    if (isActive) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<PaginatedResponse<Product>>(`${this.apiUrl}/product`, { params });
  }

  public getCategoryProducts() {
    return this.http.get(`${this.apiUrl}/category-product/basic`);
  }

  public createProduct(formData: FormData) {
    return this.http.post(`${this.apiUrl}/product`, formData).pipe(
      tap(() => this._refresh.next())
    );
  }

  public updateProduct(productId: number, formData: FormData) {
    return this.http.put(`${this.apiUrl}/product/${productId}`, formData).pipe(
      tap(() => this._refresh.next())
    );
  }

  public deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/product/${productId}`).pipe(
      tap(() => this._refresh.next())
    );
  }
}
