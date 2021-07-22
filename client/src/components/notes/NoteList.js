import React from 'react';
import NoteCard from './NoteCard';

const NoteList = (props) => {
    const notes = props.notes.map((note) => {
        return (
        <div className="row">
            <NoteCard 
                key={note._id} 
                id={note._id} 
                title={note.title} 
                text={note.text} 
                author={note.user.username}
                avatar={note.user.avatarUrl}
                inUserNotes={false}
            />
        </div>
        )
    })
    return (notes);
}

export default NoteList;