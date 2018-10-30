import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  canLoad() {
    return  this.authService.isAuth().pipe( take(1) );
  }
  canActivate() {
  return  this.authService.isAuth();
  }


  constructor(public authService: AuthService) {   }
}
