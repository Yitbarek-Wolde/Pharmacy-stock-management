import { Component, inject, input, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MedService } from './med.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification.component';
import { Medication } from '../typesGolbal';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-update-med',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatRadioModule],
  template: `

   <form style="width: 100%; margin-top: 30%" [formGroup]="form" (ngSubmit)="UpdateMed()" >

  <div 
  class="formStyles" style="height: auto;"
  >

   <div >
   
          <mat-form-field style="width: 100%;">
            <mat-label>Medication name</mat-label>
            <input matInput
                  placeholder="Advil"
                  formControlName="name"
            
                  required>
        
          </mat-form-field>
   </div>
   
   <div >
   
        <mat-form-field style="width: 100%;">
          <mat-label>Medication Generic name</mat-label>
          <input matInput
                placeholder="Pain killer"
                formControlName="generic_name"
     
                required>
            
        </mat-form-field>
   </div>

   <div>

        <mat-form-field style="width: 100%;">
          <mat-label>Medication class</mat-label>
          <input matInput
                placeholder="Medication class"
                formControlName="medication_class"
            
                required>
          
        </mat-form-field>

   </div>
   



<div>
              <mat-radio-group aria-label="Select an option" formControlName="availability"> 
  <mat-radio-button  value="OTC">OTC</mat-radio-button>
  <mat-radio-button value="Prescription">Prescription</mat-radio-button>
</mat-radio-group>
</div>

<div style="margin-top: 5%;   margin-bottom: 5%;  ">

 
  <input  type="file"
       (change)="setFile($event)"
        formControlName="medication_image"
     >
</div>

  <section style="text-align: center; margin-top: 5%;   ">
  <button type="submit" mat-button style="font-size: 30px;" [disabled]="form.invalid">Submit</button>
  </section>


  </div>
 </form>

  `,
  styles: ``
})
export class UpdateMedComponent {
  file!: File
  #sendReq = inject(MedService)
  readonly dialog = inject(MatDialog);
  user_id = inject(AuthService).$userLoginStatus()._id
  #router = inject(Router)
  medication_id = input<string>('')
  errorMessage = '';
  hide = signal(true);
  readonly $MedDetails = signal(this.#router.getCurrentNavigation()?.extras.state as Medication)

  form = inject(FormBuilder).nonNullable.group({
    name: ["", Validators.required],
    generic_name: ["", Validators.required],
    medication_class: ["", Validators.required],
    availability: ["", Validators.required],
    medication_image: ""
  })

  constructor() {
    setTimeout(()=>{ 
      if(this.user_id !== this.$MedDetails().added_by.user_id){
        this.#router.navigate(['', 'forbidden'])
      }
    
    }, 500 )
    this.form.controls.name.patchValue(this.$MedDetails().name)
    this.form.controls.generic_name.patchValue(this.$MedDetails().generic_name)
    this.form.controls.medication_class.patchValue(this.$MedDetails().medication_class)
    this.form.controls.availability.patchValue(this.$MedDetails().availability)
  }
  setFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    } else {
      this.dialog.open(NotificationComponent, {
        width: '30%',
        data: {
          green: false,
          name: "Failed!",
          message: "Unable to add picture!"
        }
      })
      setTimeout(() => this.dialog.closeAll(), 1000)
    }
  }

  UpdateMed() {
    const formData = new FormData();
    formData.append('medication_image', this.file);
    formData.append('name', this.form.controls.name.value);
    formData.append('generic_name', this.form.controls.generic_name.value);
    formData.append(
      'medication_class',
      this.form.controls.medication_class.value
    );
    formData.append('availability', this.form.controls.availability.value);

    this.#sendReq.UpdateMedication(formData, this.medication_id()).subscribe(res => {
      if (res.success) {
        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: true,
            name: "Success!",
            message: "Medication Successfully updated!"
          }
        })
        this.#router.navigate([''])

      } else {
        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: false,
            name: "failed!",
            message: "Unable to updated Medication!"
          }
        })
      } setTimeout(() => this.dialog.closeAll(), 1000)
    })
  }

}

