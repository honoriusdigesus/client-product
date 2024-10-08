import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../components/login/services/login.service";
import {AuthStatus} from "../components/login/interfaces/auth-status.enum";

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);


  if (authService.authStatus()===AuthStatus.authenticated) {
    router.navigateByUrl('/product');
    return false;
  }
  return true;
};
