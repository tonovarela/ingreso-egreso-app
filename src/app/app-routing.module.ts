

import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { dashboardRoutes } from './dashboard/dashboard.routes';
// import { AuthGuard } from './auth/auth.guard';

import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
 { path: 'login',  component: LoginComponent},
 { path: 'register', component: RegisterComponent},
 { path: '', loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule', canLoad: [AuthGuard]},
//  { path: '', component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard]},
 { path: '**', redirectTo: ''}
];

@NgModule( {
    imports: [
        RouterModule.forRoot (routes)
    ],
    exports: [
        RouterModule

    ]
})


export class AppRoutingModule {}
