import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading]  Cargando ..';
export const DESACTIVAR_LOADING = '[UI Loading Fin de cargar]';

export class ActivarLoginAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLoginAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type acciones = ActivarLoginAction | DesactivarLoginAction;
 