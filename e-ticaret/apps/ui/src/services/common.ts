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
    const response: string | null = localStorage.getItem('response');
    if (response) {
      this.user.set(JSON.parse(response));
      this.getBasketCount();
    }
  }
  getBasketCount() {
    if (this.user()) {
      const endpoint = `api/baskets?userId=${this.user()!.id}`;
      this.#http
        .get<BasketModel[]>(endpoint)
        .subscribe((res) => this.basketCount.set(res.length));
      return;
    }
    this.basketCount.set(0);
  }
}
