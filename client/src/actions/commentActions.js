import instance from '../api';
import {
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAIL,
    ADD_REPLY_SUCCESS,
    ADD_REPLY_FAIL,
    // EDIT_COMMENT_SUCCESS,
    // EDIT_COMMENT_FAIL,
    // DELETE_COMMENT,
    // DELETE_COMMENT_SUCCESS,
    // DELETE_COMMENT_FAIL,
    // USER_COMMENTS_LOADING,
    // GET_USER_COMMENTS_SUCCESS,
    // GET_USER_COMMENTS_FAIL,
    GENERAL_COMMENTS_LOADING,
    GET_GENERAL_COMMENTS_SUCCESS,
    GET_GENERAL_COMMENTS_FAIL,
    COMMENT_REPLIES_LOADING,
    GET_COMMENT_REPLIES_SUCCESS,
    GET_COMMENT_REPLIES_FAIL,
    SET_REPLY_TO,
    CLEAR_REPLY_TO,
    SET_CURRENT_COMMENT
} from './types';
import { returnErrors } from './errorActions';
import { setTokenHeader } from '../helper/token';

const axios = instance;

/* Post a comment about a specific note to the database. */
export const addComment = (note_id, comment_text) => (dispatch) => {
    const body = JSON.stringify({note_id, comment_text});
    axios.post('/v1/api/comments/', body, setTokenHeader())
        .then(res => {
            dispatch({
                type: ADD_COMMENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_COMMENT_FAIL'));
            dispatch({ type: ADD_COMMENT_FAIL })
        })
}

/* Post a reply to a specific coment. */
export const addReply = (comment_id, reply_text) => (dispatch) => {
    const body = JSON.stringify({comment_id, reply_text});
    axios.post(`/v1/api/comments/${comment_id}/reply`, body, setTokenHeader())
        .then(res => {
            dispatch({
                type: ADD_REPLY_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_REPLY_FAIL'));
            dispatch({ type: ADD_REPLY_FAIL })
        })
}

/* Get all the comments posted for the current note. */
export const getNoteComments = (note_id) => (dispatch) => {
    dispatch({ type: GENERAL_COMMENTS_LOADING });
    axios.get(`/v1/api/comments/note/${note_id}`, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(res => {
            dispatch({
                type: GET_GENERAL_COMMENTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err  => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GET_GENERAL_COMMENTS_FAIL })
        })
}

/* Get all the replys posted for the currently selected comment. */
export const getCommentReplies = (comment_id) => (dispatch) => {
    dispatch({ type: COMMENT_REPLIES_LOADING });
    axios.get(`/v1/api/comments/${comment_id}/replies`, setTokenHeader())
        .then(res => {
            dispatch({
                type: GET_COMMENT_REPLIES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err  => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GET_COMMENT_REPLIES_FAIL })
        })
}

/* Set with the username of the person whose comment/reply a user pressed the "Reply" button to. */
export const setReplyTo = (username) => {
    return {
        type: SET_REPLY_TO,
        payload: username
    }
}

/* Clear the username of whoever the user pressed "Reply" to.  */
export const clearReplyTo = () => {
    return {
        type: CLEAR_REPLY_TO,
        payload: null
    }
}

/* Sets the current comment whose replies will be loaded from the database. */
export const setCurrComment = (comment_id) => {
    return {
        type: SET_CURRENT_COMMENT,
        payload: comment_id
    }
}