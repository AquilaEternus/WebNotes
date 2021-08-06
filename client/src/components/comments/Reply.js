import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {  
    setReplyTo 
} from '../../actions/commentActions';
import AddReply from './AddReply';
import M from 'materialize-css/dist/js/materialize.min.js';

const Reply = (props) => {
    const reply = useRef(null);

    useEffect(() => {
        M.AutoInit();
    }, [props.toUser]);

    const setReplyTo = () => {
        props.setReplyTo(props.user)
    }

    return (<React.Fragment>
        <li className="reply">
            <div className="collapsible-header" ref={reply}>
                <div className="comment-body">
                    <div className="comment-content">
                    <div class="card-author">
                            <img 
                                alt="Profile Avatar"
                                className="profile-picture-icon" 
                                src={`${props.pfp_url}`} 
                            />
                            
                            <p style={{marginLeft: '1em'}}>{props.user} - {moment(props.date).fromNow()}</p>
                        </div>
                        <p>{props.text}</p>
                    </div>
                    <div className="comment-actions">
                            <button onClick={setReplyTo} className="waves-effect waves-teal btn-flat">
                                <i className="material-icons">reply</i>
                            </button>
                    </div>
                </div>
                
            </div>
            <div className="collapsible-body">
                <AddReply comment_id={props.comment_id} />     
            </div>
        </li>
    </React.Fragment>);
};

export default connect(null, { setReplyTo })(Reply);