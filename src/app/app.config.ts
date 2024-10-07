import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, RouterLink} from '@angular/router';

import { routes } from './app.routes';
import {ReactiveFormsModule} from "@angular/forms";

export const appConfig: ApplicationConfig = {
  providers:
    [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
      ReactiveFormsModule
    ]
};
