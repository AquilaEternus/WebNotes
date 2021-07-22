import React from 'react';
import { connect } from 'react-redux';
import Loading from '../views/Loading';
import FailedSearch from '../error/FailedSearch';
import UserNoteList from '../notes/UserNoteList';
import PageSwitcher from './PageSwitcher';

const UserPages = (props) => {
    if (!props.loading && props.pager && props.notes.length > 0) {
        return (
            <div>
                <UserNoteList notes={props.notes} toggleDelete={props.toggle} />
                <PageSwitcher pager={props.pager} query={props.query} />
            </div>
        );
    } else if (!props.loading && props.query && props.notes.length === 0){
        return (<FailedSearch />) 
    } else if (!props.loading && !props.query && props.notes.length === 0) {
        return (
            <div className="row center-align">
                <h5 className="header-color">Create notes in order to view, edit and delete them here.</h5>
            </div>
         )
    } else if (props.loading){
         return (<Loading />);
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.note.notes,
        pager: state.note.pager,
        loading: state.note.loading,
        query: state.note.query
    }
}

export default connect(mapStateToProps, null)(UserPages);