import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { BasketModel } from '@shared/models/basket.model';
import { TrCurrencyPipe } from 'tr-currency';
import { Common } from '../../services/common';

@Component({
  imports: [TrCurrencyPipe],
  templateUrl: './baskets.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Baskets {
  readonly result = httpResource<BasketModel[]>(() => {
    const endpoint = `api/baskets?userId=${this.#common.user()!.id}`;
    return endpoint;
  });

  readonly data = computed(() => this.result.value() ?? []);
  readonly totalPrice=computed(()=>{
    let val=0;
    this.data().forEach(res=>{
      val+=res.productPrice * res.quantity;
    })
    return val;
  })
  readonly kdv=computed(()=>this.totalPrice() * 0.18);
  readonly #common = inject(Common);
}
