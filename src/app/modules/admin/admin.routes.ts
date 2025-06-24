import { Routes } from "@angular/router";
import { Dashboard } from "./dashboard/dashboard";
import { User } from "./user/user";
export default [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'user',
    component: User,
  },
] as Routes;
