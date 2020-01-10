import {TASKS_CREATE_START, TASKS_CREATE_SUCCESS, TASKS_CREATE_ERROR} from './actionsTypes';

export function tasksCREATE(description, deadline){
    return async (dispatch) => {
        console.log(description);
        console.log(deadline);

        dispatch(tasksCREATE_Start());
        let newTask = {
        description: '',
        deadline: ''
        };

        description = description[0].toUpperCase() + description.substring(1);
        newTask.description = description;
        newTask.deadline = deadline;

        
        const url = '/api/tasks/';
        const data = {description: description, deadline: deadline};
        try {
            const res = await fetch(url, {
                method: 'POST',
                cors: 'no-cors',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt-token')}`
                },
                body: JSON.stringify(data)
            });
            const tasks = await res.json();
            
            if(res.status === 200){
                dispatch(tasksCREATE_Success(tasks));
            }

        } catch (error) {
        dispatch(tasksCREATE_Error(error));
        }
    }
}

export function tasksCREATE_Start(){
    return{
        type: TASKS_CREATE_START
    }
}

export function tasksCREATE_Success(tasks){
    return{
        type: TASKS_CREATE_SUCCESS,
        tasks
    }
}

export function tasksCREATE_Error(error){
    return{
        type: TASKS_CREATE_ERROR,
        error
    }  
}
