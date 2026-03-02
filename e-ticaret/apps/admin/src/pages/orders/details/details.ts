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
import { HttpClient, httpResource } from '@angular/common/http';
import { OrderModel } from '@shared/models/order.model';
import { FlexiToastService } from 'flexi-toast';
import Blank from '../../../components/blank';

@Component({
  imports: [Blank, DatePipe, RouterLink],
  templateUrl: './details.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderDetails {
  readonly #allowedTransitions: Record<string, string[]> = {
    'Hazırlanıyor': ['Kargoda', 'İptal Edildi'],
    Kargoda: ['Teslim Edildi', 'İptal Edildi'],
    'Teslim Edildi': [],
    'İptal Edildi': [],
  };

  readonly orderId = signal<string>('');
  readonly result = httpResource<OrderModel>(() => {
    if (!this.orderId()) {
      return undefined;
    }

    return `api/orders/${this.orderId()}`;
  });

  readonly order = computed(() => this.result.value());
  readonly total = computed(() => {
    const order = this.order();
    if (!order) {
      return 0;
    }

    return order.baskets.reduce(
      (sum, item) => sum + item.productPrice * item.quantity * 1.18,
      0,
    );
  });

  readonly #route = inject(ActivatedRoute);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);

  constructor() {
    this.#route.paramMap.subscribe((params) => {
      this.orderId.set(params.get('id') ?? '');
    });
  }

  updateStatus(status: string): void {
    const order = this.order();

    if (!order || !order.id) {
      return;
    }

    if (!this.isTransitionAllowed(order.status, status)) {
      this.#toast.showToast('Bu sipariş için bu durum geçişine izin verilmiyor', 'warning');
      return;
    }

    this.#http.put(`api/orders/${order.id}`, { ...order, status }).subscribe({
      next: () => {
        this.#toast.showToast(`Sipariş durumu "${status}" olarak güncellendi`, 'success');
        this.result.reload();
      },
      error: () => {
        this.#toast.showToast('Sipariş durumu güncellenirken hata oluştu', 'error');
      },
    });
  }

  canApprove(status: string): boolean {
    return this.isTransitionAllowed(status, 'Hazırlanıyor');
  }

  canShip(status: string): boolean {
    return this.isTransitionAllowed(status, 'Kargoda');
  }

  canDeliver(status: string): boolean {
    return this.isTransitionAllowed(status, 'Teslim Edildi');
  }

  canCancel(status: string): boolean {
    return this.isTransitionAllowed(status, 'İptal Edildi');
  }

  private isTransitionAllowed(currentStatus: string, nextStatus: string): boolean {
    const allowedTargets = this.#allowedTransitions[currentStatus] ?? [];
    return allowedTargets.includes(nextStatus);
  }
}
