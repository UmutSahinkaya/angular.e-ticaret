import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { Common } from '../../services/common';
import { httpResource } from '@angular/common/http';
import { OrderModel } from '@shared/models/order.model';
import { DatePipe } from '@angular/common';
import { TrCurrencyPipe } from 'tr-currency';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  imports: [
    DatePipe,
    TrCurrencyPipe,
    RouterLinkWithHref,
  ],
  templateUrl: './orders.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Orders {
  readonly limit = signal<number>(4);
  readonly allOrdersResult = httpResource<OrderModel[]>(() => {
    const endpoint = `api/orders?userId=${this.#common.user()?.id}`;
    return endpoint;
  });
  readonly result = httpResource<OrderModel[]>(() => {
    const endpoint = `api/orders?userId=${this.#common.user()?.id}&_limit=${this.limit()}`;
    return endpoint;
  });
  readonly allData = computed(() => this.allOrdersResult.value() ?? []);
  readonly totalCount = computed(() => this.allData().length);
  readonly waitingCount = computed(
    () => this.allData().filter((order) => order.status === 'Hazırlanıyor').length,
  );
  readonly completedCount = computed(
    () => this.allData().filter((order) => order.status === 'Teslim Edildi').length,
  );
  readonly data = computed(() => this.result.value() ?? []);
  readonly total = computed(() => {
    let total = 0;
    this.data().forEach(val => {
      val.baskets.forEach(d => total += (d.productPrice * d.quantity) * 1.18)
    })

    return total;
  });


  readonly #common = inject(Common);

  showMore(){
    this.limit.update(prev => prev + 4);
  }
}