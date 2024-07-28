import React from 'react';


function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-item">
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content.slice(0, 100)}...</div>
      <div className="note-timestamp">Created: {new Date(note.timestamp).toLocaleString()}</div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default NoteItem;