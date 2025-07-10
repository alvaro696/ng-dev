import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { accessTokenInterceptor } from './modules/auth/interceptors/access-token-interceptor';
import Noir from './common/preset/noir.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([accessTokenInterceptor])
    ),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Noir
      },
    })
  ]
};
