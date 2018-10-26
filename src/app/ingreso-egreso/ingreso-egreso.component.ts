import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

import { ActivarLoginAction, DesactivarLoginAction } from '../shared/ui.accion';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})


export class IngresoEgresoComponent implements OnInit, OnDestroy {
 
   forma: FormGroup;
   tipo = 'ingreso';
   loadingSub: Subscription = new Subscription();
   cargando: boolean;
  constructor(private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState>) { }

  ngOnInit() {
   this.store.select('ui')
             .subscribe( ui => this.cargando = ui.isLoading );
    this.forma = new FormGroup({
      'descripcion' : new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });
  }


  ngOnDestroy() {
  this.loadingSub.unsubscribe();
  }

  crearIngresoEgreso() {
    this.store.dispatch( new ActivarLoginAction());
    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      Swal( this.tipo + '  registrado', ingresoEgreso.descripcion, 'success');
      this.store.dispatch(new DesactivarLoginAction());
      this.forma.reset({monto: 0 });
    });
  }

}
