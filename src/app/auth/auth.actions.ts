import { User } from './register/user.model';
import { Action } from '@ngrx/store';


export const SET_USER = '[Auth] set user';
export const UNSET_USER = '[Auth] unset action';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User) {

    }
}


export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;
    constructor() {

    }
}

export type acciones = SetUserAction | UnsetUserAction;
