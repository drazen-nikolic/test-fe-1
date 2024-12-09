import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './domains/app/app.component';
import { appConfig } from './domains/app/app.config';


bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
