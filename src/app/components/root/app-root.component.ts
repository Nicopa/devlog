import { Component, OnInit } from '@angular/core';
import { LogFormComponent } from '../log-form/log-form.component';
import { LogListComponent } from '../log-list/log-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LogService } from '../../services/log.service';

declare global {
  interface Window {
    electronAPI: {
      onAppClose: (callback: () => void) => void;
      confirmClose: () => void;
    };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrl: './app-root.component.scss',
  imports: [MatSlideToggleModule, MatToolbarModule, LogFormComponent, LogListComponent]
})
export class AppRootComponent implements OnInit {
  isDarkTheme = true;
  constructor(
    private readonly logService: LogService
  ) {}
  
  ngOnInit(): void {
    window.electronAPI.onAppClose(() => {
      if (this.logService.isLogsSaved || !this.logService.logsCount) return window.electronAPI.confirmClose();
      const shouldClose = confirm('You have unsaved logs. Do you want to close the app?');
      if (shouldClose) {
        window.electronAPI.confirmClose();
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('light-theme');
  }
} 