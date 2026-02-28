/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserModel } from '@shared';
import { Common } from 'apps/ui/src/services/common';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #common = inject(Common);

  signIn(form: NgForm) {
    if (form.invalid) return;
    this.#http
      .get<
        UserModel[]
      >(`api/users?username=${form.value.username}&password=${form.value.password}`)
      .subscribe((res) => {
        if (res.length === 0) {
          this.#toast.showToast(
            'Hata',
            'Kullanıcı Adı veya Parola hatalı',
            'error',
          );
          return;
        }
        const user = res[0];
        localStorage.setItem('response', JSON.stringify(user));
        this.#common.user.set(user);
        this.#toast.showToast('Başarılı', 'Giriş başarılı', 'success');
        this.#router.navigateByUrl('/');
      });
  }
}
