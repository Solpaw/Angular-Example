import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from './../remove-dialog/remove-dialog.component';
import { TestModel } from './../../../shared/models/generic.model';
import { DashboardService } from './../dashboard.service';
import { GenerateDialogComponent } from './../generate-dialog/generate-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { skip, Subscription, take } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  data: TestModel[] = [];
  sub = new Subscription();

  constructor(private dialog: MatDialog, private dashboard: DashboardService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub.add(this.dashboard.list.pipe(
      skip(1),
    ).subscribe(res => {
      console.log(res)
      this.data = res;
    }))
  }

  generate() {
    const dialogRef = this.dialog.open(GenerateDialogComponent, {
      panelClass: 'dialog',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if(res) {
        this.dashboard.generateTestList(res.amount, res.image)
      }
    });
  }

  remove() {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      panelClass: 'dialog',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if(res) {
        this.dashboard.removeFromList(res.amount, res.isRandom);
      }
    });
  }

  edit() {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      panelClass: 'dialog',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if(res) {
        this.dashboard.editItems(res.amount, res.isRandom);
      }
    });
  }
}
