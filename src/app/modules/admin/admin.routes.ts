import { Routes } from "@angular/router";
import { Dashboard } from "./pages/dashboard/dashboard";
import { User } from "./pages/user/user";
import { Profile } from "./pages/profile/profile";

export default [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'user',
    component: User,
  },
  {
    path: 'profile',
    component: Profile,
  },
] as Routes;
