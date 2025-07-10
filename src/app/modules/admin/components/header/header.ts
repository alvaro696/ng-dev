import { Component, Input, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Auth } from '../../../auth/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styles: ``
})
export class Header {
  @Input() pageName: string = 'Dashboard';

  public sidebarService = inject(SidebarService);
  public authService = inject(Auth);

  // John Doe -> ['John', 'Doe'] -> John = 4
  public lengthFirstName = this.authService.accessUser?.fullName.split(' ')[0].length;
}
