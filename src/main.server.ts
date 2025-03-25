import { bootstrapApplication } from '@angular/platform-browser';
import { AppRootComponent } from './app/components/root/app-root.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppRootComponent, config);

export default bootstrap;
