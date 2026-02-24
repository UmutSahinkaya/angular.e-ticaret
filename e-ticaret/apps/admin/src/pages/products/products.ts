import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridFilterDataModel, FlexiGridModule } from 'flexi-grid';
import { HttpClient, httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';

export interface ProductModel {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  stock: number;
  categoryId: string;
  categoryName: string;
}

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(
    () => 'http://localhost:3000/products',
  );
  readonly data = computed<ProductModel[]>(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([
    { name: 'Telefon', value: 'Telefon' },
  ]);

  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string) {
    this.#toast.showSwal(
      'Ürünü Sil ?',
      'Ürünü silmek istediğinize emin misiniz ?',
      'Evet',
      () => {
        this.#http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
          this.#toast.showToast('Başarılı', 'Ürün başarıyla silindi.', 'success');
          this.result.reload();
        });
      },
    );
  }
}
