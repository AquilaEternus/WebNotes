import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    UPDATE_PROFILE_PICTURE,
    UPDATE_PROFILE_PICTURE_FAIL,
    REGISTER_FAIL
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    isLoading: false,
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state, isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            // console.log(action.payload)
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }
        case UPDATE_PROFILE_PICTURE:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatarUrl: action.payload
                }
            }
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case UPDATE_PROFILE_PICTURE_FAIL:
        default:
            return state;
    }
}

export default authReducer;