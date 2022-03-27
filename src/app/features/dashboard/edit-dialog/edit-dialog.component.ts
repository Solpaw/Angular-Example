import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  form = this.fb.group({
    amount: 5,
    isRandom: true,
  })

  constructor(private dialogRef: MatDialogRef<EditDialogComponent>, private fb: FormBuilder) { }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }

  cancel() {
    this.dialogRef.close();
  }
}
