import {combineReducers} from 'redux';
import tasksCRUD from './tasksCRUD';
import auth from './auth';


export default combineReducers({
    tasksCRUD, auth
});