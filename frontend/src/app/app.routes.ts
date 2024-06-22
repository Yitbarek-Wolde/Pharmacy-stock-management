import { Routes } from '@angular/router';
import { SinginComponent } from './auth/singin.component';
import { SingupComponent } from './auth/singup.component';
import { page404Component } from './page404.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

export const routes: Routes = [
    {path: '', redirectTo: 'medications', pathMatch: "full"},
    {path: 'signup', component: SingupComponent, canActivate: [()=> !inject(AuthService).isLoggedin()] },
    {path: 'signin', component: SinginComponent, canActivate: [()=> !inject(AuthService).isLoggedin()] },
    {path: 'medications', loadChildren: ()=> import('../app/med/routes').then(c => c.routes) },
    {path: 'forbidden', loadComponent: ()=> import('./unauthorized.component').then(c=>c.UnauthorizedComponent)},
    {path: "**", component: page404Component}
];
