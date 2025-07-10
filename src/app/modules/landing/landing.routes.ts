import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Blog } from "./pages/blog/blog";
import { Price } from "./pages/price/price";

export default [
  {
    path: '',
    title: 'Northwind',
    component: Home
  },
  {
    path: 'blog',
    title: 'Blog',
    component: Blog
  },
  {
    path: 'price',
    title: 'Price',
    component: Price
  }
] as Routes;
