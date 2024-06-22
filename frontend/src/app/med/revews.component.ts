import { Component, inject, input, signal } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MedService } from './med.service';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-revews',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatIconModule, TitleCasePipe, MatButtonModule, RouterLink],
  template: `
<section style="min-width: 300px">
 <mat-list >
  <h6 style="display: inline; margin-right: 18%">Reviewer</h6> <h6 style="display: inline;"> Rating</h6>
  <mat-divider ></mat-divider>
  <br/>
  @for(review of $ReviewList(); track $index){
<a style="color: blue;" [routerLink]="['', 'medications', medication_id(), 'reviews', review._id ]" [state]="review" >    <h6 style="display: inline; margin-right: 15%"> {{review.by.fullname | titlecase }}  </h6> </a> 
     @for(num of [1,2,3,4,5]; track $index){
      @if(review.rating < num){
      
 <mat-icon fontIcon="star"  style="color: grey;"></mat-icon> 
      }@else{
        
 <mat-icon fontIcon="star" style="color: gold;"></mat-icon> 
   } 
 
  
}
<br />
     <br />
}
</mat-list>

</section>
  `,
  styles: ``
})
export class RevewsComponent {
  #routes = inject(Router)
  #req= inject(MedService)
  $ReviewList = signal<any>('')
  medication_id = input<string>('')

  ngOnInit() {

    this.#req.GetReview(this.medication_id()).subscribe(res => {
      if (res.success) {
        console.log(res.data)
        this.$ReviewList.set(res.data)
      }
    }
    )
  }

}
