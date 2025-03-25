import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { LogService } from '../../services/log.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss'],
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule]
})
export class LogFormComponent {
  readonly logForm: FormGroup;
  readonly categories = ['important', 'log'];

  constructor(
    private readonly logService: LogService
  ) {
    this.logForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      category: new FormControl('log', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.logForm.valid) {
      this.logService.addLog({
        ...this.logForm.value,
        timestamp: new Date().toISOString()
      });
      this.logForm.reset({ category: 'log' });
    }
  }
} 