import { Routes } from "@angular/router";
import { Register } from "./pages/register/register";

export default [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'login-two',
    title: 'Login two',
    loadComponent: () => import('./pages/login-two/login-two').then(m => m.LoginTwo)
  },
  {
    path: 'register',
    title: 'Register',
    component: Register
  }
] as Routes;
