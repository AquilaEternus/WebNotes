import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLikedNotes } from '../actions/noteActions';
import LikedNotesPages from '../components/pager/LikedNotesPages';

const LikedNotes = (props) => {
    const search = useLocation().search;
    const pageParam = new URLSearchParams(search).get('page') || 1;
    
    useEffect(() => {
        console.log(props)
        window.scrollTo(0, 0);
        props.getLikedNotes(pageParam)
    }, [pageParam, props]);

    const displayContent = () => {
        if (props.isAuthenticated && props.user) {
            return (
                <React.Fragment>
                    <LikedNotesPages pageParam={pageParam} />
                </React.Fragment>
            )
        } else {
            return (
                <div className="row center-align">
                    <p className="header-color">
                        Please login to see your liked notes.
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
                <h4 className="header-color">Liked Notes</h4>
            </div>
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

export default connect(mapStateToProps, { getLikedNotes })(LikedNotes);