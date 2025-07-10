import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = new Date().getFullYear();
  email = '';

  constructor() {}

  handleSubscribe(): void {
    if (this.email) {
      console.log('Subscribing email:', this.email);
      // Aquí puedes agregar la lógica para manejar la suscripción
      this.email = '';
    }
  }
}
