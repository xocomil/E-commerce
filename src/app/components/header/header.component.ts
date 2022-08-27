import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { Product } from 'src/Interfaces/main';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private productsService: ProductsService) {}
  APICategories$ = new BehaviorSubject<string[]>(['All Categories']);
  products$ = new Subject<Product[]>();

  //The idea is to have a Behavior Subject with "All Categories" and to have the api call to get the rest of the categories.
  //Add on top of that observable so we have a select that has all the values. The All categories, and the other values that we get thru the api call.

  buttonText = 'All Categories';

  onSelect(category: string) {
    this.buttonText = category;
  }

  ngOnInit(): void {
    this.productsService.getGenericProducts().subscribe((data) => {
      this.products$.next(data);
    });

    this.productsService.getCategories().subscribe((data) => {
      this.APICategories$.next(data);
    });
  }
}

//this.Category_Options.push(data);
