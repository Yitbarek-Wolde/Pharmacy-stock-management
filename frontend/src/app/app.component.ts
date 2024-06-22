import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { AuthService } from './auth/auth.service';
import { userInitialState, userStateType } from './auth/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, MatDividerModule, RouterLink, MatButton],
  template: `

 
  <section style="
  display: flex;
  justify-content: space-around;
  background-color: lightgrey;
  padding: 0.5%;
  ">  
  <a  routerLink="" ><button mat-button value="bold" style="font-size: larger;">   Home  </button></a> 
  @if(! userState.isLoggedin() ){
<a  routerLink="/signin" ><button mat-button value="bold" style="font-size: larger;">   Login   </button></a> 
<a  routerLink="/signup"  ><button mat-button value="bold" style="font-size: larger;">  Sign Up</button></a> 

  }@else{
<a  routerLink="" ><button mat-button value="bold" style="font-size: larger;" (click)="logout()">   Logout   </button></a> 
}
  </section>
 

 <br/>

 <section style="
  display: flex;
  justify-content: center;
  ">
    <router-outlet />
    </section>

 
  `,
  styles: [],
})
export class AppComponent {
  title = 'Yt Pharma';
  userState = inject(AuthService)
  userStatus = signal<boolean>(true)
  logout() {
  
    this.userState.$userLoginStatus.set(userInitialState)
  }

  
}
