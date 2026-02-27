import { HttpClient, httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { FlexiToastService } from 'flexi-toast';
import { RouterLink } from '@angular/router';
import { CategoryModel } from '@shared';

@Component({
  imports: [Blank, FlexiGridModule, RouterLink],
  templateUrl: './categories.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Categories {
  readonly result = httpResource<CategoryModel[]>(
    () => 'api/categories',
  );

  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);

  delete(id: string) {
    this.#toast.showSwal(
      'Kategori Sil ?',
      'Kategori silmek istediğinize emin misiniz ?',
      'Sil',
      () => {
        this.#http.delete(`api/categories/${id}`).subscribe({
          next: () => {
            this.result.reload();
            this.#toast.showToast('Kategori silindi', 'success');
          },
          error: () => {
            this.#toast.showToast(
              'Kategori silinirken bir hata oluştu',
              'error',
            );
          },
        });
      },
    );
  }
}
