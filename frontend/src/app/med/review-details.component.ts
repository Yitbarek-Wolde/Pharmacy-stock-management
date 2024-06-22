import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Review } from '../typesGolbal';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MedService } from './med.service';
import { NotificationComponent } from '../notification.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-review-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, TitleCasePipe, RouterLink, DatePipe, MatIconModule],
  template: `
   
  <section style="min-width: 300px;">
   <mat-card style="min-width: 300px;" appearance="outlined" >
  <mat-card-header>
 
    <mat-card-title> Reviewed by {{$reviewDetails().by.fullname | titlecase}} </mat-card-title>
 
  </mat-card-header>
 <br/>
  <mat-card-content style="min-width: 100%">
    <div style="display: grid; grid-template-columns: auto auto; ">
  <label> Comments: </label>
    <p>
    {{$reviewDetails().review | titlecase}}
    </p>  
    <label>Rating</label>
    <p>
    @for(num of [1,2,3,4,5]; track $index){
      @if($reviewDetails().rating < num){
      
 <mat-icon fontIcon="star"  style="color: grey;"></mat-icon> 
      }@else{
        
 <mat-icon fontIcon="star" style="color: gold;"></mat-icon> 
   } }
    </p>
   
    <label> </label>
    <p>
    {{$reviewDetails().date | date }}
    </p>
    </div>
  </mat-card-content>

  @if($reviewDetails().by.user_id === user_id){

  
  <mat-card-actions style="justify-content: space-evenly; font-weight: bolder;">
 
    <a mat-flat-button [routerLink]="['', 'medications', medication_id(), 'reviews', $reviewDetails()._id, 'update' ]" [state]="$reviewDetails()" >Update</a>
 
    <button mat-flat-button (click)="delete()"  style="background-color: red; ">Delete</button>
  </mat-card-actions>
 }
</mat-card>
</section>
  `,
  styles: ``
})
export class ReviewDetailsComponent {
  readonly dialog = inject(MatDialog);
  user_id = inject(AuthService).$userLoginStatus()._id
  #req = inject(MedService)
  #router = inject(Router)
  medication_id = input<string>('')
  $reviewDetails = signal<Review>(this.#router.getCurrentNavigation()?.extras.state as Review)
 

  delete() {
    this.#req.deleteReview(this.medication_id(), this.$reviewDetails()._id!).subscribe(res => {
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
}
