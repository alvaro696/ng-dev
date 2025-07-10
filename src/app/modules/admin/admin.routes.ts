import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () => import("./dashboard/pages/dashboard/dashboard").then(m => m.Dashboard)
  },
  {
    path: 'users',
    loadComponent: () => import("./user/pages/list-user/list-user").then(m => m.ListUser)
  },
  {
    path: 'products',
    loadComponent: () => import("./product/pages/product/product").then(m => m.ProductComponent)
  }
] as Routes;
