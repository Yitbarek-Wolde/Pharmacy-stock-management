import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MedService } from './med.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-med',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  template: `
  <div style="text-align: center;">
    <h5 style="font-weight: 500;"><i>Drug store website</i></h5>
@if(auth$.isLoggedin()){
 <button mat-button value="bold" style="font-size: larger;" (click)="goToAddMed()" >  Add Medication  </button>  }</div>
 <div style="
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: auto auto auto auto auto auto auto auto auto;
  align-content: space-evenly;
  justify-content: space-evenly;

 ">


  @for(alphabet of upperCaseAlphabets; track $index;){
    
     <button mat-stroked-button (click)="GetMed(alphabet)">{{alphabet}}</button> 

  }
 </div>
<h6 style="color: white">{{ $showTitle() }}</h6>
 @for(med of $medNames(); track $index;){
  
  <li style="color: red;"> <a mat-button style="font-size: 20px;" [routerLink]="['', 'medications', med._id]" > {{med.name}}</a> </li>
 
 }
  `,
  styles: `a:hover{
     border-radius: 10px; 
     padding: 10px;
   
    font-size: 30px;
    box-shadow: 5px 5px 15px 8px grey;
    }`
})
export class MedComponent {
  #req = inject(MedService)
  #router = inject(Router)
  $medNames = signal<{_id: string, name: string}[]>([])
  $showTitle = signal<string>('')
  upperCaseAlphabets: string[] = [];
  auth$ = inject(AuthService)
  constructor() {
    this.upperCaseAlphabets = this.generateAlphabets(65, 90);
  }

  generateAlphabets(start: number, end: number): string[] {
    const alphabets = [];
    for (let i = start; i <= end; i++) {
      alphabets.push(String.fromCharCode(i));
    }
    return alphabets;
  }

  GetMed(letter: string) {
    this.#req.getMedByLetter(letter).subscribe(res => {
      if (res.success) {
        this.$medNames.set(res.data)
        this.$showTitle.set(res.data[0] ? 'List of all Medications starting with ' + letter : 'No Medications found starting with ' + letter)
      }
      else{
        this.$showTitle.set('')
      }
    }
    )
  }

  goToAddMed(){
    this.#router.navigate(['', 'medications', 'add-med'])
  }
 
  
}
