import { CommonModule, UpperCasePipe } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { Auth } from '../../../auth/services/auth';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  children?: MenuItem[];
}

interface UserMenuItem {
  icon: string;
  label: string;
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    CommonModule,
    UpperCasePipe,
    RouterLinkActive,
    ConfirmDialog,
  ],
  templateUrl: './sidebar.html',
  styles: ``,
  providers: [ConfirmationService],
})
export class Sidebar implements OnInit, OnDestroy {
  public sidebarService = inject(SidebarService);
  public authService = inject(Auth);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);

  public showUserMenu = false;

  documentItems: MenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Dashboard',
      route: '/admin',
    },
    {
      icon: 'pi pi-shopping-cart',
      label: 'Products',
      route: '/admin/products',
    },
    {
      icon: 'pi pi-users',
      label: 'Users',
      route: '/admin/users',
    },
  ];

  userMenuItems: UserMenuItem[] = [
    {
      icon: 'pi pi-user',
      label: 'Profile',
      action: () => console.log('Profile'),
    },
    {
      icon: 'pi pi-cog',
      label: 'Settings',
      action: () => console.log('Settings'),
    },
    {
      icon: 'pi pi-sign-out',
      label: 'Log out',
      action: () => this.logout(),
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close user menu when clicking outside
    if (this.showUserMenu) {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.showUserMenu = false;
      }
    }
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {}

  private checkScreenSize() {
    const isMobile = window.innerWidth < 1024;
    this.sidebarService.setMobile(isMobile);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  public logout(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirm',
      },
      accept: () => {
        this.authService.logout().subscribe({
          next: () => {
            this.authService.logoutLocal();
            this.router.navigate(['/auth/login']);
          },
        });
      }
    });
  }
}
