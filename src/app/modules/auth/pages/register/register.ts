import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { phoneValidator } from '../../../../common/validators/phone.validator';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styles: ``
})
export class Register {
  private PATTERN_MAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private PATTERN_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#\$%\^&\*]).{8,28}$/;

  public formGroup = new FormGroup({
    fullName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.PATTERN_MAIL),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(this.PATTERN_PASSWORD),
    ]),
    phone: new FormControl<string>('', [
      Validators.required,
      phoneValidator(),
    ]),
    terms: new FormControl<boolean>(false, [
      Validators.requiredTrue,
    ])
  });

  private authService = inject(Auth);

  public register(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados}
      return;
    }

    console.log(this.formGroup.value);
    const data = {
      fullName: this.formGroup.value.fullName || '',
      email: this.formGroup.value.email || '',
      password: this.formGroup.value.password || '',
      phone: this.formGroup.value.phone || '',
      terms: this.formGroup.value.terms || ''
    }

    this.authService.register(data);
  }


}
