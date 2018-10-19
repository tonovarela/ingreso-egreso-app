import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
   cargando: boolean;
   subscription: Subscription;
  constructor(public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( state => this.cargando = state.isLoading);
    this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  onSubmit(data: any) {
    this.authService.crearUsuario(data.nombre, data.email, data.password);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }

}
