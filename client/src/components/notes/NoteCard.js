import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';

const NoteCard = (props) => {
    const history = useHistory();

    useEffect(() => {
        M.AutoInit();
    }, [])

    const deleteNote = () => {
        props.toggleDelete(props.id);
    }

    const isInUserNotes = () => {
        if (props.inUserNotes) {
            return (
                <React.Fragment>
                    <Link to={`/dashboard/mynotes/edit/${props.id}`} >Edit</Link>
                    <Link onClick={deleteNote}>Delete</Link>
                </React.Fragment>     
            )
        } else {
            return (null);
        }
    }

    const isNoteWriter = () => {
        if (props.user !== null && props.isAuthenticated) {
            if (props.user.username === props.author && history.location.pathname === "/dashboard/mynotes") {
                return (
                    <React.Fragment>
                        <Link to={`/note/${props.id}`}>View</Link>
                        {isInUserNotes()}
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <Link to={`/note/${props.id}`}>View</Link>
                    </React.Fragment>
                );
            }
        } 
        if (props.user === null) {
            return (
                <React.Fragment>
                    <Link to={`/note/${props.id}`}>View</Link>
                </React.Fragment>
            );
        }
    }

    return (
        <div className="row">
            <div className="col s12 m12">
                <div className="card">
                    <div className="card-content">
                        <p className="truncate"><span className="card-title">{props.title}</span></p>
                        <div className="card-author">
                            <img 
                                alt="Profile Avatar"
                                className="profile-picture-icon" 
                                src={`${props.pfp_url}`} 
                            />
                            
                            <p style={{marginLeft: '1em'}}>{props.author}</p>
                        </div>
                    </div>
                    <div className="card-action">
                        {isNoteWriter()}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(NoteCard);