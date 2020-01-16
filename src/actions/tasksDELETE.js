import {TASKS_DELETE_START, TASKS_DELETE_SUCCESS, TASKS_DELETE_ERROR} from './actionsTypes';

export function tasksDELETE(id){
    return async dispatch => {
        dispatch(tasksDELETE_Start());

        const url = '/api/tasks/';
        const data = {id: id};
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                cors: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt-token')}`
                },
                body: JSON.stringify(data)
            });
            const tasks = await res.json();
            
            if(res.status === 200){
                dispatch(tasksDELETE_Success(tasks));
            }

        } catch (error) {
        dispatch(tasksDELETE_Error(error));
        }
    }
}

export function tasksDELETE_Start(){
    return{
        type: TASKS_DELETE_START
    }
}

export function tasksDELETE_Success(tasks){
    return{
        type: TASKS_DELETE_SUCCESS,
        tasks
    }
}

export function tasksDELETE_Error(error){
    return{
        type: TASKS_DELETE_ERROR,
        error
    }  
}