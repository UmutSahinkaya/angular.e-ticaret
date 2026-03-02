import { BasketModel } from './../../../../../library/shared/src/models/basket.model';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { ProductModel } from '@shared/models/product.model';
import { CategoryModel } from '@shared/models/category.model';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../services/common';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [TrCurrencyPipe, InfiniteScrollDirective],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  readonly placeholderCount = signal<number[]>([1, 2, 3]);
  readonly categoryUrl = signal<string | undefined>(undefined);
  readonly categoryUrlPrev = this.computedPrevious(this.categoryUrl);
  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);
  readonly categoriesResult = httpResource<CategoryModel[]>(() => 'api/categories');
  readonly categories = computed(() => this.categoriesResult.value() ?? []);
  readonly result = httpResource<ProductModel[]>(() => {
    let endpoint = 'api/products?';
    if (this.categoryUrl()) {
      endpoint += `categoryUrl=${this.categoryUrl()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;

    return endpoint;
  });

  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());
  readonly dataSignal = signal<ProductModel[]>([]);
  readonly sectionTitle = computed(() => {
    const selectedCategoryUrl = this.categoryUrl();

    if (!selectedCategoryUrl) {
      return 'Ürünler';
    }

    const selectedCategory = this.categories().find(
      (category) => category.url === selectedCategoryUrl,
    );

    if (!selectedCategory) {
      return 'Ürünler';
    }

    return this.toPluralCategoryTitle(selectedCategory.name);
  });

  readonly user = computed(() => this.#common.user());
  
  readonly #activated = inject(ActivatedRoute);
  readonly #common = inject(Common);
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);

  constructor() {
    this.#activated.params.subscribe((res) => {
      if (res['categoryUrl']) {
        this.categoryUrl.set(res['categoryUrl']);
      } else {
        this.categoryUrl.set(undefined);
      }
    });

    effect(() => {
      if (this.categoryUrlPrev() !== this.categoryUrl()) {
        this.dataSignal.set([...this.data()]);
        this.limit.set(6);
        this.start.set(0);
      } else {
        this.dataSignal.update((prev) => [...prev, ...this.data()]);
      }
    });
  }
  
  onScroll() {
    if (this.start() >= 0) return; //gelen ürün saysının counutu alıp vermemiz gerekiyordu ama json-server da öyle bir
    //  endpoint olmadığı için şimdilik manuel yazdık
    this.limit.update((prev) => prev + 6);
    this.start.update((prev) => prev + 6);
  }

  computedPrevious<T>(s: Signal<T>): Signal<T> {
    let current = null as T;
    let previous = untracked(() => s());

    return computed(() => {
      current = s();
      const result = previous;
      previous = current;
      return result;
    });
  }
  addBasket(data: ProductModel) {
    const basket: BasketModel = {
      productId: data.id!,
      userId: this.#common.user()!.id!,
      productName: data.name,
      productPrice: data.price,
      productImageUrl: data.imageUrl,
      quantity: 1,
    };
    this.#http.post("api/baskets", basket).subscribe(res=>{
      this.#toast.showToast("Başarılı","Ürün sepete eklendi", "success");
      this.#common.basketCount.update(prev=>prev+1);
    });
  }

  private toPluralCategoryTitle(categoryName: string): string {
    const pluralMap: Record<string, string> = {
      Telefon: 'Telefonlar',
      Bilgisayar: 'Bilgisayarlar',
      'Akıllı Saat': 'Akıllı Saatler',
      'Temizlik Aletleri': 'Temizlik Aletleri',
      Oyun: 'Oyunlar',
    };

    return pluralMap[categoryName] ?? categoryName;
  }

}
