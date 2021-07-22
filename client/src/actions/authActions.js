import instance from '../api'

import { returnErrors } from './errorActions';
import { setTokenHeader } from '../helper/token';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_PROFILE_PICTURE,
    UPDATE_PROFILE_PICTURE_FAIL,
    DELETE_USER_NOTES
} from "./types";

const axios = instance;

/* Check token and load user. */
export const loadUser = () => (dispatch) => {
    // User loading
    dispatch({ type: USER_LOADING });
    axios.get('/v1/api/auth/user', setTokenHeader())
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

/* Register a new account for the user and logs them in. */
export const register = ({ username, email, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // Request body
    const body = JSON.stringify({ username, email, password });
    axios.post('/v1/api/auth/register', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

/* Logs in an existing user */
export const login = ({ email, password }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password });
    axios.post('/v1/api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

/* Logsout a user.  */
export const logout = () => (dispatch) => {
    // dispatch({ type: LOGOUT_SUCCESS });
    axios.delete(`/v1/api/auth/logout`, { data: { refreshToken: localStorage.getItem("refreshToken") } })
        .then(res => { 
            dispatch({ type: LOGOUT_SUCCESS });
            dispatch({ type: DELETE_USER_NOTES });
        })
        .catch(err => {
            // dispatch(returnErrors(err.response.data, err.response.status))
            console.log(err)
        })
}

/* Put/Update a users profile picture. */
export const updateProfilePicture = (body) => (dispatch) => {
    const config = {
        headers : {
            "Content-Type": "multipart/form-data",
            "x-auth-token": localStorage.getItem("token")
        }
    }
    axios.put('/v1/api/user/avatar', body, config)
        .then(res => dispatch({
            type: UPDATE_PROFILE_PICTURE,
            payload: res.data.path
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({ type: UPDATE_PROFILE_PICTURE_FAIL });
        })
}
