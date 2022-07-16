import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // get the initial products
  // get new products(pagination )

  getGenericProducts(): void {
    console.log('test');
  }

  constructor() {}
}
