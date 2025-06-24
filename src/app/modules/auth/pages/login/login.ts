import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
//importar loading


@Component({
  selector: 'app-login',
  imports: [ButtonModule, InputTextModule, CheckboxModule, RouterLink,ReactiveFormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
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


  public login() {
    this.loading = true;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados}
      return;
    }

    console.log(this.formGroup.value);
    const data = {
      email: this.formGroup.value.email || '',
      password: this.formGroup.value.password || '',
      terms: this.formGroup.value.terms || ''
    }
  }
}
