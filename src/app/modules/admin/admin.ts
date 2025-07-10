import { Component, inject } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Auth } from '../auth/services/auth';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-admin',
  imports: [Sidebar, RouterOutlet, ButtonModule, Toast, CommonModule],
  templateUrl: './admin.html',
  styles: ``,
  providers: [MessageService]
})
export class Admin {
  private authService = inject(Auth);
  private router = inject(Router);
  private msgService = inject(MessageService);
  sidebarService = inject(SidebarService);

  public loading: boolean = false;

  public logout(): void {
    this.loading = true;

    this.authService.logout().subscribe({
      next: () => {
        this.authService.logoutLocal();
        this.router.navigate(['/auth/login']);
      },
      error: (exception) => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: exception.error.message });
        this.loading = false;
      }
    });
  }
}
