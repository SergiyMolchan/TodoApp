import {AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR} from './actionsTypes';

export function login(name, password, isLogin){
    return async dispatch => {
        const url = '/api/auth/login';
        const data = {name: name, password: password};
        try {
          const res = await fetch(url, {
            method: 'POST',
            cors: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const json = await res.json();
          
          if(res.status === 200){
            const expirationDate = new Date(new Date().getTime() + json.timeLifeOfToken * 1000);
            localStorage.setItem('jwt-token', json.token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(json.token));
            dispatch(autoLogout(json.timeLifeOfToken));
            dispatch(authErrorHandler(null));
          }
          if(res.status === 401){
            dispatch(authErrorHandler(json.message));
          }
        } catch (error) {
          console.error(error);
        }
    }
}

export function authSuccess(token){
    return{
        type: AUTH_SUCCESS,
        token
    }
}

export function authErrorHandler(error){
  return{
      type: AUTH_ERROR,
      error
  }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    }
}

export function logout(){
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('expirationDate');
    return{
        type: AUTH_LOGOUT,
    }
}