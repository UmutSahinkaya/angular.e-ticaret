import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
import { BreadCrumbModel } from '../../layouts/breadcrumb';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Create {
  readonly id = signal<string | undefined>(undefined);
  readonly breadcrumbs = signal<BreadCrumbModel[]>([
    { title: 'Kategoriler', url: '/categories', icon: 'category' },
  ]);
  readonly title = computed(() =>
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
        this.#http.get<CategoryModel>(`api/categories/${this.id()}`),
      );
      this.breadcrumbs.update((prev) => [
        ...prev,
        { title: res.name, url: `/categories/edit/${this.id()}`, icon: 'edit' },
      ]);
      return res;
    },
  });
  readonly data = computed(() => this.result.value() ?? { ...initialCategory });

  constructor() {
    this.#activated.params.subscribe((res) => {
      if (res['id']) {
        this.id.set(res['id']);
      } else {
        this.breadcrumbs.update((prev) => [
          ...prev,
          { title: 'Ekle', url: '/categories/create', icon: 'add' },
        ]);
      }
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;
    if (!this.id()) {
      this.#http.post('api/categories', this.data()).subscribe(() => {
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
