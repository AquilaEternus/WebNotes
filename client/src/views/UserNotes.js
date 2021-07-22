import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserNotes, deleteNote, clearQuery } from '../actions/noteActions';
import { usePrevious } from '../helper/customHooks';
import UserPages from '../components/pager/UserPages';
import Search from '../components/Search';
import Confirmation from '../components/modals/Confirmation';


const UserNotes = (props) => {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [selectedNote, setSelectedNote] = useState('');
    const history = useHistory();
    const search = useLocation().search;
    const queryParam = new URLSearchParams(search).get('q');
    const [query, setQuery] = useState(queryParam || '');
    const prevQuery = usePrevious(query);
    const prevLoc = usePrevious(history.location.pathname)
    const pageParam = new URLSearchParams(search).get('page') || 1;
    
    useEffect(() => {
        window.scrollTo(0, 0);
        props.clearQuery()
        props.getUserNotes(query, pageParam)
        if (query) {
            if (query !== prevQuery && prevLoc === history.location.pathname) {
                props.getUserNotes(query, 1)
                history.push(history.location.pathname + `?q=${query}&page=1`);
            }
        } else {
            if (queryParam) {
                history.replace(history.location.pathname);
            }
        }

    }, [query, prevQuery, prevLoc, queryParam, pageParam, history, search, props]);

    const toggle = (note_id) => {
        setToggleDelete(!toggleDelete);
        setSelectedNote(note_id);
    }

    const confirmDelete = () => {
        props.deleteNote(selectedNote);
        setToggleDelete(!toggleDelete);
    }

    const displayContent = () => {
        if (props.isAuthenticated && props.user) {
            return (
                <React.Fragment>
                    <Search query={query} setQuery={setQuery} />
                    <UserPages toggle={toggle} getNotes={props.getUserNotes}/>
                </React.Fragment>
            )
        } else {
            return (
                <div className="row center-align">
                    <p className="header-color">
                        Please login to see your notes.
                    </p>
                </div>
            );
        }
    }

    return (
        <div className="container main-container">
            <Link className="waves-effect btn-small btn-flat btn-flat-custom" to="/dashboard">
                <i className="material-icons left">chevron_left</i>Back to Dashboard
            </Link>
            <div className="row center-align">
                <h4 className="header-color">MyNotes</h4>
            </div>
            <Confirmation toggle={toggleDelete} 
                header="Confirm Delete" 
                text="Are you sure you want to delete this note?" 
                decline={() => setToggleDelete(!toggleDelete)}
                accept={confirmDelete}
            />
            {displayContent()}
        </div>
    );   
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { deleteNote, getUserNotes, clearQuery})(UserNotes);