import { Routes } from '@angular/router';
import { MedComponent } from './med.component';
import { MedDetailsComponent } from './med.details.component';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
    { path: '', component: MedComponent },
    { path: 'add-med', loadComponent: () => import('./add-med.component').then(c => c.AddMedComponent), canActivate: [() => inject(AuthService).isLoggedin()] },
    { path: ':medication_id', loadComponent: () => import('./med.details.component').then(c => c.MedDetailsComponent) },
    { path: ':medication_id/update', loadComponent: () => import('./update-med.component').then(c => c.UpdateMedComponent), canActivate: [() => inject(AuthService).isLoggedin()] },
    { path: ':medication_id/reviews', loadComponent: () => import('./revews.component').then(c => c.RevewsComponent) },
    { path: ':medication_id/add-reviews', loadComponent: () => import('./add-review.component').then(c => c.AddReviewComponent), canActivate: [() => inject(AuthService).isLoggedin()] },
    { path: ':medication_id/reviews/:review_id', loadComponent: () => import('./review-details.component').then(c => c.ReviewDetailsComponent) },
    { path: ':medication_id/reviews/:review_id/update', loadComponent: () => import('./update-review.component').then(c => c.UpdateReviewComponent), canActivate: [() => inject(AuthService).isLoggedin()] },
    { path: '**', redirectTo: 'forbidden' }
]