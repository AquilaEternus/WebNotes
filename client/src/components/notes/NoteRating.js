import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { 
    addRating, 
    updateRating,
    removeRating,
    getNoteLikes,
    getNoteDislikes
} from '../../actions/noteActions';

const NoteRating = (props) => {
    const [toggleLikes, setToggleLikes] = useState(false);
    const [toggleDislikes, setToggleDislikes] = useState(false);

    let { note_id, likes, dislikes, isAuthenticated } = props;

    useEffect(() => {
        if (isAuthenticated) {
            axios.get(`/v1/api/user/rating/${note_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token" : localStorage.getItem('token')
                }})
                .then(res => {
                    if (res.data) {
                        if (res.data.rating_type === 'like') {
                            setToggleLikes(true);
                        } else if (res.data.rating_type === 'dislike') {
                            setToggleDislikes(true);
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                }) 
        }
        props.getNoteLikes(note_id)
        props.getNoteDislikes(note_id)
    });

    const handleLikesClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            if (toggleLikes) { // Delete like
                setToggleLikes(!toggleLikes);
                props.removeRating(note_id, 'like');
            } else if (!toggleLikes && !toggleDislikes) {
                setToggleLikes(!toggleLikes);
                props.addRating(note_id, 'like');
            }
            else { // Update rating with opposite
                setToggleLikes(!toggleLikes);
                setToggleDislikes(false);
                props.updateRating(note_id, 'like');
                
            }
        } 
    }
    
    const handleDislikesClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            if (toggleDislikes) { // Delete dislike
                setToggleDislikes(!toggleDislikes);
                props.removeRating(note_id, 'dislike');
            } else if (!toggleLikes && !toggleDislikes) {
                setToggleDislikes(!toggleDislikes);
                props.addRating(note_id, 'dislike');
            } else { // Update rating with opposite
                setToggleDislikes(!toggleDislikes);
                setToggleLikes(false);
                props.updateRating(note_id, 'dislike');
            }
        }   
    }

    return (
        <div className="right-align">
        <button onClick={handleLikesClick} className="waves-effect btn-flat">
            <i className={`small material-icons ${toggleLikes ? 'blue-text' : ''}`}>thumb_up</i> {likes}
        </button> 
        <button onClick={handleDislikesClick} className="waves-effect btn-flat">
            <i className={`small material-icons ${toggleDislikes ? 'blue-text' : ''}`}>thumb_down</i> {dislikes}
        </button>
    </div>)   
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, {
    addRating, 
    updateRating,
    removeRating,
    getNoteLikes,
    getNoteDislikes
})(NoteRating);