import { SIGN_IN, SIGN_UP } from "./ActionType"

const initialValue = {
    signin: null,
    signup: null

}
export const AuthReducer = (store = initialValue, { type, payload }) => {

    if (type === SIGN_IN) {
        return { ...store, signin: payload }
    }
    else if (type === SIGN_UP) {
        return { ...store, signup: payload }
    }
    return store;
}