/* eslint-disable @typescript-eslint/no-unused-vars */
import { BreadCrumbModel } from './../pages/layouts/breadcrumb';
import { Common } from './../services/common';
import {ChangeDetectionStrategy, Component, inject, input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-blank',
  imports: [],
  template: ` <title>e-Ticaret Admin | {{ pageTitle() }}</title> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Blank implements OnChanges {
  readonly pageTitle = input.required<string>();
  readonly breadcrumbs = input.required<BreadCrumbModel[]>();

  readonly #common = inject(Common);

  ngOnChanges(_changes: SimpleChanges): void {
    this.#common.set(this.breadcrumbs());
  }
}
