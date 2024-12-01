import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthNewGuard } from './auth-new.guard';
export const routes: Routes = [
  {
    path: 'product/:productId',
    loadComponent: () => import('./pages/cart/cart.component').then((mod) => mod.CartComponent)
    , canActivate: [AuthNewGuard]
  },
  {
    path: 'cart-items',
    loadComponent: () => import('./pages/cart-items/cart-items.component').then((mod) => mod.CartItemsComponent),
    canActivate: [AuthNewGuard]

  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: "login",
    loadComponent: () => import('./pages/login/login.component').then((mod) => mod.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then((mod) => mod.SignupComponent)
  }
  , {
    path: '**',
    loadComponent: () => import('./pages/error/error.component').then((mod) => mod.ErrorComponent),
  },
];
