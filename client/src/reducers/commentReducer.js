import {
   ADD_COMMENT_SUCCESS,
   ADD_COMMENT_FAIL,
   ADD_REPLY_SUCCESS,
   ADD_REPLY_FAIL,
//    EDIT_COMMENT_SUCCESS,
//    EDIT_COMMENT_FAIL,
//    DELETE_COMMENT,
//    DELETE_COMMENT_SUCCESS,
//    DELETE_COMMENT_FAIL,
   USER_COMMENTS_LOADING,
   GET_USER_COMMENTS_SUCCESS,
   GET_USER_COMMENTS_FAIL,
   GENERAL_COMMENTS_LOADING,
   GET_GENERAL_COMMENTS_SUCCESS,
   GET_GENERAL_COMMENTS_FAIL,
   SET_REPLY_TO,
   CLEAR_REPLY_TO,
   SET_CURRENT_COMMENT,
   COMMENT_REPLIES_LOADING,
   GET_COMMENT_REPLIES_SUCCESS,
   GET_COMMENT_REPLIES_FAIL,
} from '../actions/types';

const initialState = {
    userComments: [],
    comments: [],
    loading: false,
    currComment: null,
    currReplies: [],
    replyTo: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        case ADD_REPLY_SUCCESS:
            return {
                ...state,
                currReplies: [...state.currReplies, action.payload]
            }
        case GET_GENERAL_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...action.payload]
            }
        case GET_USER_COMMENTS_SUCCESS: 
            return {
                ...state,
                loading: false,
                userComments: [...action.payload]
            }
        case GET_COMMENT_REPLIES_SUCCESS:
            return {
                ...state,
                loading: false,
                currReplies: [...action.payload]
            }
        case USER_COMMENTS_LOADING:
        case GENERAL_COMMENTS_LOADING:
        case COMMENT_REPLIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_COMMENT_FAIL:
        case ADD_REPLY_FAIL:
        case GET_GENERAL_COMMENTS_FAIL:
        case GET_USER_COMMENTS_FAIL:
        case GET_COMMENT_REPLIES_FAIL:
            return {
                ...state,
                loading: false
            }
        case CLEAR_REPLY_TO:
        case SET_REPLY_TO:
            return {
                ...state,
                replyTo: action.payload
            }
        case SET_CURRENT_COMMENT:
            return {
                ...state,
                currComment: action.payload
            }
        default:
            return state;
    }
}

export default commentReducer;