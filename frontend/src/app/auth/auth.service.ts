import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { signUpResponseType, signinResponseType, signinType, signupType, userInitialState, userStateType } from './types';
import { Development_environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient)
  $userLoginStatus = signal<userStateType>(userInitialState)


  constructor() {
    effect(() => {
      localStorage.setItem('userJWT', JSON.stringify(this.$userLoginStatus()))
    })
  }
  isLoggedin() {
    return this.$userLoginStatus()._id ? true : false
  }


  signin(data: signinType) {
    return this.#http.post<signinResponseType>(Development_environment.url + "/users/signin", data)
  }

  signup(data: signupType) {
    return this.#http.post<signUpResponseType>(Development_environment.url + "/users/signup", data)
  }

}
