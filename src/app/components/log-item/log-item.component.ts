import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Log } from '../../services/log.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class LogItemComponent {
  @Input() log!: Log;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  getFormattedDate() {
    return new Date(this.log.timestamp).toLocaleString('en-US', { hour12: false });
  }

  getCategoryColor() {
    return this.log.category === 'important' ? 'warn' : 'primary';
  }
} 