import instance from '../api';

import {
    CURR_NOTE_LOADING,
    USER_NOTES_LOADING,
    GENERAL_NOTES_LOADING,
    GET_GENERAL_NOTES_SUCCESS,
    GET_GENERAL_NOTES_FAIL,
    CLEAR_QUERY,
    // SET_QUERY,
    GET_CURR_NOTE_SUCCESS,
    GET_CURR_NOTE_FAIL,
    GET_USER_NOTES_SUCCESS,
    GET_USER_NOTES_FAIL,
    ADD_NOTE_SUCCESS,
    ADD_NOTE_FAIL,
    EDIT_NOTE_SUCCESS,
    EDIT_NOTE_FAIL,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
    GET_NOTE_LIKES,
    GET_NOTE_DISLIKES,
    GET_NOTE_LIKES_FAIL,
    GET_NOTE_DISLIKES_FAIL,
    ADD_NOTE_LIKE,
    ADD_NOTE_LIKE_FAIL,
    REMOVE_NOTE_LIKE,
    REMOVE_NOTE_LIKE_FAIL,
    ADD_NOTE_DISLIKE,
    ADD_NOTE_DISLIKE_FAIL,
    REMOVE_NOTE_DISLIKE,
    REMOVE_NOTE_DISLIKE_FAIL,
    SWAP_TO_LIKE,
    SWAP_TO_LIKE_FAIL,
    SWAP_TO_DISLIKE,
    SWAP_TO_DISLIKE_FAIL,
    LIKED_NOTES_LOADING,
    GET_LIKED_NOTES_SUCCESS,
    GET_LIKED_NOTES_FAIL
} from './types';

import { returnErrors } from './errorActions';
import { setTokenHeader } from '../helper/token';

const axios = instance;

/* Get the data of the current note that the user is viewing. */
export const getCurrNote = (note_id) => (dispatch) => {
    dispatch({type: CURR_NOTE_LOADING});
    axios.get(`/v1/api/notes/${note_id}`, 
    {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => dispatch({
        type: GET_CURR_NOTE_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: GET_CURR_NOTE_FAIL })
    })
};

/* Get a paginated list of notes whenever the user searches for something in the home page. */
export const getQueriedNotes = (query, page=1) => (dispatch) => {
    if (query) {
        dispatch({type: GENERAL_NOTES_LOADING});
        axios.get(`/v1/api/notes/search?q=${query}&page=${page}`, 
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            res.data.query = query;
            dispatch({
                type: GET_GENERAL_NOTES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GET_GENERAL_NOTES_FAIL })
        })
    }
    
};

/* Get a paginated list of a user's notes whenever they go to their MyNotes page. */
export const getUserNotes = (query, page=1) => (dispatch) => {
    if (query) {
        dispatch({
            type: USER_NOTES_LOADING
        })
        axios.get(`/v1/api/user/notes/search?q=${query}&page=${page}`, setTokenHeader())
        .then(res => {
            res.data.query = query;
            dispatch({
                type: GET_USER_NOTES_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: GET_USER_NOTES_FAIL })
        })
    } else {
        dispatch({
            type: USER_NOTES_LOADING
        })
        axios.get(`/v1/api/user/notes?page=${page}`, setTokenHeader())
            .then(res => dispatch({
                type: GET_USER_NOTES_SUCCESS,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({ type: GET_USER_NOTES_FAIL });
            }) 
    }
};

/* Gets a paginated list of a user's liked notes whenever they go to their LikedNotes page. */
export const getLikedNotes = (page=1) => (dispatch) => {
    dispatch({
        type: LIKED_NOTES_LOADING
    })
    axios.get(`/v1/api/user/liked/notes?page=${page}`, setTokenHeader())
        .then(res => dispatch({
            type: GET_LIKED_NOTES_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: GET_LIKED_NOTES_FAIL });
        })  
}

/* Clears the query whenever a user switches between the home, liked notes, and MyNotes pages. */
export const clearQuery = () => {
    return {
        type: CLEAR_QUERY,
    }
}

