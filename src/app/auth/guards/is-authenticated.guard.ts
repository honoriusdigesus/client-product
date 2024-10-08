import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {LoginService} from "../components/login/services/login.service";
import {AuthStatus} from "../components/login/interfaces/auth-status.enum";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(LoginService);
  const router = inject(Router);

  if (authService.authStatus()===AuthStatus.authenticated) {
    return true;
  }

  if (authService.authStatus()===AuthStatus.checking) {
    return false;
  }

  router.navigateByUrl('/auth/login');
  return true;
};
