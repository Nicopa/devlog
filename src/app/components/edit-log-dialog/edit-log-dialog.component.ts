import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Log } from '../../services/log.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-log-dialog',
  templateUrl: './edit-log-dialog.component.html',
  styleUrls: ['./edit-log-dialog.component.scss'],
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule]
})
export class EditLogDialogComponent {
  editForm: FormGroup;
  categories = ['important', 'log'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditLogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Log
  ) {
    this.editForm = this.fb.group({
      description: [data.description, Validators.required],
      category: [data.category, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.editForm.value
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 