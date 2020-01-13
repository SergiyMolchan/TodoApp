import {TASKS_UPDATE_START, TASKS_UPDATE_SUCCESS, TASKS_UPDATE_ERROR} from './actionsTypes'

export function tasksUPDATE(id, description, completed, deadline){
    return async (dispatch) => {
        dispatch(tasksUPDATE_Start());

        description = description[0].toUpperCase() + description.substring(1);

        const url = '/api/tasks/';
        const data = {id: id, description: description, completed: completed, deadline: deadline};
        try {
            const res = await fetch(url, {
                method: 'PUT',
                cors: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt-token')}`
                },
                body: JSON.stringify(data)
            });
            const tasks = await res.json();
            
            if(res.status === 200){
                dispatch(tasksUPDATE_Success(tasks));
            }

        } catch (error) {
        dispatch(tasksUPDATE_Error(error));
        }
    }
}

export function tasksUPDATE_Start(){
    return{
        type: TASKS_UPDATE_START
    }
}

export function tasksUPDATE_Success(tasks){
    return{
        type: TASKS_UPDATE_SUCCESS,
        tasks
    }
}

export function tasksUPDATE_Error(error){
    return{
        type: TASKS_UPDATE_ERROR,
        error
    }  
}