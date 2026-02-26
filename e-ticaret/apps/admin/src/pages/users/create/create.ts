/* eslint-disable @nx/enforce-module-boundaries */
import { initialUser } from './../users';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, resource, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Blank from 'apps/admin/src/components/blank';
import { lastValueFrom } from 'rxjs';
import { UserModel } from '../users';
import { HttpClient } from '@angular/common/http';
import { FlexiToastService } from 'flexi-toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [Blank,FormsModule],
  templateUrl: './create.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class CreateUser {
  readonly id = signal<string | undefined>(undefined);
  readonly result= resource({
    params:() => this.id(),
    loader: async () =>{
      const res= await lastValueFrom(this.#http.get<UserModel>(`api/users/${this.id()}`));
      return res;
    }
  });
  readonly data = linkedSignal(()=> this.result.value() ?? {...initialUser});
  readonly cardTitle= computed(()=> this.id() ? "Kullanıcı Güncelle":"Kullanıcı Oluştur");
  readonly btnName= computed(()=> this.id() ? "Güncelle":"Oluştur");

  
  readonly #http=inject(HttpClient);
  readonly #toast=inject(FlexiToastService);
  readonly #router=inject(Router);
  readonly #activated=inject(ActivatedRoute);

  constructor(){
    this.#activated.params.subscribe(params=>{
      this.id.set(params['id']);
    });
  }

  save(form:NgForm){
    if(!form.valid) return;
    if(!this.id()){
      this.#http.post("api/users",this.data()).subscribe(() =>{
        this.#toast.showToast("Başarılı","Kullanıcı başarıyla oluşturuldu.");
        this.#router.navigateByUrl("/users");
      });
    } else{
      this.#http.put(`api/users/${this.id()}`, this.data()).subscribe(() =>{
        this.#toast.showToast("Başarılı","Kullanıcı başarıyla güncellendi.");
        this.#router.navigateByUrl("/users");
      });
    }
  }

}
