import { BreadCrumbModel } from './../pages/layouts/breadcrumb';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Common {
  readonly data=signal<BreadCrumbModel[]>([]);

  set(data: BreadCrumbModel[]) {
    const val: BreadCrumbModel = {
      title: 'Ana Sayfa',
      icon: 'home',
      url: '/',
    };
    
    this.data.set([val, ...data]);

  }
}
