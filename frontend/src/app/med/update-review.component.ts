import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MedService } from './med.service';
import { Review } from '../typesGolbal';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification.component';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-update-review',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  template: `
   <form [formGroup]="Addreviwe" >
   <div class="formStyles" style="background-color: lightorange">
   <mat-form-field>
  <mat-label>Add review</mat-label>
  <input matInput formControlName='review' required/></mat-form-field> 
    <div style="display: flex; justify-content: space-around;">

  <label>Rating &nbsp; &nbsp; </label>
    <div>
      <input style="display: none;" type="number" formControlName="rating" />
    @for(num of [1,2,3,4,5]; track $index){
      @if(StarVal() <= num ){
        <button  (click)="givenStar($index)" class="Starbutton">
 <mat-icon fontIcon="star"  style="color: grey;"></mat-icon></button>
      }@else{
        <button   (click)="givenStar($index)" class="Starbutton">
 <mat-icon fontIcon="star" style="color: gold;"></mat-icon></button>
      }
 
    }
  </div>
  </div>
 
  <div style="text-align: center;">
  <button type="submit" (click)="SubmitReview()" mat-raised-button style="width: 50%;" [disabled]="Addreviwe.invalid"  >Submit</button>
  </div>
   </div>
   
   </form>
  `,
  styles: ``
})
export class UpdateReviewComponent {
  #router = inject(Router)
  #Put = inject(MedService)
  user_id = inject(AuthService).$userLoginStatus()._id
  medication_id = input<string>('')
  readonly dialog = inject(MatDialog);
  $reviewDetails = signal<Review>(this.#router.getCurrentNavigation()?.extras.state as Review)
  StarVal = signal<number>(this.$reviewDetails().rating + 1)
  Addreviwe = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: [0, Validators.min(1)]
  })

  constructor(){
    setTimeout(()=>{ 
      if(this.user_id !== this.$reviewDetails().by.user_id || !this.user_id || !this.$reviewDetails().by.user_id ){
        this.#router.navigate(['', 'forbidden'])
      }
    
    }, 500 )
    this.Addreviwe.controls.review.patchValue(this.$reviewDetails().review)
    this.Addreviwe.controls.rating.patchValue(this.$reviewDetails().rating)
  }

  givenStar(num: number) {
     this.StarVal.set(num + 2)
    this.Addreviwe.controls.rating.setValue(num + 1)
  }

  SubmitReview() {
    this.#Put.UpdateReview(this.Addreviwe.value as { review: string; rating: number; }, this.medication_id(), this.$reviewDetails()._id!).subscribe(res => {
      if (res.success) {

        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: true,
            name: "Done!",
            message: "Your review is successfully updated!"
          }
        })
        this.#router.navigate([''])
      }
      else{
        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: false,
            name: "Failed!",
            message: "Unbale to update review!"
          }
        })
      }

      setTimeout(() => this.dialog.closeAll(), 1000)


    })
  }

}

