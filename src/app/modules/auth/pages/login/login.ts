import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from 'primeng/toast';
import { Auth } from '../../services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    Toast
  ],
  templateUrl: './login.html',
  styles: ``,
  providers: [MessageService]
})
export class Login implements OnDestroy {
  public formGroup = new FormGroup({
    credential: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  });

  private authService = inject(Auth);
  private router = inject(Router);
  private messageService = inject(MessageService);

  public loading: boolean = false;

  private loginSubscription?: Subscription;

  public login(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data = {
      credential: this.formGroup.value.credential || '',
      password: this.formGroup.value.password || ''
    };

    this.loginSubscription = this.authService.login(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.formGroup.reset({});
        this.loading = false;
      },
      error: (exception) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: exception.error.message });
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
