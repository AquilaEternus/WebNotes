import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { 
    getCommentReplies, 
    setCurrComment, 
    setReplyTo 
} from '../../actions/commentActions';
import ReplyList from './ReplyList';
import AddReply from './AddReply';

const Comment = (props) => {
    const comment = useRef(null);
    
    useEffect(() => {
        M.AutoInit();
        comment.current.addEventListener('click', setCurrComment);
    }, [props.toUser]);

    const setCurrComment = () => {
        props.setCurrComment(props.comment_id);
        props.getCommentReplies(props.comment_id);
        props.setReplyTo(null)
    }

    const setReplyTo = () => {
        props.setReplyTo(props.user)
    }

    const renderReplies = () => {
        if(props.currComment && props.currComment === props.comment_id){
            return <ReplyList />
        } else {
            return null;
        }
    }

    return (<React.Fragment>
        <li>
            <div ref={comment} className="collapsible-header">
                <div className="comment-body">
                    <div className="comment-content">
                        
                        <div class="card-author">
                            <img 
                                alt="Profile Avatar"
                                className="profile-picture-icon" 
                                src={`/${props.avatar}`} 
                            />
                            
                            <p style={{marginLeft: '1em'}}>{props.user} - {moment(props.date).fromNow()}</p>
                        </div>
                        <p>{props.text}</p> 
                    </div>
                    <div className="comment-actions">
                            <button onClick={setReplyTo} className="waves-effect waves-teal btn-flat">
                                <i className="material-icons">reply</i>Reply {`(${!props.replies.length ? 0 : props.replies.length})`}
                            </button>
                    </div>
                </div>
            </div>
            <div className="collapsible-body">
                {renderReplies()}
                <AddReply comment_id={props.comment_id} />
            </div>
        </li>
    </React.Fragment>);
}

const mapStateToProps = (state) => {
    return {
        currComment: state.comment.currComment
    }
}

export default connect(mapStateToProps, { getCommentReplies, setCurrComment, setReplyTo })(Comment);