import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";
import { Header } from "./components/header/header";
import { AdminFooter } from "./components/admin-footer/admin-footer";

@Component({
  selector: 'app-admin',
  imports: [Header, AdminFooter, RouterOutlet, Sidebar],
  templateUrl: './admin.html',
  styles: ``
})
export class Admin {

}
