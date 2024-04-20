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

    const handleUpdateNote = (
      event: React.FormEvent
      )=>{
        event.preventDefault();
        if(!selectedNote){
          return;
        }
        const updatedNote: Note = {
          id: selectedNote.id,
          title: title,
          content: content
        }

        const updateNotesList = notes.map((note) => 
          note.id === selectedNote.id 
          ? updatedNote 
          : note
        )

        setNotes(updateNotesList)
        setTitle("")
        setContent("")
        setSelectedNote(null)
      }

      const handleCancle = () =>{
        setTitle("")
        setContent("")
        setSelectedNote(null)
      }

      const deleteNote = (
        event: React.MouseEvent,
         noteId:number) => {
          event.stopPropagation();

          const updatedNotes = notes.filter(
            (note) => note.id !== noteId
          )

          setNotes(updatedNotes);
      }

  return(
    <div className="app-contanier">
      <form className="note-form" 
      onSubmit={(event) => 
      selectedNote 
      ? handleUpdateNote(event) 
      :handleAddNote(event)}>
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
             placeholder="Content"
             rows={10}
             required
             >
                 </textarea>
            {selectedNote ? (
              <div className="edit-buttons">
                <button type = "submit">Save</button>
                <button onClick={handleCancle}>Cancel</button>
              </div>
            ) : (
              <button type = "submit">Add Note</button>
            )}




        </form>

        <div className="notes-grid">
          {notes.map((note) =>(
                 <div className="note-item"
                 onClick={() => handleNoteClick(note)}>
                 <div className="notes-header">
                   <button onClick={(event)=>
                  deleteNote(event, note.id)}>X</button>
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