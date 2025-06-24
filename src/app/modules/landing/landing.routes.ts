import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Contact } from "./pages/contact/contact";
import { About } from "./pages/about/about";

export default [
  {
    path: '',
    component: Home,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'about',
    component: About,
  },
] as Routes;
