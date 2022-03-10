import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationEnum } from './shared/enums/navigation.enum';

const routes: Routes = [
  {
    path: NavigationEnum.Dashboard,
    loadChildren: () => import("./features/dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: '**',
    redirectTo: NavigationEnum.Dashboard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
