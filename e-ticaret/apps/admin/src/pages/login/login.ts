import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlexiToastService } from 'flexi-toast';
import { UserModel } from '../users/users';

@Component({
  imports: [FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Login {
  readonly #http = inject(HttpClient);
  readonly #toast = inject(FlexiToastService);
  readonly #router = inject(Router);

  signIn(form:NgForm){
    if(!form.valid) return;
     const endpoint = `api/users?userName=${form.value['userName']}&password=${form.value['password']}`;
     this.#http.get<UserModel[]>(endpoint).subscribe({
      next: (users) => {
        if(users.length > 0){
          this.#toast.showToast('Giriş Başarılı', 'success');
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.#router.navigate(['/']);
        } else {
          this.#toast.showToast('Geçersiz kullanıcı adı veya şifre', 'error');
        }
     }});
  }
}
