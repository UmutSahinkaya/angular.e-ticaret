import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import Blank from '../../components/blank';
import { FlexiGridModule } from 'flexi-grid';
import { RouterLink } from '@angular/router';
import { HttpClient, httpResource } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { FormsModule } from "@angular/forms";
import { UserModel } from '@shared';


@Component({
  imports: [Blank, FlexiGridModule, RouterLink, FormsModule],
  templateUrl: './users.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Users {
  readonly result = httpResource<UserModel[]>(() => 'api/users');
  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());

  readonly #toast = inject(FlexiToastService);
  readonly #http = inject(HttpClient);

  delete(id: string) {
    this.#toast.showSwal(
      'Kullanıcıyı Sil?',
      'Kullanıcıyı silmek istiyor musunuz?',
      'Sil',
      () => {
        this.#http.delete(`api/users/${id}`).subscribe({
          next: () => {
            this.result.reload();
            this.#toast.showToast('Kullanıcı silindi', 'success');
          },
          error: () => {
            this.#toast.showToast(
              'Kullanıcı silinirken bir hata oluştu',
              'error',
            );
          },
        });
      },
    );
  }
  changeIsAdmin(user: UserModel) {
    this.#http
      .put(`api/users/${user.id}`, { ...user, isAdmin: user.isAdmin })
      .subscribe({
        next: () => {
          this.#toast.showToast('Kullanıcı güncellendi', 'success');
          this.result.reload();
        },
        error: () => {
          this.#toast.showToast(
            'Kullanıcı güncellenirken bir hata oluştu',
            'error',
          );
        },
      });
  }
}
