import React, { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';

const NOTES_KEY = 'notes';
const NOTES_PER_PAGE = 10;

function App() {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now().toString() }]);
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setNotes(notes.map(n => (n.id === note.id ? note : n)));
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  return (
    <div className="App">
      <h1>Note Taking App</h1>
      <button onClick={() => setEditingNote({ title: '', content: '' })}>Add New Note</button>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {paginatedNotes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={() => setEditingNote(note)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${Math.ceil(filteredNotes.length / NOTES_PER_PAGE)}`}</span>
        <button
          disabled={currentPage === Math.ceil(filteredNotes.length / NOTES_PER_PAGE)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {editingNote !== null && (
        <NoteForm
          note={editingNote}
          onSave={editingNote.id ? handleEditNote : handleAddNote}
          onCancel={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}

export default App;
