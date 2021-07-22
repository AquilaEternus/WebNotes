import React from 'react';
import Comment from './Comment';

const CommentList = (props) => {
    const comments = props.comments.map(comment => {
        return <Comment 
                key={comment._id}
                comment_id={comment._id} 
                user={comment.user.username}
                avatar={comment.user.avatarUrl}
                text={comment.text}
                date={comment.createdAt} 
                likes={comment.likes} 
                dislikes={comment.dislikes} 
                replies={comment.replies} />
    })

    const renderComments = () => {
        if(props.comments.length > 0) {
            return comments;
        } else {
            return (<React.Fragment>
                <div className="row center-align">
                    <p className="grey-text">No Comments yet</p>
                </div>
            </React.Fragment>)
        }
    }

    return (<React.Fragment>
        <ul className="collapsible comment-list">
            {renderComments()}
        </ul>
        
    </React.Fragment>);
};

export default CommentList;