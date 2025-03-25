import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppRootComponent } from './app/components/root/app-root.component';

bootstrapApplication(AppRootComponent, appConfig)
  .catch((err) => console.error(err));
