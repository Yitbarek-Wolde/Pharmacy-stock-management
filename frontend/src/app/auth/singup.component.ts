import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { signupType } from './types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  template: `

   <form style="width: 100%; margin-top: 30%" [formGroup]="Signupform" (ngSubmit)="signUpUser()" >

  <div 
  class="formStyles"
  >
   <div class="example-container">
   
  <mat-form-field style="width: 100%;">
    <mat-label>Enter your fullname</mat-label>
    <input matInput
           placeholder="John Smith"
           formControlName="fullname"
           (blur)="updateErrorMessage('name')"
           required>
           @if (Signupform.controls.fullname.invalid) {
      <mat-error>{{errorMessage}}</mat-error>
    }
  </mat-form-field>
   </div>
   <div>

   <mat-form-field style="width: 100%;">
    <mat-label>Enter your email</mat-label>
    <input matInput
           placeholder="JohnSmith@example.com"
           formControlName="email"
           (blur)="updateErrorMessage('email')"
           required>
    @if (Signupform.controls.email.invalid) {
      <mat-error>{{errorMessage}}</mat-error>
    }
  </mat-form-field>

   </div>
   <div class="example-container">
   <mat-form-field style="width: 100%;">
    <mat-label>Enter your password</mat-label>
    <input matInput [type]="hide() ? 'password' : 'text'" formControlName="password" (blur)="updateErrorMessage('password')" />
    <button
      mat-icon-button
      matSuffix
      (click)="clickEvent($event)"
      [attr.aria-label]="'Hide password'"
      [attr.aria-pressed]="hide()"
    >
      <mat-icon>{{hide() ? 'visibility_off' : 'visibility'}}</mat-icon>
    </button>
    @if (Signupform.controls.password.invalid) {
      <mat-error>{{errorMessage}}</mat-error>
    }
  </mat-form-field>
</div>   <section style="text-align: center;">
  <button type="submit" mat-flat-button [disabled]="Signupform.invalid" >Sing up</button>

  </section>
  </div>
 </form>

  `,
  styles: ``
})
export class SingupComponent {
  #sendReq = inject(AuthService)
  #router = inject(Router)
  errorMessage = '';
  hide = signal(true);

  Signupform = inject(FormBuilder).nonNullable.group({
    fullname: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required]
  })
 
  updateErrorMessage(val: string) {
    if (val === 'email')
      if (this.Signupform.controls.email.hasError('required')) {
        this.errorMessage = 'You must enter an email';
      } else if (this.Signupform.controls.email.hasError('email')) {
        this.errorMessage = 'Not a valid email';
      } else {
        this.errorMessage = '';
      }
    else if (val === 'name') {
      if (this.Signupform.controls.fullname.hasError('required')) {
        this.errorMessage = 'You must enter your fullname';
      } else if (this.Signupform.controls.fullname.hasError('fullname')) {
        this.errorMessage = 'Not a valid ';
      } else {
        this.errorMessage = '';
      }
    }
    else if ("password") {
      if (this.Signupform.controls.password.hasError('required')) {
        this.errorMessage = 'You must enter password';
      } else if (this.Signupform.controls.fullname.hasError('password')) {
        this.errorMessage = 'Not a valid password';
      } else {
        this.errorMessage = '';
      }

    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  signUpUser() {
    this.#sendReq.signup(this.Signupform.value as signupType).subscribe(res => {
      if (res.success) {
        this.#router.navigate(['', 'signin'])
      }
    })
  }

}
