import { Routes } from '@angular/router';
import { Landing } from './modules/landing/landing';
import { NotFound } from './common/pages/not-found/not-found';
import { Unauthorized } from './common/pages/unauthorized/unauthorized';
import { Admin } from './modules/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
    loadChildren: () => import('./modules/landing/landing.routes')
  },
  {
    path: 'admin',
    component: Admin,
    loadChildren: () => import('./modules/admin/admin.routes')
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes')
  },
  {
    path: 'not-found',
    component: NotFound, // Componente para manejar rutas no encontradas
  },
  {
    path: 'unauthorized',
    component: Unauthorized, // Componente para manejar accesos no autorizados
  },
  {
    path: '**', // para controlar las rutas no encontradas
    redirectTo: 'not-found',
  }
];
