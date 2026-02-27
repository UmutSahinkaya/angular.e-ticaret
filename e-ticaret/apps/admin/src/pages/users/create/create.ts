import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbModel } from '../../layouts/breadcrumb';
import { initialUser, UserModel } from '@shared';
import Blank from '../../../components/blank';

@Component({
  imports: [Blank, FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateUser {
  readonly id = signal<string | undefined>(undefined);
  readonly breadcrumbs = signal<BreadCrumbModel[]>([
    { title: 'Kullanıcılar', url: '/users', icon: 'group' },
  ]);
  
  readonly result = resource({
    params: () => this.id(),
    loader: async () => {
      const res = await lastValueFrom(
        this.#http.get<UserModel>(`api/users/${this.id()}`),
      );
      this.breadcrumbs.update((prev) => [
        ...prev,
        { title: res.fullName, url: `/users/edit/${this.id()}`, icon: 'edit' },
      ]);
      return res;
    },
  });
  readonly data = linkedSignal(() => this.result.value() ?? { ...initialUser });
  readonly title = computed(() =>
    this.id() ? 'Kullanıcı Güncelle' : 'Kullanıcı Oluştur',
  );
  readonly btnName = computed(() => (this.id() ? 'Güncelle' : 'Oluştur'));

  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);
  readonly #activated = inject(ActivatedRoute);

  constructor() {
    this.#activated.params.subscribe(res => {
      if(res['id']){
        this.id.set(res['id']);
      }else{
        this.breadcrumbs.update(prev => [...prev,
          {title: 'Ekle', url: '/users/create', icon: 'add'},])
      }
    });
  }

  save(form: NgForm) {
    if (!form.valid) return;
    if (!this.id()) {
      this.#http.post('api/users', this.data()).subscribe(() => {
        this.#toast.showToast('Başarılı', 'Kullanıcı başarıyla oluşturuldu.');
        this.#router.navigateByUrl('/users');
      });
    } else {
      this.#http.put(`api/users/${this.id()}`, this.data()).subscribe(() => {
        this.#toast.showToast('Başarılı', 'Kullanıcı başarıyla güncellendi.');
        this.#router.navigateByUrl('/users');
      });
    }
  }
}
