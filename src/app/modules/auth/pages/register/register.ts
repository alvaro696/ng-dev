import { Component, OnDestroy, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { phoneValidator } from '../../../../common/validators/phone.validator';
import { Auth } from '../../services/auth';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    Toast
  ],
  templateUrl: './register.html',
  styles: ``,
  providers: [MessageService]
})
export class Register implements OnDestroy {
  private PATTERN_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private PATTERN_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,28}$/;

  public formGroup = new FormGroup({
    fullName: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    email: new FormControl<string>('', [Validators.required, Validators.pattern(this.PATTERN_EMAIL)]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(this.PATTERN_PASSWORD)]),
    phone: new FormControl<string>('', [Validators.required, phoneValidator()]),
    terms: new FormControl<boolean>(false, Validators.requiredTrue)
  });

  private authService = inject(Auth);
  private router = inject(Router);
  private messageService = inject(MessageService);

  public loading: boolean = false;

  private registerSubscription?: Subscription;

  public register(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.loading = true;

    const data = {
      fullName: this.formGroup.value.fullName || '',
      email: this.formGroup.value.email || '',
      password: this.formGroup.value.password || '',
      phone: this.formGroup.value.phone || ''
    };

    this.registerSubscription = this.authService.register(data).subscribe({
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
    this.registerSubscription?.unsubscribe();
  }
}
