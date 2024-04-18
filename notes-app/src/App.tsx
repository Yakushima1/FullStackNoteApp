import React, { useState } from "react";
import "./App.css"

type Note ={
  id: number;
  title: string;
  content: string;
}

const App = () => {

  const [notes, setNotes] = useState<Note[]>([
    ]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddNote = (
      event: React.FormEvent
      ) => {
        event.preventDefault();


        const newNote: Note = {
          id: notes.length+1,
          title: title,
          content: content
        };

        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
    }

    const[selectedNote, setSelectedNote] = useState<Note | null>(null);

    const handleNoteClick = (note: Note) => {
      setSelectedNote(note);
      setTitle(note.title)
      setContent(note.content)
    }

  return(
    <div className="app-contanier">
      <form className="note-form" 
      onSubmit={(event) => handleAddNote(event)}>
        <input
          value={title}
          onChange={(event) => 
          setTitle(event.target.value)
        }

          placeholder="title"
          required>
             </input>
             <textarea
             value={content}
             onChange={(event) => 
            setContent(event.target.value)
          }
             placeholder="Context"
             rows={10}
             required
             >
                 </textarea>

          <button 
            type="submit">Add
          </button>
        </form>

        <div className="notes-grid">
          {notes.map((note) =>(
                 <div className="note-item"
                 onClick={() => handleNoteClick(note)}>
                 <div className="notes-header">
                   <button>X</button>
                 </div>
                 <h2>{note.title}</h2>
                 <p>{note.content}</p>
               </div>
          ))}
        </div>
    </div>
  )
}

export default App;