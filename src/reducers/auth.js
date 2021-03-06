import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR} from '../actions/actionsTypes';

const initialState = {
    token: localStorage.getItem('jwt-token'),
    error: null
};

export default function auth(state = initialState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return{
                ...state, token: action.token
            }
        case AUTH_ERROR:
            return{
                ...state, error: action.error
            }
        case AUTH_LOGOUT:
            return{
                ...state, token: null
            }
        default:
            return state
    }
}
