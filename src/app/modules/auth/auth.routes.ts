import { Routes } from "@angular/router";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";

export default [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    component: Register,
  }
] as Routes;
