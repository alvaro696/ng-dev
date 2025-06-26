import { Component, inject, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  providers: [
    MessageService
  ]
})
//que habia que leer para mejorar el UX
//respuesta - Reglas Euristicas de la usabilidad de Jakob Nielsen
export default class Register implements OnDestroy {
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
  private router = inject(Router);
  private messageService = inject(MessageService);
  public loading: boolean = false;
  private registerSubscription?: Subscription;

  public register(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched(); // Marca todos los campos como tocados}
      return;
    }
    this.loading = true; // Cambia el estado de carga a verdadero
    console.log(this.formGroup.value);
    const data = {
      fullName: this.formGroup.value.fullName || '',
      email: this.formGroup.value.email || '',
      password: this.formGroup.value.password || '',
      phone: this.formGroup.value.phone || '',
      //terms: this.formGroup.value.terms || ''
    }
    this.registerSubscription = this.authService.register(data).subscribe({
      next: () => {
        //console.log('Registro exitoso:', response);
        this.router.navigate(['/']); //navega ahsta el home la ruta home
        this.formGroup.reset(); // Resetea el formulario después del registro exitoso
        this.loading = false; // Cambia el estado de carga a falso
      }
      , error: (exception) => {
        //console.error('Error en el registro:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: exception.error.message || 'Error al registrar el usuario',
        }); // Cambia el estado de carga a falso en caso de error
      }
    });
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe(); // Desuscribirse de la suscripción para evitar fugas
  }

}
