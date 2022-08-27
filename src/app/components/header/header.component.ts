import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, finalize, forkJoin, map, merge, of, shareReplay, Subject, switchMap, tap} from 'rxjs';
import { Product } from 'src/Interfaces/main';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  #categoriesFromServer$ = this.productsService.getCategories();
  #defaultCategories$ = of(['All Categories']);

  APICategories$ = forkJoin([this.#defaultCategories$, this.#categoriesFromServer$])
    .pipe(
      tap(() => {
        console.log(`subscribed at ${new Date()}`);
      }),
      map(([defaultCategories, categoriesFromServer]) => defaultCategories.concat(categoriesFromServer)),
      finalize(() => {
        console.log(`Observable completed at ${new Date()}`)
      }),
      shareReplay()
  );

  // filters$ = new BehaviorSubject(1);
  // products$ = this.filters$.pipe(switchMap(filters => this.productsService.getGenericProducts(filters)));

    products$ = this.productsService.getGenericProducts();

  //The idea is to have a Behavior Subject with "All Categories" and to have the api call to get the rest of the categories.
  //Add on top of that observable so we have a select that has all the values. The All categories, and the other values that we get thru the api call.

  buttonText = 'All Categories';

  onSelect(category: string) {
    this.buttonText = category;
  }

  ngOnInit(): void {
  }
}

//this.Category_Options.push(data);
