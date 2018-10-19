import { SetUserAction } from './auth.actions';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './register/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoginAction, DesactivarLoginAction } from '../shared/ui.accion';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubcription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private route: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>
            ) { }

  initAuthListener () {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if (fbUser) {
      this.userSubcription =  this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe( usuarioOb => {
          const user = new User(usuarioOb);
          this.store.dispatch(new SetUserAction(user));
        });
      } else {
        this.userSubcription.unsubscribe();
      }

    });
  }

  crearUsuario (nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoginAction());
    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
       const user: User = {
         uid: result.user.uid,
         nombre,
         email: result.user.email
       };
       this.afDB.doc(`${user.uid}/usuario`).set(user).then(() => {
       this.route.navigate(['/']);
       this.store.dispatch(new DesactivarLoginAction());
       });
     // console.log(result);
      this.route.navigate(['/']);
    }).catch((err) => {
      console.error(err);
      Swal('Error en el login', err.message, 'error');
      this.store.dispatch(new DesactivarLoginAction());
    });

  }

  login (email: string, password: string) {
    this.store.dispatch(new ActivarLoginAction());
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      // console.log(result);
      this.route.navigate(['/']);
      this.store.dispatch(new DesactivarLoginAction());
    }).catch((err) => {
      console.error(err);
      Swal('Error en el login', err.message, 'error');
      this.store.dispatch(new DesactivarLoginAction());
    });

  }


  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }

  isAuth() {
    return this.afAuth.authState.pipe ( map (fbUser =>  {
      if (fbUser === null) {
        this.route.navigate(['/login']);
      }
      return fbUser !== null;
    }  ) );
  }

}
