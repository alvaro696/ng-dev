import { Component, inject } from '@angular/core';
import { Header } from "../../../components/header/header";
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../auth/services/auth';
import { PhoneNumberPipe } from '../../../../../common/pipes/phone-number-pipe';

@Component({
  selector: 'app-dashboard',
  imports: [Header, CommonModule, PhoneNumberPipe],
  templateUrl: './dashboard.html',
  styles: ``
})
export class Dashboard {
  public currentDate = new Date();

  public priceMonthly = .9;

  public salary = 4500.50;

  public authService = inject(Auth);
}
