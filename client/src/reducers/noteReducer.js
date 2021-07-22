import {
    CURR_NOTE_LOADING,
    USER_NOTES_LOADING,
    GENERAL_NOTES_LOADING,
    GET_GENERAL_NOTES_SUCCESS,
    GET_GENERAL_NOTES_FAIL,
    CLEAR_QUERY,
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
    DELETE_USER_NOTES,
    GET_NOTE_LIKES,
    GET_NOTE_DISLIKES,
    GET_NOTE_LIKES_FAIL,
    GET_NOTE_DISLIKES_FAIL,
    ADD_NOTE_LIKE,
    REMOVE_NOTE_LIKE,
    ADD_NOTE_DISLIKE,
    REMOVE_NOTE_DISLIKE,
    ADD_NOTE_LIKE_FAIL,
    ADD_NOTE_DISLIKE_FAIL,
    SWAP_TO_LIKE,
    SWAP_TO_LIKE_FAIL,
    SWAP_TO_DISLIKE,
    SWAP_TO_DISLIKE_FAIL,
    GET_LIKED_NOTES_SUCCESS,
    GET_LIKED_NOTES_FAIL,
    LIKED_NOTES_LOADING
} from '../actions/types';

const initialState = {
    notes: [],
    pager: null,
    query: '',
    currNote: null,
    loading: false
}

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case EDIT_NOTE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case DELETE_NOTE_SUCCESS:
            const newUserNotes = state.notes.filter(note => note._id !== action.payload);
            console.log(newUserNotes)
            return {
                ...state,
                notes: newUserNotes,
                loading: false
            }
        case GET_USER_NOTES_SUCCESS:
            if ('query' in action.payload) {
                return {
                    ...state,
                    loading: false,
                    notes: [...action.payload.pageOfNotes],
                    pager: action.payload.pager,
                    query: action.payload.query
                }
            }
            return {
                ...state,
                loading: false,
                notes: [...action.payload.pageOfNotes],
                pager: action.payload.pager
            }
        case GET_GENERAL_NOTES_SUCCESS:
            if ('query' in action.payload) {
                return {
                    ...state,
                    loading: false,
                    notes: [...action.payload.pageOfNotes],
                    pager: action.payload.pager,
                    query: action.payload.query
                }
            }
            return {
                ...state,
                loading: false,
                notes: [...action.payload.pageOfNotes],
                pager: action.payload.pager
            }
        case GET_LIKED_NOTES_SUCCESS:
            const likedNotes = [];
            action.payload.pageOfNotes.forEach((note) => {
                if (note.object) likedNotes.push({...note.object})
            })
            return {
                ...state,
                loading: false,
                notes: [...likedNotes],
                pager: action.payload.pager
            }
        case CLEAR_QUERY: 
            return {
                ...state,
                query: '',
                notes: [],
                pager: null
            }
        case GET_CURR_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                currNote: action.payload
            }
        case DELETE_USER_NOTES:
            return {
                ...state,
                notes: []
            }
        case GET_NOTE_LIKES:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    likes: action.payload
                }
            }
        case GET_NOTE_DISLIKES:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    dislikes: action.payload
                }
            }
        case ADD_NOTE_LIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    likes: state.currNote.likes + 1,
                }
            }
        case ADD_NOTE_DISLIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    dislikes: state.currNote.dislikes + 1,
                }
            }
        case SWAP_TO_LIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    dislikes: state.currNote.dislikes - 1,
                    likes: state.currNote.likes + 1
                }
            }
        case SWAP_TO_DISLIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    dislikes: state.currNote.dislikes + 1,
                    likes: state.currNote.likes - 1
                }
            }
        case REMOVE_NOTE_LIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    likes: state.currNote.likes - 1
                }
            }
        case REMOVE_NOTE_DISLIKE:
            return {
                ...state,
                currNote: {
                    ...state.currNote,
                    dislikes: state.currNote.dislikes - 1
                }
            }
        case CURR_NOTE_LOADING:
        case GENERAL_NOTES_LOADING:
        case USER_NOTES_LOADING:
        case LIKED_NOTES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_NOTE_FAIL:
        case ADD_NOTE_LIKE_FAIL:
        case ADD_NOTE_DISLIKE_FAIL:
        case EDIT_NOTE_FAIL:
        case DELETE_NOTE_FAIL:
        case GET_USER_NOTES_FAIL:
        case GET_GENERAL_NOTES_FAIL:
        case GET_CURR_NOTE_FAIL:
        case GET_LIKED_NOTES_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_NOTE_LIKES_FAIL:
        case GET_NOTE_DISLIKES_FAIL:
        case SWAP_TO_LIKE_FAIL:
        case SWAP_TO_DISLIKE_FAIL:
        default:
            return state;
    };
}

export default noteReducer;