import { User } from './register/user.model';
import { Action } from '@ngrx/store';


export const SET_USER = '[Auth] set user';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User) {

    }
}

export type acciones = SetUserAction;
