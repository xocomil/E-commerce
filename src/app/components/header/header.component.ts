import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';

import { Product } from 'src/Interfaces/main';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  //behavioral or subject

  products$ = new Subject<Product[]>();
  titles$ = new Subject<any>();

  ngOnInit(): void {
    this.products$.subscribe();
    this.productsService.getGenericProducts().subscribe((data) => {
      this.products$.next(data);
    });
  }
}
