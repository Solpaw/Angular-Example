import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from 'src/app/shared/components/page-wrapper/page-wrapper.component';
import { NavigationEnum } from 'src/app/shared/enums/navigation.enum';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: "",
    component: PageWrapperComponent,
    children: [
        {
            path: "",
            component: DashboardPageComponent,
        },
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
