import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { OrderModel } from '@shared/models/order.model';
import { TrCurrencyPipe } from 'tr-currency';
import { Common } from '../../../services/common';

@Component({
  imports: [DatePipe, RouterLink, TrCurrencyPipe],
  templateUrl: './details.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderDetails {
  readonly vatRate = 0.18;
  readonly orderId = signal<string>('');
  readonly result = httpResource<OrderModel[]>(() => {
    if (!this.orderId()) {
      return undefined;
    }

    return `api/orders?id=${this.orderId()}&userId=${this.#common.user()?.id}`;
  });
  readonly order = computed(() => this.result.value()?.[0]);
  readonly itemCount = computed(() => {
    const order = this.order();

    if (!order) {
      return 0;
    }

    return order.baskets.reduce((sum, basket) => sum + basket.quantity, 0);
  });
  readonly subtotal = computed(() => {
    const order = this.order();

    if (!order) {
      return 0;
    }

    return order.baskets.reduce(
      (sum, basket) => sum + basket.productPrice * basket.quantity,
      0,
    );
  });
  readonly vatAmount = computed(() => this.subtotal() * this.vatRate);
  readonly total = computed(() => {
    return this.subtotal() + this.vatAmount();
  });
  readonly maskedCardNumber = computed(() => {
    const cardNumber = this.order()?.cartNumber;

    if (!cardNumber) {
      return '-';
    }

    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  });

  readonly #route = inject(ActivatedRoute);
  readonly #common = inject(Common);

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.orderId.set(params.get('id') ?? '');
    });
  }
}
