import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';


import {  ActionReducerMap } from '@ngrx/store';
import { auth } from 'firebase';
import  * as fromIngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.AuthState;
    ingresoEgreso: fromIngresoEgreso.IngresoEgresoState;
}


export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    ingresoEgreso: fromIngresoEgreso.ingresoEgresoReducer
};
