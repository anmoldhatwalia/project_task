import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () => import(
      './auth/login/login'
    ).then(c => c.Login)
  },

  {
    path: 'signup',
    loadComponent: () => import(
      './auth/signup/signup'
    ).then(c => c.Signup)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard')
        .then(m => m.Dashboard),
    canActivate: [authGuard]
  },

  {
    path: 'forgot-password',

    loadComponent: () => import(
      './auth/forgot-password/forgot-password'
    )
      .then(
        m => m.ForgotPassword
      )
  },
  {
    path: 'reset-password/:token',

    loadComponent: () => import(
      './auth/reset-password/reset-password'
    )
      .then(
        m => m.ResetPassword
      )
  }
];
