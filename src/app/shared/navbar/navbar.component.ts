import { filter } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { User } from '../../auth/register/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>) { }
  nombre: string;
  ngOnInit() {

   this.subscription = this.store.select('auth').pipe( filter(auth => auth.user != null ))
   .subscribe(  auth => {
     this.nombre = auth.user.nombre;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
