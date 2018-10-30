
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';

const childRoutes: Routes = [
    { path: '', component: DashboardComponent, children: dashboardRoutes
    // , canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)


  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
