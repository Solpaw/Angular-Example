import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.scss']
})
export class RemoveDialogComponent {

  form = this.fb.group({
    amount: 5,
    isRandom: true,
  })

  constructor(private dialogRef: MatDialogRef<RemoveDialogComponent>, private fb: FormBuilder) { }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }

  cancel() {
    this.dialogRef.close();
  }
}
