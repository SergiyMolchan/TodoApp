import {TASKS_GET_START, TASKS_GET_SUCCESS, TASKS_GET_ERROR, TASKS_CREATE_START, TASKS_CREATE_SUCCESS, TASKS_CREATE_ERROR, TASKS_UPDATE_START, TASKS_UPDATE_SUCCESS, TASKS_UPDATE_ERROR, TASKS_DELETE_START, TASKS_DELETE_SUCCESS, TASKS_DELETE_ERROR} from '../actions/actionsTypes';

const initialState = {
    tasks: [
    // {
    //   id: 0,
    //   description: 'Create todo array',
    //   completed: true,
    //   deadline: "2019-09-15T10:30"
    // },
    ],
    loading: false,
    error: null
};

export default function tasksCRUD(state = initialState, action){

    switch(action.type){
        case TASKS_GET_START:
            return{
                ...state, loading: true
            }
        case TASKS_GET_SUCCESS:
            return{
                ...state, loading: false, tasks: action.tasks
            }
        case TASKS_GET_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case TASKS_CREATE_START:
            return{
                ...state, loading: true
            }    
        case TASKS_CREATE_SUCCESS:
            return{
                ...state, loading: false, tasks: action.tasks
            } 
        case TASKS_CREATE_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case TASKS_UPDATE_START:
            return{
                ...state, loading: true
            }
        case TASKS_UPDATE_SUCCESS:
            return{
                ...state, loading: false, tasks: action.tasks
            }
        case TASKS_UPDATE_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case TASKS_DELETE_START:
            return{
                ...state, loading: true
            }
        case TASKS_DELETE_SUCCESS:
            return{
                ...state, loading: false, tasks: action.tasks
            }
        case TASKS_DELETE_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }

}