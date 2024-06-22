import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { signinType } from './types';
import { MatDialog } from '@angular/material/dialog';
import { NotificationComponent } from '../notification.component';
import { jwtDecode} from 'jwt-decode';
 


@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  template: ` 

  
  <form style="width: 100%; margin-top: 30%" [formGroup]="Loginform" (ngSubmit)="siginUser()" >
  <div class="formStyles">
    
   <div class="example-container">
   
  <mat-form-field style="width: 100%;">
    <mat-label>Enter your email</mat-label>
    <input matInput 
           placeholder="JohnSmith@example.com"
           formControlName="email"
           (blur)="updateErrorMessage()"
           required>
    @if (Loginform.controls.email.invalid) {
      <mat-error>{{errorMessage}}</mat-error>
    }
  </mat-form-field>
   </div>
   <div class="example-container">
   <mat-form-field  style="width: 100%;">
    <mat-label>Enter your password</mat-label>
    <input matInput [type]="hide() ? 'password' : 'text'" formControlName="password"  />
    <button
      mat-icon-button
      matSuffix
      (click)="clickEvent($event)"
      [attr.aria-label]="'Hide password'"
      [attr.aria-pressed]="hide()"
    >
      <mat-icon>{{hide() ? 'visibility_off' : 'visibility'}}</mat-icon>
    </button>
  </mat-form-field>
</div> <section style="text-align: center;">
  <button type="submit" mat-flat-button [disabled]="Loginform.invalid">Login</button>
</section>
  </div>
 </form>


  `,
  styleUrl: `../../styles.css`
})
export class SinginComponent {
  readonly dialog = inject(MatDialog);
  #sendReq = inject(AuthService)
  #router = inject(Router)
  errorMessage = '';
  hide = signal(true);
 
  Loginform = inject(FormBuilder).nonNullable.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  })
 

  updateErrorMessage() {
    if (this.Loginform.controls.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.Loginform.controls.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  siginUser() {
    this.#sendReq.signin(this.Loginform.value as signinType).subscribe(res => {
      console.log(res.success)
      if (res.success) {
        this.#sendReq.$userLoginStatus.set({...jwtDecode(res.data), jwt: res.data})
 

        this.dialog.open(NotificationComponent, {
          width: '30%',
          data: {
            green: true,
            name: "Welcome " + this.#sendReq.$userLoginStatus().fullname,
            message: ""
          }
        })
 
        setTimeout(() => this.dialog.closeAll(), 1000)


        this.#router.navigate(['', 'medications'])
      }
    })
  }
}
