import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/Interfaces/main';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // get the initial products
  // get new products(pagination )
  // get specific category products once the user clicks,

  constructor(private http: HttpClient) {}

  getGenericProducts(): Observable<Product[]> {
    // highlighted producs
    const res = this.http
      .get<Product[]>('https://fakestoreapi.com/products?limit=5')
      .pipe(tap((e) => console.log(e)));
    return res;
  }

  getCategories(): Observable<string[]> {
    // highlighted producs
    const res = this.http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(tap((e) => console.log(e)));
    return res;
  }

  getSpecificCategoryProducts(productCategory: string): Observable<Product[]> {
    //specific products , p
    const res = this.http
      .get<Product[]>(
        `https://fakestoreapi.com/products/category/${productCategory}`
      )
      .pipe(tap((e) => console.log(e)));
    return res;
  }
}
