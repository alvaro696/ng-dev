import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-two',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-two.html',
  styles: `
  :host {
    display: block;
  }

  .gradient-primary {
    background: var(--primary-gradient);
  }
  `
})
export class LoginTwo {
  email = '';
  password = '';
  showPassword = false;

  constructor() {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    console.log('Login attempt:', { email: this.email, password: this.password });

    // Validación básica
    if (!this.email || !this.password) {
      console.error('Email and password are required');
      return;
    }

    // Aquí implementarías la lógica de login con tu API
    // Ejemplo:
    // this.authService.login(this.email, this.password).subscribe({
    //   next: (response) => {
    //     console.log('Login successful', response);
    //     // Redirigir al usuario o actualizar el estado de autenticación
    //   },
    //   error: (error) => {
    //     console.error('Login failed', error);
    //     // Mostrar mensaje de error al usuario
    //   }
    // });
  }

  loginWithGithub(): void {
    console.log('Login with GitHub');

    // Aquí implementarías la lógica de login con GitHub
    // Ejemplo usando OAuth:
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email';

    // O usando una librería como Angular OAuth2 OIDC:
    // this.oauthService.initLoginFlow();
  }

  loginWithGoogle(): void {
    console.log('Login with Google');

    // Aquí implementarías la lógica de login con Google
    // Ejemplo usando Google Sign-In:
    // this.googleAuth.signIn().then((user) => {
    //   console.log('Google login successful', user);
    //   // Procesar la información del usuario
    // }).catch((error) => {
    //   console.error('Google login failed', error);
    // });
  }

  // Método adicional para limpiar el formulario
  clearForm(): void {
    this.email = '';
    this.password = '';
    this.showPassword = false;
  }

  // Método para validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para validar contraseña (ejemplo básico)
  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  // Método para manejar errores de validación
  validateForm(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!this.password) {
      errors.push('Password is required');
    } else if (!this.isValidPassword(this.password)) {
      errors.push('Password must be at least 6 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
