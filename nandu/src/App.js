import React, { useState, useEffect } from "react";
import './App.css'
import Button from 'react-bootstrap/Button';

const Note = ({ note, onDelete }) => {
  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  });

  const [newNote, setNewNote] = useState({ title: "", content: "" });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const { title, content } = newNote;
    if (title.trim() !== "" && content.trim() !== "") {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([...notes, newNote]);
      setNewNote({ title: "", content: "" });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="notes">
      <h2>Notes</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          rows={5}
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        ></textarea>
        <Button onClick={addNote}>Add Note</Button>
      </div>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={deleteNote} />
      ))}
    </div>
  );
};

export default Notes;

// THIS CODE IS WITHOUT LOCAL STORAGE //

// import React, { useState, useEffect } from "react";
// import './App.css'
// import Button from 'react-bootstrap/Button';

// const Note = ({ note, onDelete }) => {
//   return (
//     <div className="note">
//       <h3>{note.title}</h3>
//       <p>{note.content}</p>
//       <button onClick={() => onDelete(note.id)}>Delete</button>
//     </div>
//   );
// };

// const Notes = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ title: "", content: "" });

//   useEffect(() => {
//     const storedNotes = localStorage.getItem("notes");
//     if (storedNotes) {
//       setNotes(JSON.parse(storedNotes));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("notes", JSON.stringify(notes));
//   }, [notes]);

//   const addNote = () => {
//     const { title, content } = newNote;
//     if (title.trim() !== "" && content.trim() !== "") {
//       const newNote = {
//         id: Date.now(),
//         title,
//         content,
//       };
//       setNotes([...notes, newNote]);
//       setNewNote({ title: "", content: "" });
//     }
//   };

//   const deleteNote = (id) => {
//     setNotes(notes.filter((note) => note.id !== id));
//   };

//   return (
//     <div className="notes">
//       <h2>Notes</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//         />
//         <textarea
//         rows={5}
//           placeholder="Content"
//           value={newNote.content}
//           onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//         ></textarea>
//         <Button onClick={addNote}>Add Note</Button>
//       </div>
//       {notes.map((note) => (
//         <Note key={note.id} note={note} onDelete={deleteNote} />
//       ))}
//     </div>
//   );
// };

// export default Notes;