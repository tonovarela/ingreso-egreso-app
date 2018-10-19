import { AppState } from './../../app.reducer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription;

  constructor(public authService: AuthService, public router: Router, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( state => this.cargando = state.isLoading);
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
 }
  login(data: any) {

    this.authService.login(data.email, data.password);
  }


}
