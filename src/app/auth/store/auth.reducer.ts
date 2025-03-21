import {User} from "../user.model";
import {AuthActions, LOGOUT, LOGIN} from "./auth.actions";

export interface State {
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state = initialState, action: any) {
    return state;

    switch (action.type) {
        case LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
            );
            return {...state, user}
        case LOGOUT:
            return {...state, user: null}
        default:
            return state;
    }
}
