
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { mapToExpression } from '@angular/compiler/src/render3/view/util';
import { map } from 'rxjs/operators';
import { User } from './register/user.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private route: Router,
              private afDB: AngularFirestore) { }

  initAuthListener () {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
    console.log(fbUser);
    });
  }

  crearUsuario (nombre: string, email: string, password: string) {
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
       });
     // console.log(result);
      this.route.navigate(['/']);
    }).catch((err) => {
      console.error(err);
      Swal('Error en el login', err.message, 'error');
    });

  }

  login (email: string, password: string) {

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      // console.log(result);
      this.route.navigate(['/']);
    }).catch((err) => {
      console.error(err);
      Swal('Error en el login', err.message, 'error');
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
