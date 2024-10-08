import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "./auth/layout/auth-layout/auth-layout.component";
import {isAuthenticatedGuard} from "./auth/guards/is-authenticated.guard";
import {isNotAuthenticatedGuard} from "./auth/guards/is-not-authenticated.guard";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {
        path: 'auth/login',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./auth/components/login/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'auth/register',
        loadComponent: () => import('./auth/components/user/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'product',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./product/layout/product-layout/product-layout.component').then(c => c.ProductLayoutComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
