import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FlexiToastService } from 'flexi-toast';

import { lastValueFrom } from 'rxjs';
import { CategoryModel, initialCategory } from '../categories';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from '../../../components/blank';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Create {
  readonly id = signal<string | undefined>(undefined);
  readonly cardTitle = computed(() =>
    this.id() ? 'Kategori Güncelle' : 'Kategori Oluştur',
  );
  readonly btnName = computed(() => (this.id() ? 'Güncelle' : 'Oluştur'));

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #activated = inject(ActivatedRoute);
  readonly #router = inject(Router);

  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<CategoryModel>(
          `api/categories/${this.id()}`,
        ),
      );

      return res;
    },
  });
  readonly data = computed(() => this.result.value() ?? { ...initialCategory });

  constructor() {
    this.#activated.params.subscribe((res) => {
      if (res['id']) this.id.set(res['id']);
    });
  }
  save(form: NgForm) {
    if (!form.valid) return;
    if (!this.id()) {
      this.#http
        .post('api/categories', this.data())
        .subscribe(() => {
          this.#toast.showToast(
            'Başarılı',
            'Kategori kaydı başarıyla tamamlandı',
          );
          this.#router.navigateByUrl('/categories');
        });
    } else {
      this.#http
        .put(`api/categories/${this.id()}`, this.data())
        .subscribe(() => {
          this.#toast.showToast(
            'Başarılı',
            'Kategori kaydı başarıyla güncellendi',
          );
          this.#router.navigateByUrl('/categories');
        });
    }
  }
}
