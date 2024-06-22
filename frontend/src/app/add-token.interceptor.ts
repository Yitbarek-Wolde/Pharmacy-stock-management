import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const status = inject(AuthService)

  if (status.isLoggedin()) {
   
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${status.$userLoginStatus().jwt}`)

    })
    return next(req);
  }
  else
    return next(req);


};
