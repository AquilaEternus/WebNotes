import React from 'react';
import NoteCard from './NoteCard';

const UserNoteList = (props) => {
    const userNotes = props.notes.map((note) => {
        return <NoteCard 
                    key={note._id} 
                    id={note._id} 
                    title={note.title} 
                    text={note.text} 
                    author={note.user.username}
                    pfp_url={note.user.pfp_url} 
                    toggleDelete={props.toggleDelete}
                    inUserNotes={true}
                />
    })
    return (userNotes);
}

export default UserNoteList;