import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegisterUser } from '../types/auth.type';
import { AuthResponse, User } from '../types/auth-response.type';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginUser } from '../types/login.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = environment.apiUrl;

  private _accessToken: string = localStorage.getItem('accessToken') || '';
  private _accessUser: User | null = JSON.parse(localStorage.getItem('accessUser') || 'null');
  private _isAuth: boolean = !!localStorage.getItem('accessToken') || false;

  get accessToken(): string {
    return this._accessToken;
  }

  get accessUser(): User | null {
    return this._accessUser;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  private _setAuthData(accessToken: string, accessUser: User): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessUser', JSON.stringify(accessUser));
    this._accessToken = accessToken;
    this._accessUser = accessUser;
    this._isAuth = true;
  }

  public logoutLocal(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessUser');
    this._accessToken = '';
    this._accessUser = null;
    this._isAuth = false;
  }

  public register(data: RegisterUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data, { withCredentials: true }).pipe(
      tap((response) => {
        this._setAuthData(response.accessToken, response.user);
      })
    );
  }

  public login(data: LoginUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data, { withCredentials: true }).pipe(
      tap((response) => {
        this._setAuthData(response.accessToken, response.user);
      })
    );
  }

  public refreshAccessToken(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/auth/refresh`, {}, { withCredentials: true }).pipe(
      tap((response) => {
        this._accessToken = response.accessToken;
        localStorage.setItem('accessToken', response.accessToken);
      }),
      catchError((error) => {
        this.logoutLocal();
        return throwError(() => error);
      })
    );
  }

  public logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/logout`, null, { withCredentials: true });
  }
}
