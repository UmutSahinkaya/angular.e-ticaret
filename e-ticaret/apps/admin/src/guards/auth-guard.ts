import { CanActivateFn, Router } from '@angular/router';
import { Common } from '../services/common';
import { inject } from '@angular/core';
import { UserModel } from '@shared';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (_, state) => {
  const res = localStorage.getItem('response');
   const router = inject(Router);
   const common = inject(Common);
   
   if (!res) {
     router.navigateByUrl('/login');
     return false;
   }

   const user: UserModel = JSON.parse(res);
   common.user.set(user);
   return true;
};
