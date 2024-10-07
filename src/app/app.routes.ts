import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "./auth/layout/auth-layout/auth-layout.component";

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children:[
      {
        path: 'auth/login',
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
    loadComponent: () => import('./product/layout/product-layout/product-layout.component').then(c => c.ProductLayoutComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
