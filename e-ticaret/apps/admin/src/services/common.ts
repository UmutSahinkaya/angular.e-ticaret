import { BreadCrumbModel } from './../pages/layouts/breadcrumb';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Common {
  data: BreadCrumbModel[] = [];

  set(data: BreadCrumbModel[]) {
    const val: BreadCrumbModel = {
      title: 'Ana Sayfa',
      icon: 'home',
      url: '/',
    };
    this.data = data;
    this.data.unshift(val);

    console.log(this.data);
  }
}
