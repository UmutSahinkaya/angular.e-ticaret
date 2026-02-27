import { endpointInterceptor } from '@shared/interceptors/endpoint-interceptor';
import { errorInterceptor } from '@shared/interceptors/error-interceptor';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([endpointInterceptor, errorInterceptor]),
    ),
    provideHttpClient(),
  ],
};
