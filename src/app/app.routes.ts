import { Routes } from '@angular/router';
import { Landing } from './modules/landing/landing';
import { NotFound } from './common/pages/not-found/not-found';
import { Unauthorized } from './common/pages/unauthorized/unauthorized';
import { Admin } from './modules/admin/admin';
import { authGuard } from './common/guards/auth-guard';
import { alreadyAuthGuard } from './common/guards/already-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
    loadChildren: () => import('./modules/landing/landing.routes')
  },
  {
    path: 'auth',
    canActivate: [alreadyAuthGuard],
    loadChildren: () => import('./modules/auth/auth.routes')
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    component: Admin,
    loadChildren: () => import('./modules/admin/admin.routes')
  },
  {
    path: 'not-found',
    component: NotFound
  },
  {
    path: 'unauthorized',
    component: Unauthorized
  },
  {
    path: '**',
    /* component: NotFound */
    redirectTo: 'not-found'
  }
];
