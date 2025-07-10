import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.accessToken) {
    req = addAccessToken(req, authService.accessToken);
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && (error.status === 400 || error.status === 401)) {
        return authService.refreshAccessToken().pipe(
          switchMap((accessToken) => {
            req = addAccessToken(req, accessToken.accessToken);
            return next(req);
          }),
          catchError((error) => {
            authService.logoutLocal();
            router.navigate(['/auth/login']);
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

function addAccessToken(request: HttpRequest<any>, accessToken: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
