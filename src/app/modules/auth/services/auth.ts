import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginUser, RegisterUser } from '../types/auth.type';
import { AuthResponse, LoginResponse } from '../types/auth-response.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl;
  public register(data: RegisterUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data, { withCredentials: true });
  }

  public login(data: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data, { withCredentials: true });

  }
}
