import { FormsModule, NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initialUser, UserModel } from '@shared';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';

@Component({
  imports: [RouterLink,FormsModule],
  templateUrl: './register.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Register {
  readonly data=signal<UserModel>(initialUser);

  readonly #http=inject(HttpClient);
  readonly #toast=inject(FlexiToastService);
  readonly #router=inject(Router);

  signUp(form:NgForm){
    if(!form.valid) return;
    this.data.update((prev) => ({...prev,fullName: `${prev.firstName} ${prev.lastName}`}));
    this.#http.post('api/users',this.data()).subscribe({
      next:()=>{
        this.#toast.showToast("Başarılı","Kaydınız başarıyla oluşturuldu. Giriş yapabilirsiniz.");
        this.#router.navigateByUrl('/auth/login');
      },
      error:()=>{
        this.#toast.showToast("Hata","Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  }
}
