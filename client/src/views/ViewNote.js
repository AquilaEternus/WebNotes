import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    getCurrNote,
} from '../actions/noteActions';
import { getNoteComments } from '../actions/commentActions';
import AddComment from '../components/comments/AddComment';
import CommentList from '../components/comments/CommentList';
import Loading from '../components/views/Loading';
import NoteRating from '../components/notes/NoteRating';

const ViewNote = (props) => {
    let { note_id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        props.getCurrNote(note_id);
        props.getNoteComments(note_id);
    }, []);

    const getFormattedText = () => {
        return {__html: DOMPurify.sanitize(props.note.text)}
    }

    const getPostDate = () => {
        if (props.note.createdAt === props.note.updatedAt) {
            return (
                <span>
                    Posted: {new Date(props.note.createdAt).toDateString()}
                </span>
            );
        } else {
            return (
                <span>
                    Posted: {new Date(props.note.createdAt).toDateString()} (edited)
                </span>
            ); 
        }
    }

    if (props.loading) {
        return(<div className="container main-container">
            <Loading />
        </div>)
    }
    else if (props.comments && props.note && !props.loading) {
        return(<React.Fragment>
            <div className="container main-container">
                <div className="row"></div>
                <div className="note-header">
                    <div className="row">
                        <h3 style={{maxWidth: '100%'}}>{props.note.title}</h3> 
                        <div className="card-author">
                            <img 
                                alt="Profile Avatar"
                                className="profile-picture-icon" 
                                src={`${props.note.pfp_url}`} 
                            />
                            <p style={{marginLeft: '1em'}}>{props.note.username} &middot; {getPostDate()}</p>
                        </div>
                        <NoteRating note_id={note_id} likes={props.note.likes} dislikes={props.note.dislikes} />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="note-content">
                    <div 
                        className="row" 
                        dangerouslySetInnerHTML={getFormattedText()}
                    >
                        {/* <p style={{whiteSpace: 'pre-line'}}>{props.note.text}</p>  */}
                    </div>
                </div>
                <div className="comment-section">
                    <div className="row center-align">
                        <h5>Comments {`(${props.comments.length})`}</h5>
                    </div>

                    <AddComment note_id={note_id} />
                    <CommentList comments={props.comments} />
                </div>      
            </div>
            </React.Fragment>
        );
     }
     else {
        return (null);
    }
}

const mapStateToProps = (state) => {
    return {
        note: state.note.currNote,
        loading: state.note.loading,
        comments: state.comment.comments,
    };
}

export default connect(mapStateToProps, {
    getCurrNote,
    getNoteComments
})(ViewNote);