import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../../modules/auth/services/auth';
import { Location } from '@angular/common';

export const alreadyAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const location = inject(Location);

  if (!authService.isAuth) {
    return true;
  }

  location.back();
  return false;
};
