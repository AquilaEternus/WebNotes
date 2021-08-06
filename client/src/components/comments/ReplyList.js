import React from 'react';
import { connect } from 'react-redux';
import Loading from '../views/Loading';
import Reply from './Reply';

const ReplyList = (props) => {
    const replies = props.replies.map(reply => {
        return <Reply 
                    key={reply._id}
                    reply_id={reply._id}
                    comment_id={reply.comment_id} 
                    user={reply.user.username}
                    pfp_url={reply.user.pfp_url}
                    text={reply.text}
                    date={reply.createdAt} 
                    likes={reply.likes} 
                    dislikes={reply.dislikes} 
                />
    })

    const renderReplies = () => {
        if (props.loading) {
            return (<React.Fragment>
                <Loading />
            </React.Fragment>);
        }
        else if(!props.loading && props.replies.length > 0) {
            return replies
        } else if (!props.loading && props.replies.length === 0) {
            return (<React.Fragment>
                <div className="row center-align">
                    <p className="grey-text">No replies yet</p>
                </div>
            </React.Fragment>)
        }
    }

    return (<React.Fragment>
        <ul className="collapsible reply-list">
            {renderReplies()}
        </ul>
        
    </React.Fragment>);
};

const mapStateToProps = (state) => {
    return {
        replies: state.comment.currReplies,
        loading: state.comment.loading
    }
}

export default connect(mapStateToProps, null)(ReplyList);