import React from 'react';
import { connect } from 'react-redux';
import Loading from '../views/Loading';
import NoteList from '../notes/NoteList';
import PageSwitcher from './PageSwitcher';

const LikedNotePages = (props) => {
    if (!props.loading && props.pager && props.notes.length > 0) {
        return (
            <div>
                <NoteList notes={props.notes} />
                <PageSwitcher pager={props.pager} />
            </div>
        );
    } else if (!props.loading && props.notes.length === 0){
         return (
            <div className="row center-align">
                <h5 className="header-color">Notes you have liked will be listed here.</h5>
            </div>
         )
    } 
    else if (props.loading){
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

export default connect(mapStateToProps, null)(LikedNotePages);