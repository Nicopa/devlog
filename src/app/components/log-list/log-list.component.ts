import { Component, OnInit } from '@angular/core';
import { LogService, Log } from '../../services/log.service';
import { MatDialog } from '@angular/material/dialog';
import { EditLogDialogComponent } from '../edit-log-dialog/edit-log-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogItemComponent } from '../log-item/log-item.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatToolbarModule, MatIconModule, LogItemComponent]
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];
  filteredLogs: Log[] = [];
  selectedCategory: string = 'all';
  searchText: string = '';
  categories = ['all', 'important', 'log'];

  constructor(
    private logService: LogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredLogs = this.logs.filter(log => {
      const matchesCategory = this.selectedCategory === 'all' || log.category === this.selectedCategory;
      const matchesSearch = !this.searchText || 
        log.description.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  editLog(index: number): void {
    const dialogRef = this.dialog.open(EditLogDialogComponent, {
      width: '500px',
      data: { ...this.filteredLogs[index] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const originalIndex = this.logs.findIndex(log => 
          log.timestamp === this.filteredLogs[index].timestamp
        );
        this.logService.updateLog(originalIndex, result);
        this.snackBar.open('Log updated successfully', 'Close', { duration: 3000 });
      }
    });
  }

  deleteLog(index: number): void {
    const originalIndex = this.logs.findIndex(log => 
      log.timestamp === this.filteredLogs[index].timestamp
    );
    this.logService.deleteLog(originalIndex);
    this.snackBar.open('Log deleted successfully', 'Close', { duration: 3000 });
  }

  saveLogs() {
    try {
      this.logService.saveLogs();
      this.snackBar.open('Logs saved successfully', 'Close', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Error saving logs', 'Close', { duration: 3000 });
    }
  }

  loadLogs() {
    //it should create a file input element to upload a file and get the text
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: Event) => {
          const text = (event.target as FileReader).result as string;
          this.logService.loadLogs(text);
          this.snackBar.open('Logs loaded successfully', 'Close', { duration: 3000 });
        };
        reader.readAsText(file);
      };
      input.click();
    };
    input.click();
  }

  clearLogs() {
    this.logService.clearLogs();
    this.snackBar.open('Logs cleared successfully', 'Close', { duration: 3000 });
  }
} 