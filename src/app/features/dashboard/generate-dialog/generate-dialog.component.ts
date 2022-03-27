import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-dialog',
  templateUrl: './generate-dialog.component.html',
  styleUrls: ['./generate-dialog.component.scss']
})
export class GenerateDialogComponent {

  form = this.fb.group({
    amount: 100,
    image: true,
  })

  constructor(private dialogRef: MatDialogRef<GenerateDialogComponent>, private fb: FormBuilder) { }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }

  cancel() {
    this.dialogRef.close();
  }
}
