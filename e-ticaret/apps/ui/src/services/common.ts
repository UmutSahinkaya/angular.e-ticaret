import { HttpClient } from '@angular/common/http';
import { BasketModel } from './../../../../library/shared/src/models/basket.model';
import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Common {
  readonly user = signal<UserModel | undefined>(undefined);
  readonly basketCount = signal<number>(0);

  readonly #http = inject(HttpClient);

  constructor() {
    this.getBasketCount();
    const response: string | null = localStorage.getItem('response');
    if (response) {
      this.user.set(JSON.parse(response));
    }
  }
  getBasketCount() {
    this.#http.get<BasketModel[]>("/api/baskets").subscribe(res=>this.basketCount.set(res.length));
  }
}
