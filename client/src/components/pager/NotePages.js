import React from 'react';
import { connect } from 'react-redux';
import Loading from '../views/Loading';
import FailedSearch from '../error/FailedSearch';
import NoteList from '../notes/NoteList';
import PageSwitcher from './PageSwitcher';

const NotePages = (props) => {
    if (!props.loading && props.pager && props.notes.length > 0) {
        return (
            <div>
                <NoteList notes={props.notes} />
                <PageSwitcher pager={props.pager} query={props.query} />
            </div>
        );
    } else if (!props.loading && props.query && props.notes.length === 0){
        return (<FailedSearch />)
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

export default connect(mapStateToProps, null)(NotePages);