/* Posts a new note to the database. */
export const addNote = ({ title, content, isPrivate }) => (dispatch) => {
    const body = JSON.stringify({ title, content, isPrivate});
    axios.post('/v1/api/notes', body, setTokenHeader())
        .then(res => dispatch({
            type: ADD_NOTE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_FAIL'))
            dispatch({ type: ADD_NOTE_FAIL })
        })
}

/* Put/Edit an already uploaded post in the database. */
export const editNote = (noteId, title, text, isPrivate) => (dispatch) => {
    const body = JSON.stringify({ title, text, isPrivate });
    axios.put(`/v1/api/notes/${noteId.toString()}`, body, setTokenHeader())
        .then(res => dispatch({
            type: EDIT_NOTE_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, 'EDIT_NOTE_FAIL'))
            dispatch({ type: EDIT_NOTE_FAIL });
        })
}

/* Delete a note in the database permenantly. */
export const deleteNote = (noteId, title, text) => (dispatch) => {
    const body = JSON.stringify({ title, text });
    axios.delete(`/v1/api/notes/${noteId.toString()}`, setTokenHeader(), { data: body })
        .then(res => dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: noteId
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: DELETE_NOTE_FAIL });
        })
}

/* Posts a rating of a note on the database from the user depending on the rating type (like/dislike) passed. */
export const addRating = (noteId, rating_type) => (dispatch) => {
    const body = JSON.stringify({ 
        object_id: noteId,  
        rating_type,
    });
    if (rating_type === 'like') {
        axios.post('/v1/api/ratings/note', body, setTokenHeader())
            .then(res => dispatch({
                type: ADD_NOTE_LIKE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_LIKE_FAIL'))
                dispatch({ type: ADD_NOTE_LIKE_FAIL })
            })
    } else {
        axios.post('/v1/api/ratings/note', body, setTokenHeader())
            .then(res => dispatch({
                type: ADD_NOTE_DISLIKE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'ADD_NOTE_DISLIKE_FAIL'))
                dispatch({ type: ADD_NOTE_DISLIKE_FAIL })
            })
    }  
}

/* Put/Update a rating on the database. */
export const updateRating = (noteId, rating_type) => (dispatch) => {
    const body = JSON.stringify({  
        rating_type: rating_type,
    });
    if (rating_type === 'like') {
        axios.put(`/v1/api/ratings/note/${noteId}`, body, setTokenHeader())
            .then(res => dispatch({
                type: SWAP_TO_LIKE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'SWAP_TO_LIKE_FAIL'))
                dispatch({ type: SWAP_TO_LIKE_FAIL })
            })
    } else {
        axios.put(`/v1/api/ratings/note/${noteId}`, body, setTokenHeader())
            .then(res => dispatch({
                type: SWAP_TO_DISLIKE,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'SWAP_TO_DISLIKE_FAIL'))
                dispatch({ type: SWAP_TO_DISLIKE_FAIL })
            })
    }  
}

/* Delete a user's rating of a note permenantly from the database. */
export const removeRating = (noteId, rating_type) => (dispatch) => {
    const body = JSON.stringify({ 
        object_id: noteId,
        rating_type
    });
    if (rating_type === 'like') {
        axios.delete(`/v1/api/ratings/note/${noteId}`, setTokenHeader(), { data: body })
            .then(res => dispatch({
                type: REMOVE_NOTE_LIKE,
                payload: noteId
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({ type: REMOVE_NOTE_LIKE_FAIL });
            })
    } else {
        axios.delete(`/v1/api/ratings/note/${noteId}`, setTokenHeader(), { data: body })
            .then(res => dispatch({
                type: REMOVE_NOTE_DISLIKE,
                payload: noteId
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({ type: REMOVE_NOTE_DISLIKE_FAIL});
            })
    }
}

/* Get the amount of ratings that are 'likes' from the database. */
export const getNoteLikes = (note_id) => (dispatch) => {
    axios.get(`/v1/api/ratings/${note_id}/likes`,  
    {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => dispatch({
        type: GET_NOTE_LIKES,
        payload: res.data.count
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: GET_NOTE_LIKES_FAIL })
    })
};

/* Get the amount of ratings that are 'dislikes' from the database. */
export const getNoteDislikes = (note_id) => (dispatch) => {
    axios.get(`/v1/api/ratings/${note_id}/dislikes`,  
    {
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => dispatch({
        type: GET_NOTE_DISLIKES,
        payload: res.data.count
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({ type: GET_NOTE_DISLIKES_FAIL })
    })
};