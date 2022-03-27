import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    PageWrapperComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
  ]
})
export class SharedModule { }
