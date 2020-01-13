import {TASKS_GET_START, TASKS_GET_SUCCESS, TASKS_GET_ERROR} from './actionsTypes';

export function tasksGET(){
    return async dispatch => {
        dispatch(tasksGET_Start());
        const url = '/api/tasks/';
        try {
            const res = await fetch(url, {
                method: 'GET',
                cors: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('jwt-token')}`
                },
            });
            const tasks = await res.json();
            if(res.status === 200){
                dispatch(tasksGET_Success(tasks));
            }
        } catch (error) {
            dispatch(tasksGET_Error(error));
        }
    }
}

export function tasksGET_Start(){
    return{
        type: TASKS_GET_START
    }
}

export function tasksGET_Success(tasks){
    return{
        type: TASKS_GET_SUCCESS,
        tasks
    }
}

export function tasksGET_Error(error){
    return{
        type: TASKS_GET_ERROR,
        error
    }  
}
