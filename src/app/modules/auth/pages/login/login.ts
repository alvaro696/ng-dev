import { Component, inject, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Subscription } from 'rxjs';
//importar loading


@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    Toast
  ],
  templateUrl: './login.html',
  styles: ``,
  providers: [
    MessageService
  ]
})
export class Login implements OnDestroy {
  private PATTERN_MAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private PATTERN_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,28}$/;
  public loading: boolean = false;
  public formGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.PATTERN_MAIL),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.PATTERN_PASSWORD),
    ]),
    terms: new FormControl<boolean>(false, [
      Validators.requiredTrue,
    ])
  });

  private authService = inject(Auth);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private loginSubscription?: Subscription;

  public login() {
    this.loading = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados}
      return;
    }

    //console.log(this.formGroup.value);
    const data = {
      credential: this.formGroup.value.email || '',
      password: this.formGroup.value.password || '',
    }

    this.loginSubscription = this.authService.login(data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'Success',
          summary: 'Success',
          detail: 'Inicio de sesión exitoso',
        });
        this.router.navigate(['/admin']);
        this.formGroup.reset();
        this.loading = false;
      }
      , error: (exception) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: exception.error.message || 'Error al inicar sesión el usuario',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
