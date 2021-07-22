import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../../actions/commentActions';
import ErrorBanner from '../error/ErrorBanner';
import { usePrevious } from '../../helper/customHooks';
import { clearErrors } from '../../actions/errorActions';

const AddComment = (props) => {
    const [comment, setComment] = useState('');
    const [msg, setMsg] = useState(null);
    const prevError = usePrevious(props.error);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        if (prevError !== props.error) {
            if (props.error.id === 'ADD_COMMENT_FAIL' && !props.error.status === 401) {
                setMsg(props.error.msg.msg)
            } else {
                setMsg(null);
            }
        }
        if (prevLoc !== history.location.pathname) {
            setMsg(null);
            props.clearErrors();
        }
    }, [prevError, props, prevLoc, history.location.pathname]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const onCommentSubmit = (e) => {
        e.preventDefault();
        //console.log(props.error)
        if (props.isAuthenticated) {
            props.addComment(props.note_id, comment);
        } else {
            history.push('/login');
        }
    }

    return (
    <React.Fragment>
        <form className="row" onSubmit={onCommentSubmit}>
            <ErrorBanner msg={msg} />
            <div className="row">
                <div className="input-field">
                    <textarea id="comment_text" value={comment} onChange={handleCommentChange} name="comment_text" className="materialize-textarea"></textarea>
                    <label htmlFor="comment_text">Add Comment</label>
                </div>
                <div className="input-field align-right">
                    <input type="submit" className="btn blue" />
                </div>
            </div>
        </form>
    </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { addComment, clearErrors })(AddComment);