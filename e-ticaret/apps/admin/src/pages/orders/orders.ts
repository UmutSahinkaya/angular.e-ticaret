import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, httpResource } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { OrderModel } from '@shared/models/order.model';
import { FlexiGridModule } from 'flexi-grid';

@Component({
  imports: [Blank, FlexiGridModule, RouterLink, DatePipe],
  templateUrl: './orders.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Orders {
  readonly #allowedTransitions: Record<string, string[]> = {
    'Hazırlanıyor': ['Kargoda', 'İptal Edildi'],
    Kargoda: ['Teslim Edildi', 'İptal Edildi'],
    'Teslim Edildi': [],
    'İptal Edildi': [],
  };

  readonly result = httpResource<OrderModel[]>(() => 'api/orders');
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);

  getOrderTotal(order: OrderModel): number {
    return order.baskets.reduce(
      (sum, item) => sum + item.productPrice * item.quantity * 1.18,
      0,
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Hazırlanıyor':
        return 'warning';
      case 'Kargoda':
        return 'info';
      case 'Teslim Edildi':
        return 'success';
      case 'İptal Edildi':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  updateStatus(order: OrderModel, status: string): void {
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
