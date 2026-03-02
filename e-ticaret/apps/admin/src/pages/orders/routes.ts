import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders'),
  },
  {
    path: ':id',
    loadComponent: () => import('./details/details'),
  },
];

export default routes;
