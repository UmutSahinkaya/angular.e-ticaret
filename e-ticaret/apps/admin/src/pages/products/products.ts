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
import { CategoryModel, ProductModel } from '@shared';



@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Products {
  readonly result = httpResource<ProductModel[]>(
    () => 'api/products',
  );
  readonly data = computed<ProductModel[]>(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly categories=httpResource<CategoryModel[]>(()=> 'api/categories');
  readonly categoryFilter = computed<FlexiGridFilterDataModel[]>(() => {
    return (this.categories.value() ?? []).map(category => ({
      name: category.name,
      value: category.name
    }));  
  });

  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string) {
    this.#toast.showSwal(
      'Ürünü Sil ?',
      'Ürünü silmek istediğinize emin misiniz ?',
      'Evet',
      () => {
         this.#http
           .delete(`api/products/${id}`).subscribe(() => {
             this.result.reload();
           });
      },
    );
  }
}
