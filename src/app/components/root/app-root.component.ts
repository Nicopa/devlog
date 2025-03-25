import { Component } from '@angular/core';
import { LogFormComponent } from '../log-form/log-form.component';
import { LogListComponent } from '../log-list/log-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrl: './app-root.component.scss',
  imports: [MatSlideToggleModule, MatToolbarModule, LogFormComponent, LogListComponent]
})
export class AppRootComponent {
  isDarkTheme = true;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme');
  }
} 