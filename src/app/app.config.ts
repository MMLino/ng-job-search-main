import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // need to be imported to start the client/server communication

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // provide Http features
    provideRouter(routes)
  ]
};
