import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegisterUser } from '../types/auth.type';
import { AuthResponse } from '../types/auth-response.types';
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
}
