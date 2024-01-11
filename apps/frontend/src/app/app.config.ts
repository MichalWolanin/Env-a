import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { routes } from './app.routes';
import { getAuth, provideAuth } from "@angular/fire/auth";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firebaseConfig } from '../environment';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
     provideHttpClient(withFetch()),
     importProvidersFrom(provideFirebaseApp(() => {
      console.log('firebaseConfig', firebaseConfig);
      return initializeApp(firebaseConfig);
    })),
    importProvidersFrom(provideAuth(() => getAuth())),
    ],
};

export { routes };