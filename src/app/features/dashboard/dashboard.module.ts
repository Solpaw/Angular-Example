import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GenerateDialogComponent } from './generate-dialog/generate-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestTileComponent } from './test-tile/test-tile.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    GenerateDialogComponent,
    TestTileComponent,
    RemoveDialogComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class DashboardModule { }
