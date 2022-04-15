import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { RemoveDialogComponent } from './../remove-dialog/remove-dialog.component';
import { TestModel } from './../../../shared/models/generic.model';
import { DashboardService } from './../dashboard.service';
import { GenerateDialogComponent } from './../generate-dialog/generate-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { skip, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  data: TestModel[] = [];
  sub = new Subscription();

  operationCounterLimit: number = 0;
  currentOperation: string = '';
  generateCounter: number = 0;
  editCounter: number = 0;
  removeCounter: number = 0;
  startTime: number = 0;

  constructor(private dialog: MatDialog, private dashboard: DashboardService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub.add(this.dashboard.list.pipe(
      skip(1),
    ).subscribe(res => {
      this.startTime = performance.now();
      this.data = res;
    }))

    this.sub.add(this.dashboard.operationCounterLimit.subscribe(res => {
      this.operationCounterLimit = res;
    }))
  }

  generate() {
    const dialogRef = this.dialog.open(GenerateDialogComponent, {
      panelClass: 'dialog',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if(res) {
        this.dashboard.generateTestList(res.amount, res.image)
        this.setCounters('generate', res.amount)
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
        this.setCounters('remove', res.amount)
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
        this.setCounters('edit', res.amount)
      }
    });
  }

  setCounters(operation: string, limit?: number) {
    this.operationCounterLimit = limit ? limit : this.operationCounterLimit;
    this.currentOperation = operation;
    if(operation === 'generate') {
      this.generateCounter = 0;
    } else if(operation === 'edit') {
      this.editCounter = 0;
    } else if(operation === 'remove') {
      this.removeCounter = 0;
    }
  }

  generateComplete() {
    if(this.currentOperation === 'generate' || this.currentOperation === 'remove') {
      this.generateCounter++;
      if(this.generateCounter === this.operationCounterLimit) {
        const endTime = performance.now();
        this.generateCounter = 0;
        this.dashboard.operationComplete.next(endTime - this.startTime)
        // console.log('generate complete', endTime - this.startTime)
      }
    }
  }

  editComplete() {
    if(this.currentOperation === 'edit') {
      this.editCounter++;
      if(this.editCounter === this.operationCounterLimit) {
        const endTime = performance.now();
        this.editCounter = 0;
        this.dashboard.operationComplete.next(endTime - this.startTime)
        // console.log('edit complete', endTime - this.startTime)
      }
    }
  }

  removeComplete() {
    if(this.currentOperation === 'remove') {
      this.removeCounter++;
      if(this.removeCounter === this.operationCounterLimit) {
        const endTime = performance.now();
        this.removeCounter = 0;
        this.dashboard.operationComplete.next(endTime - this.startTime)
        // console.log('remove complete', endTime - this.startTime)
      }
    }
  }

  runTest() {
    this.runGenerateTest();
  }

  private runGenerateTest() {
    this.setCounters('generate')
    this.dashboard.runGenerateTest(10000, 5, 50, 50);
  }

  private runEditTest() {
    this.setCounters('edit')
    this.dashboard.runEditTest(500, 5, 5, 5);
  }

  private runRemoveTest() {
    this.setCounters('remove');
    this.dashboard.runRemoveTest(500, 5, 5, 5);
  }
}
