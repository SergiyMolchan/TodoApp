import {CREATE, GET, UPDATE, DELETE, TASKS_GET_START, TASKS_GET_SUCCESS, TASKS_GET_ERROR} from '../actions/actionsTypes';

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

        default:
            return state
    }

}