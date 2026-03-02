import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import Blank from '../../components/blank';
import { ProductModel, UserModel } from '@shared';

interface HomeBasketModel {
  productId: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity: number;
}

interface HomeOrderModel {
  id?: string;
  userId: string;
  orderNumber: string;
  date: string | Date;
  fullName: string;
  status: string;
  baskets: HomeBasketModel[];
}

interface TopProductModel {
  productId: string;
  productName: string;
  categoryName: string;
  imageUrl: string;
  sales: number;
  revenue: number;
}

interface TopCustomerModel {
  userId: string;
  fullName: string;
  orders: number;
  totalSpent: number;
}

interface ActivityModel {
  icon: string;
  title: string;
  subtitle: string;
  time: string;
  colorClass: string;
}

interface StatModel {
  value: number;
  trend: number;
}

@Component({
  imports: [Blank, CurrencyPipe, DatePipe, DecimalPipe],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  readonly ordersResource = httpResource<HomeOrderModel[]>(() => 'api/orders');
  readonly usersResource = httpResource<UserModel[]>(() => 'api/users');
  readonly productsResource = httpResource<ProductModel[]>(() => 'api/products');

  readonly orders = computed<HomeOrderModel[]>(() => this.ordersResource.value() ?? []);
  readonly users = computed<UserModel[]>(() => this.usersResource.value() ?? []);
  readonly products = computed<ProductModel[]>(() => this.productsResource.value() ?? []);
  readonly usersById = computed(() => {
    return new Map(
      this.users()
        .filter((user) => !!user.id)
        .map((user) => [user.id as string, user]),
    );
  });
  readonly loading = computed(
    () =>
      this.ordersResource.isLoading() ||
      this.usersResource.isLoading() ||
      this.productsResource.isLoading(),
  );

  readonly recentOrders = computed(() => {
    return [...this.orders()]
      .sort((a, b) => this.toDate(b.date).getTime() - this.toDate(a.date).getTime())
      .slice(0, 5)
      .map((order) => ({
        ...order,
        customerName: this.getUserFullName(order.userId, order.fullName),
        totalAmount: this.getOrderTotal(order),
      }));
  });

  readonly topProducts = computed<TopProductModel[]>(() => {
    const products = this.products();
    const productMap = new Map<string, ProductModel>(
      products
        .filter((product) => !!product.id)
        .map((product) => [product.id as string, product]),
    );

    const totals = new Map<string, TopProductModel>();

    for (const order of this.orders()) {
      for (const basket of order.baskets ?? []) {
        const product = productMap.get(basket.productId);
        const existing = totals.get(basket.productId);

        if (existing) {
          existing.sales += Number(basket.quantity ?? 0);
          existing.revenue += Number(basket.productPrice ?? 0) * Number(basket.quantity ?? 0);
          continue;
        }

        totals.set(basket.productId, {
          productId: basket.productId,
          productName: basket.productName,
          categoryName: product?.categoryName ?? '-',
          imageUrl: product?.imageUrl ?? basket.productImageUrl,
          sales: Number(basket.quantity ?? 0),
          revenue: Number(basket.productPrice ?? 0) * Number(basket.quantity ?? 0),
        });
      }
    }

    return [...totals.values()].sort((a, b) => b.sales - a.sales).slice(0, 4);
  });

  readonly topCustomers = computed<TopCustomerModel[]>(() => {
    const customerTotals = new Map<string, TopCustomerModel>();

    for (const order of this.orders()) {
      const key = order.userId;
      const amount = this.getOrderTotal(order);
      const existing = customerTotals.get(key);

      if (existing) {
        existing.orders += 1;
        existing.totalSpent += amount;
        continue;
      }

      customerTotals.set(key, {
        userId: key,
        fullName: this.getUserFullName(order.userId, order.fullName),
        orders: 1,
        totalSpent: amount,
      });
    }

    return [...customerTotals.values()]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 4);
  });

  readonly recentActivities = computed<ActivityModel[]>(() => {
    return [...this.orders()]
      .sort((a, b) => this.toDate(b.date).getTime() - this.toDate(a.date).getTime())
      .slice(0, 5)
      .map((order) => ({
        icon: this.getStatusIcon(order.status),
        title: this.getActivityTitle(order.status),
        subtitle: `${this.getUserFullName(order.userId, order.fullName)} · ${order.orderNumber}`,
        time: this.getRelativeTime(order.date),
        colorClass: this.getStatusColorClass(order.status),
      }));
  });

  readonly totalRevenueStat = computed<StatModel>(() => {
    const { currentOrders, previousOrders } = this.getOrderPeriods();
    const current = currentOrders.reduce((sum, order) => sum + this.getOrderTotal(order), 0);
    const previous = previousOrders.reduce((sum, order) => sum + this.getOrderTotal(order), 0);

    return {
      value: current,
      trend: this.calculateTrend(current, previous),
    };
  });

  readonly totalOrdersStat = computed<StatModel>(() => {
    const { currentOrders, previousOrders } = this.getOrderPeriods();

    return {
      value: currentOrders.length,
      trend: this.calculateTrend(currentOrders.length, previousOrders.length),
    };
  });

  readonly customersStat = computed<StatModel>(() => {
    const users = this.users();
    const { currentOrders, previousOrders } = this.getOrderPeriods();
    const currentBuyerCount = new Set(currentOrders.map((order) => order.userId)).size;
    const previousBuyerCount = new Set(previousOrders.map((order) => order.userId)).size;

    return {
      value: users.length,
      trend: this.calculateTrend(currentBuyerCount, previousBuyerCount),
    };
  });

  readonly conversionStat = computed<StatModel>(() => {
    const usersCount = this.users().length;
    const { currentOrders, previousOrders } = this.getOrderPeriods();

    const currentBuyerCount = new Set(currentOrders.map((order) => order.userId)).size;
    const previousBuyerCount = new Set(previousOrders.map((order) => order.userId)).size;

    const currentRate = usersCount === 0 ? 0 : (currentBuyerCount / usersCount) * 100;
    const previousRate = usersCount === 0 ? 0 : (previousBuyerCount / usersCount) * 100;

    return {
      value: currentRate,
      trend: this.calculateTrend(currentRate, previousRate),
    };
  });

  getOrderBadgeClass(status: string): string {
    switch (status) {
      case 'Teslim Edildi':
        return 'bg-success';
      case 'Kargoda':
        return 'bg-primary';
      case 'Hazırlanıyor':
        return 'bg-warning text-dark';
      case 'İptal Edildi':
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  getTrendClass(trend: number): string {
    return trend >= 0 ? 'positive' : 'negative';
  }

  getTrendIcon(trend: number): string {
    return trend >= 0 ? 'trending_up' : 'trending_down';
  }

  getAvatarUrl(name: string): string {
    const color = this.getAvatarColor(name);
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${color}&color=fff`;
  }

  getCustomerStatus(orderCount: number): string {
    return orderCount >= 2 ? 'Active' : 'Pending';
  }

  private getOrderPeriods() {
    const orders = this.orders();
    if (orders.length === 0) {
      return { currentOrders: [], previousOrders: [] };
    }

    const latestOrderDate = orders
      .map((order) => this.toDate(order.date).getTime())
      .sort((a, b) => b - a)[0];

    const dayInMs = 24 * 60 * 60 * 1000;
    const currentPeriodStart = latestOrderDate - 30 * dayInMs;
    const previousPeriodStart = latestOrderDate - 60 * dayInMs;

    const currentOrders = orders.filter((order) => {
      const time = this.toDate(order.date).getTime();
      return time > currentPeriodStart && time <= latestOrderDate;
    });

    const previousOrders = orders.filter((order) => {
      const time = this.toDate(order.date).getTime();
      return time > previousPeriodStart && time <= currentPeriodStart;
    });

    return { currentOrders, previousOrders };
  }

  private getOrderTotal(order: HomeOrderModel): number {
    return (order.baskets ?? []).reduce(
      (sum, basket) =>
        sum + Number(basket.productPrice ?? 0) * Number(basket.quantity ?? 0),
      0,
    );
  }

  private getUserFullName(userId: string, fallbackName: string): string {
    return this.usersById().get(userId)?.fullName ?? fallbackName;
  }

  private calculateTrend(current: number, previous: number): number {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    return ((current - previous) / previous) * 100;
  }

  private toDate(value: string | Date): Date {
    return value instanceof Date ? value : new Date(value);
  }

  private getRelativeTime(value: string | Date): string {
    const date = this.toDate(value);
    const diffMs = Date.now() - date.getTime();
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diffMs < hour) {
      const minutes = Math.max(1, Math.floor(diffMs / minute));
      return `${minutes} dakika önce`;
    }

    if (diffMs < day) {
      const hours = Math.floor(diffMs / hour);
      return `${hours} saat önce`;
    }

    const days = Math.floor(diffMs / day);
    return `${days} gün önce`;
  }

  private getActivityTitle(status: string): string {
    switch (status) {
      case 'Hazırlanıyor':
        return 'Yeni sipariş alındı';
      case 'Kargoda':
        return 'Sipariş kargoya verildi';
      case 'Teslim Edildi':
        return 'Sipariş teslim edildi';
      case 'İptal Edildi':
        return 'Sipariş iptal edildi';
      default:
        return 'Sipariş durumu güncellendi';
    }
  }

  private getStatusIcon(status: string): string {
    switch (status) {
      case 'Hazırlanıyor':
        return 'shopping_cart';
      case 'Kargoda':
        return 'local_shipping';
      case 'Teslim Edildi':
        return 'check_circle';
      case 'İptal Edildi':
        return 'cancel';
      default:
        return 'notifications';
    }
  }

  private getStatusColorClass(status: string): string {
    switch (status) {
      case 'Hazırlanıyor':
        return 'bg-warning';
      case 'Kargoda':
        return 'bg-primary';
      case 'Teslim Edildi':
        return 'bg-success';
      case 'İptal Edildi':
        return 'bg-danger';
      default:
        return 'bg-info';
    }
  }

  private getAvatarColor(name: string): string {
    const palette = ['4361ee', '10b981', 'f59e0b', 'ef4444', '06b6d4'];
    let hash = 0;
    for (const char of name) {
      hash += char.charCodeAt(0);
    }

    return palette[Math.abs(hash) % palette.length];
  }
}
