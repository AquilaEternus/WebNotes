import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    comment: commentReducer,
    error: errorReducer,
    note: noteReducer
})