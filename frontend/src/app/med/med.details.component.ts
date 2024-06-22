import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MedService } from './med.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Medication, MedicationInit } from '../typesGolbal';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { TitleCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotificationComponent } from '../notification.component';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-med.details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe, RouterLink],
  template: `
  <section style="
  display: flex;
  justify-content: space-around;
  ">
  @if($Med_data()._id === ''){
  <mat-spinner></mat-spinner>}
  @else{
  <section style="max-width: 80%">
   <mat-card class="example-card" appearance="outlined">
  <mat-card-header>
    <div mat-card-avatar [style]='
    "background-image: url(http://localhost:3000/medications/images/"+$Med_data().image._id+"); background-size: cover;"
    '></div>
    <mat-card-title> {{$Med_data().name}}</mat-card-title>
    <!-- <mat-card-subtitle> {{$Med_data().name}}</mat-card-subtitle> -->
  </mat-card-header>
  <img mat-card-image style="max-height: 500px; max-width: 500px;" [src]="'http://localhost:3000/medications/images/'+$Med_data().image._id" alt="Photo of a Shiba Inu">
  <mat-card-content>
    <div style="display: grid; grid-template-columns: auto auto;">
  <label> Generic name</label>
    <p>
      {{$Med_data().generic_name}}
    </p>  
    <label> Availability</label>
    <p>
      {{$Med_data().availability}}
    </p>
   
    <label> Added by</label>
    <p>
     {{$Med_data().added_by.fullname | titlecase }}
    </p>
    </div>
  </mat-card-content>
  @if($Med_data().added_by.user_id === user_id){

 
  <mat-card-actions style="justify-content: space-evenly; font-weight: bolder;">
 
    <a mat-flat-button [routerLink]="['', 'medications', medication_id(), 'update' ]" [state]="$Med_data()">Update</a>
  
    <button mat-flat-button (click)="openDialog()" style="background-color: red; ">Delete</button>
  </mat-card-actions> }
  <mat-card-actions style="justify-content: space-evenly; font-weight: bolder;">
  <a mat-stroked-button [routerLink]="['', 'medications', medication_id(), 'reviews' ]" >View Reviews </a>
  @if(user_id){
  <a mat-stroked-button [routerLink]="['', 'medications', medication_id(), 'add-reviews' ]" >Add Review </a>
  }
 
  </mat-card-actions>
</mat-card>
</section>}
  </section>
 
  
  `,
  styles: ``
})
export class MedDetailsComponent {
  #router = inject(Router)
  readonly dialog = inject(MatDialog);
  user_id = inject(AuthService).$userLoginStatus()._id
  #req = inject(MedService)
  medication_id = input<string>('')
  $Med_data = signal<Medication>(MedicationInit)

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '40%',
      data: {
        name: this.$Med_data().name,
        message: "Are You sure you want to delete? ",
        deletefun: () => this.delete(),
        cancel: () => this.cancel()
      }
    })
  }

  cancel() {
    this.dialog.closeAll()
  }
  delete() {
    this.#req.deleteMed(this.medication_id()).subscribe(res => {
      if (res.data) {
        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: true,
            name: "Action",
            message: "successfully Deleted!"
          }
        })
        this.#router.navigate([''])
      }
      else {
        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: false,
            name: "Action Failed!",
            message: "Unable to Deleted!"
          }
        })

      }

      setTimeout(() => this.dialog.closeAll(), 1000)
    })
  }
  ngOnInit() {
setTimeout(()=>  this.$Med_data()._id ? null : this.#router.navigate(['','page404']), 2000)
    this.#req.getMedByID(this.medication_id()).subscribe(res => {
      if (res.success) {
        console.log(res.data)
        this.$Med_data.set(res.data)
      }
    }
    )
  }
}
