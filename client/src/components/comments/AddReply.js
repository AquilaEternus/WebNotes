import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addReply, clearReplyTo } from '../../actions/commentActions';
import ErrorBanner from '../error/ErrorBanner';
import { usePrevious } from '../../helper/customHooks';
import { clearErrors } from '../../actions/errorActions';

const AddReply = (props) => {
    const [reply, setReply] = useState(props.toUser ? `@${props.toUser}` : '');
    const [msg, setMsg] = useState(null);
    const prevError = usePrevious(props.error);
    const prevProps = usePrevious(props.toUser);
    const history = useHistory();
    const prevLoc = usePrevious(history.location.pathname);

    useEffect(() => {
        if (prevProps !== props.toUser) {
            const replyVal = props.toUser ? `@${props.toUser}` : '';
            setReply(`${replyVal} `)
        }
        if (prevError !== props.error) {
            if (props.error.id === 'ADD_REPLY_FAIL' && !props.error.status === 401) {
                setMsg(props.error.msg.msg)
            } else {
                setMsg(null);
            }
        }
        if (prevLoc !== history.location.pathname) {
            setMsg(null);
            props.clearErrors();
        }
    });

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    }

    const onReplySubmit = (e) => {
        e.preventDefault();
        console.log(props.error)
        if (props.isAuthenticated) {
            props.addReply(props.comment_id, reply);
            setReply('');
            props.clearReplyTo();
        } else {
            history.push('/login');
        }
    }

    return (
    <React.Fragment>
        <form className="row" onSubmit={onReplySubmit}>
            <ErrorBanner msg={msg} />
            <div className="row">
                <div className="input-field col s12 l10">
                    <textarea id="reply_text" value={reply} onChange={handleReplyChange} name="reply_text" className="materialize-textarea"></textarea>
                    <label htmlFor="reply_text">Add Reply</label>
                </div>
                <div className="input-field right-align col l2">
                    <input type="submit" className="btn-small white-text grey waves-effect waves-blue " />
                </div>
            </div>
        </form>
    </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        toUser: state.comment.replyTo,
        error: state.error
    }
}

export default connect(mapStateToProps, { addReply, clearErrors, clearReplyTo })(AddReply);