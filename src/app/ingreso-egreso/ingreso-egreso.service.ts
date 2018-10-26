import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { AuthService } from './../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService  {

   ingresoEgresoSubscription: Subscription = new Subscription();
   ingresoEgresoItemsSubscription: Subscription = new Subscription();
  constructor(private afDB: AngularFirestore, private authService: AuthService, private store: Store<AppState>) { }


  initIngresoEgresoListener() {
  this.ingresoEgresoSubscription = this.store.select('auth').pipe(
     filter( auth => auth.user !== null )
   )
   .subscribe(auth => this.ingresoEgresoItems(auth.user.uid));
  }


  private ingresoEgresoItems (uid: string) {
   this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
         .snapshotChanges()
         .pipe(
           map( docData => {
            return docData.map( doc => {
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
            })
         )
         .subscribe( (collection: any []) => {
           this.store.dispatch(new SetItemsAction(collection));
         });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
   const user = this.authService.getUsuario();
   // console.log(user);
   return this.afDB.doc(`${user.uid}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }


  borrarIngresoEgreso (uid: string) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();


  }


}
